/**
 * 班级公告
 */
define(['Pagination', 'confirm'], function () {
    var notice = Vue.component('notice', {
        template: __inline("./index.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                pagelit: '',
                ggList: [],
                bjList: [],
                kcList: [],
                result: {},
                gg: {},
                tabNum: 1,
                ggLx: 1,
                type: 1,
                bjId: '',
                kcId: '',
                tempStaging: "",//暂存编辑内容
                isJs: $("#isJs").val(),
                courseId: $("#courseId").val(),
                pageNo: 1,
            };
        },
        methods: {
            /**
             * 加载公告
             */
            getGgList: function (page) {
                var self = this;
                self.pageNo = page ? page : self.pageNo;
                var data = {
                    pageNo: page,
                    pageSize: 6,
                    kcId: self.course.id,
                    lx: self.ggLx,
                    type: self.type
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.ggList = result.data ? result.data : [];
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        if (self.pageNo == 1) {
                            self.pagelit.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    } else {

                    }

                };
                Service.get('/jxxt/api/admin/gg/gglist', data, success);
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                this.pagelit = new Pagination({
                    container: $(".hot-group-page"),//必填
                    pageTotal: 0,//必填
                    callback: function (page) {//点击分页后的回调函数
                        self.getGgList(page);
                    }
                });
            },
            /**
             * 获取我管理的班级列表
             */
            loadBjList: function () {
                var self = this;
                var success = function (result) {
                    self.bjList = result.data;
                };
                Service.get("/jwxt/admin/bj/myManagerClassList", null, success);
            },
            /**
             * 获取我管理的课程列表
             */
            loadKcList: function () {
                var self = this;
                var success = function (result) {
                    self.kcList = result.data;
                };
                Service.get("/jxxt/api/admin/course/myManageCourseList", null, success);
            },
            /**
             * 切换班级
             * @param bjId
             */
            changeBj: function (bjId) {
                this.bjId = bjId;
                this.getGgList();
            },
            /**
             * 切换课程
             * @param bjId
             */
            changeKc: function (kcId) {
                this.kcId = kcId;
                this.getGgList();
            },
            /*
             * 编辑班级公告
             * */
            editNr: function (ind) {
                this.tempStaging = this.ggList[ind]['nr'];
                Vue.set(this.ggList[ind], "canEdit", true);
            },
            /*
             * 取消编辑
             * */
            cancelEdit: function (ind) {
                Vue.set(this.ggList[ind], "canEdit", false);
                this.tempStaging = "";
            },
            /*
             * 保存编辑
             * */
            saveEdit: function (ind) {
                var gg = this.ggList[ind];
                gg.nr = this.tempStaging;
                this.submitGg(gg, ind);
                // 数据请求完成后执行
                // Vue.set(this.ggList[ind],"canEdit",false);
                // this.tempStaging = ""
            },
            //提交保存
            submitGg: function (gg, ind) {
                var self = this;
                var data = gg;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        Vue.set(self.ggList[ind], "canEdit", false);
                        self.tempStaging = "";
                    } else {
                        self.$modal.error("保存失败");
                    }
                };
                Service.post("/jxxt/api/admin/gg/update", data, success);
            },
            /**
             * 删除班级公告
             */
            deleteGg: function (id) {
                var self = this;
                Ewin.confirm({message: "确认要删除该公告吗？"}).on(function (e) {
                    if (e) {
                        var data = {id: id};
                        var success = function (result) {
                            self.result = result;
                            self.getGgList();
                        };
                        Service.get("/jxxt/api/admin/gg/delete", data, success);
                    }
                });
            },
            /*
             * 添加根目录按钮的显示弹框
             * 参数：不带modal_的页面名称
             * */
            showModal: function (lx) {
                var self = this;
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/class/modal/modal_create_notice_kc.js'),//必填
                    getGgList: self.getGgList,//点击关闭时的回调，如没有则不填
                    title: '发布课程公告',//必填
                    width: 600,
                    gglx: lx,
                    kcid: this.course.id,
                    bjList: self.bjList,
                    kcList: self.kcList
                });
            },
            /*
             * tab切换
             * */
            loadGgList: function (lx) {
                this.tabNum = lx;
                this.ggLx = lx;
                this.getGgList();
            },
            /**
             * 加载我管理的课程
             */
            getCourse: function () {
                var self = this;
                if (!isNull(this.courseId) && !this.courseId.isEmpty()) {
                    var success = function (result) {
                        self.course = result.data.course;
                        self.$root.course = result.data.course;
                        self.$root.learningStatus = result.data.learningStatus;
                        self.$root.teachers = result.data.teachers;
                        self.getGgList();
                    };
                    Service.get('/jxxt/api/admin/course/' + this.courseId, null, success);
                } else {
                    self.initPage();
                }
            },
            initParams: function () {
                if (!this.course.sourceType)
                    this.course.sourceType = 0;
                if (!this.course.sfsk)
                    this.course.sfsk = 0;
                if (!this.course.type)
                    this.course.type = 1;
                if (!this.course.studyStyle)
                    this.course.studyStyle = 0;
                this.getGgList();
            }
        },
        created: function () {
            this.course = this.$store.getters.getCourse();
            if (this.course.id) {
                this.initParams()
            } else {
                var self = this;
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.initParams()
                })
            }
        },
        mounted: function () {
            this.pagination();
        }

    });
    return notice;
});