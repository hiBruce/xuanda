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
                sj: {}
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
            //关闭
            closeModel: function () {
                window.close();
            },
            submitForm: function () {
                var self = this;
                var formData = decodeURI($('#ksForm').serialize());
                formData = decodeURIComponent(formData.replace(/\+/g, "  "));
                var data = {
                    formData: formData,
                    sjid: $("#examId").val(),
                    kcid: $("#courseId").val(),
                    kcnrid: $("#chapterId").val()
                };

                var success = function (result) {
                    if (result.resultCode == "0") {

                        window.location.href = "/course/detail/" + $("#courseId").val();
                    }
                };
                Service.post('/tkksxt/api/student/submitExercise', data, success);
            }

        },
        created: function () {
            this.sjTmList();
            this.getSj();
        },
        mounted: function () {
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