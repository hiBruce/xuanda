/**
 * 我的课程
 */
define(['../menu.js', "Pagination"], function (menu) {
    menu.init();
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                myCourses: [],
                fklx: 1,
                pageNo: 1,
                kcmc: "",
                pageCon:null
            };
        },
        methods: {
            /*
            * tab切换
            */
            changeTab: function (fklx) {
                this.fklx = fklx;
                this.myCourses = [];
                // this.canLoad = true;
                this.loadMyCourses(1);

            },
            /**
             * 加载我的课程
             */
            loadMyCourses: function (pageNo) {
                var self = this;
                var data = {
                    pageNo: pageNo ? pageNo : self.pageNo,
                    fklx: self.fklx,
                    pageSize: 10,
                    kcmc: self.kcmc
                };
                self.pageNo = data.pageNo;
                data.loading = true;
                var success = function (result) {
                    if (result.resultCode === 0) {
                        self.myCourses = result.data;
                        if (self.pageNo === 1) {
                            let pageTotal = Math.ceil(result.page.rowCount / result.page.pageSize);
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.get("/jxxt/api/admin/course/mycourses", data, success);
            },
            encodeUrl: function (url) {
                return encodeURI(url);
            },
            showKclist: function (ind) {
                var self = this;
                if (this.myCourses[ind].showBoo) {
                    this.myCourses[ind].showBoo = false;
                } else {
                    Service.get("/jxxt/api/admin/course/" + this.myCourses[ind].ckcid + "/outline", null, function (res) {
                        if(res.success){
                            Vue.set(self.myCourses[ind], "kslist", res.data);
                            Vue.set(self.myCourses[ind], "showBoo", true);
                        }
                    });
                }
            },
            showKcblist: function (ind) {
                var self = this;
                if (this.myCourses[ind].showCourse) {
                    this.myCourses[ind].showCourse = false;
                } else {
                    Service.get("/jxxt/api/course/kcb/kcbCourses", {kcbId: this.myCourses[ind].ckcid}, function (res) {
                        if (res.success){
                            Vue.set(self.myCourses[ind], "children", res.data);
                            Vue.set(self.myCourses[ind], "showCourse", true);
                        }
                    });
                }
            },
            deleteList: function (item) {
                var self = this;
                self.$modal.confirm("确定要删除吗？删除后该课程所有学习记录、笔记、体会和评价等信息都会被删除。", function () {
                    Service.get("/jxxt/api/admin/xykc/scZxKc", {courseId: item.ckcid}, function (res) {
                        if (res.success) {
                            self.$modal.success("删除成功");
                            self.loadMyCourses();
                        } else {
                            self.$modal.error("删除失败");
                        }
                    });
                });
            },
            getTime: function (time) {
                return window.dateMinute(time);
            },
            /*
            * 跳往详情页面
            * */
            goDetail: function (chapter) {
                var self = this;
                var data = {
                    courseId: chapter.courseId,
                    chapterId: chapter.id
                };
                Service.get("/jxxt/api/student/checkKcZj", data,(result)=> {
                    if (result.success){
                        var type = result.data.type;
                        var errorMsg = "";
                        var Url = "";
                        switch (type){
                            case 3:
                                errorMsg = this.resloveZY(result);
                                break;
                            case 4:
                                let obj = this.resloveKS(result);
                                errorMsg = obj.errorMsg;
                                Url = obj.Url;
                                break;
                            case 6:
                                errorMsg = this.resloveLX(result);
                                break;
                        }
                        if (errorMsg) {
                            this.$modal.warn(errorMsg);
                        } else {
                            location.href = Url || ("/ucenter/course/learning/" + this.course.id + "?chapterId=" + chapter.id);
                        }
                    } else {
                        self.$modal.error(result.message);
                    }
                });
            },
            resloveZY(result){
                if (result.data.jzzt > 0) {
                   return "该作业已过期！截止时间" + result.data.jzsj;
                }
                return null;
            },
            resloveKS(result){
                let errorMsg, Url;
                if (result.data.kszt === "wccj") {
                    errorMsg = "考试还未出成绩，请等待！";
                } else if (result.data.kszt === "yccj") {
                    //已经考完出成绩了，跳转到成绩详情页
                    Url ="/ucenter/view_exam?cjid=" + result.data.cjid + "&sjid=" + result.data.sjid;
                } else if (result.data.kszt === "wks") {
                    errorMsg =  "当前考试还未开始！开始日期：" + window.date(result.data.kssj);
                } else if (result.data.kszt === "yjs") {
                    errorMsg = "当前考试已截止！截止日期：" +window.date(result.data.jssj);
                }
                return {
                    "errorMsg":errorMsg,
                    "Url":Url
                };
            },
            resloveLX(result){
                if (result.data.lxzt === "no") {
                    return "练习次数已满！";
                }
                return null;
            },
            pageInit(){
                this.pageCon = new Pagination({
                    container: $(".paggsplit-page"),
                    pageTotal: 0,
                    callback: function (page) {
                        classManage.loadMyCourses(page);
                    }
                });
            }

        },
        created: function () {

        },
        mounted: function () {
            this.loadMyCourses();
            this.pageInit();
        }

    });

    return classManage;
});