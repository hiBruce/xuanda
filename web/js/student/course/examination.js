define(["Pagination"], function () {
    var classManage = new Vue({
        el: ".page",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                danxRow: [],
                duoxRow: [],
                pandRow: [],
                zhugRow: [],
                danxZf: 0,
                duoxZf: 0,
                pandZf: 0,
                zhugZf: 0,
                sj: {},
                m: 0,
                s: 60,
                flag: true,
                testTime: 0,
                submitFlag: true
            };
        },
        methods: {
            //根据试卷id和课程id获取试卷题目信息，包括分值
            sjTmList: function () {
                var self = this;
                var data = {
                    pageNo: -1,
                    sjid: $("#examId").val(),
                    kcid: $("#courseId").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.danxRow = result.data.danxList;
                        self.duoxRow = result.data.duoxList;
                        self.pandRow = result.data.pandList;
                        self.zhugRow = result.data.zhugList;
                        self.danxZf = result.data.danxZf;
                        self.duoxZf = result.data.duoxZf;
                        self.pandZf = result.data.pandZf;
                        self.zhugZf = result.data.zhugZf;
                    }
                };
                Service.postBody('/tkksxt/api/admin/sjtm/list', data, success);
            },
            getSj: function () {
                var self = this;
                var data = {
                    id: $("#examId").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.sj = result.data;
                    }
                };
                Service.get('/tkksxt/api/admin/sj/get', data, success);
            },
            djs: function () {
                var self = this;
                if (this.m == -1) {
                    //不限时
                    this.flag = false;
                } else {
                    window.clearInterval(settime);
                    var settime = window.setInterval(function () {
                        self.showtime(settime);
                    }, 1000);
                }
            },
            showtime: function (settime) {
                this.s = this.s - 1;
                this.testTime = this.testTime + 1;
                if (this.s == 0) {
                    if (this.m == 0) {
                        //提交试卷
                        window.clearInterval(settime);
                        this.submitSj();
                    } else {
                        this.m = this.m - 1;
                        this.s = 60;
                    }
                }
            },
            //提交试卷
            submitSj: function () {
                this.$modal.confirm("考试倒计时已结束，将自动提交试卷...", this.submitForm, 1);
            },
            //关闭
            closeModel: function () {
                window.close();
            },
            submitForm: function () {
                var self = this;

                var formData = decodeURI($('#ksForm').serialize());
                formData = decodeURIComponent(formData.replace(/\+/g, "  "));   // g表示对整个字符串中符合条件的都进行替换
                var data = {
                    formData: formData,
                    sjid: $("#examId").val(),
                    kcid: $("#courseId").val(),
                    kcnrid: $("#chapterId").val(),
                    testTime: this.testTime,
                    sjzf: this.sj.zfz
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.$modal.confirm("提交成功", function () {
                            window.location.href = "/course/detail/" + $("#courseId").val();
                        }, 1);
                    } else {
                        self.$modal.error("提交失败");
                        self.submitFlag = true;
                    }
                };

                if (this.submitFlag) {
                    self.submitFlag = false;
                    Service.post('/tkksxt/api/student/submitExam', data, success);
                }

            }
        },
        created: function () {
            this.sjTmList();
            this.getSj();
        },
        mounted: function () {
            this.m = parseInt($("#kssc").val()) - 1;
            this.djs();
        }
    });
    var pageCon = new Pagination({
        container: $(".paggsplit-page"),
        pageTotal: 0,
        callback: function (page) {
            classManage.loadMyCourses(page);
        }
    });
    return classManage;
});