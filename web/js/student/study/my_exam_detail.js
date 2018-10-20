/**
 * 我的课程
 */
define(["Pagination"], function () {
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                danxRow: [],
                duoxRow: [],
                pandRow: [],
                zhugRow: [],
                cj: {},
                sj: {}
            };
        },
        methods: {
            tmList: function () {
                var self = this;
                var data = {
                    pageNo: -1,
                    cjid: $("#cjid").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.danxRow = result.data.danxList;
                        self.duoxRow = result.data.duoxList;
                        self.pandRow = result.data.pandList;
                        self.zhugRow = result.data.zhugList;
                        self.cj = result.data.cj;
                    }
                    ;
                    // setTimeout(window.setfootDet, 60);
                };
                Service.postBody('/tkksxt/api/admin/sjtm/list', data, success);
            },
            getSj: function () {
                var self = this;
                var data = {
                    id: $("#sjid").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.sj = result.data;
                    }
                    // setTimeout(window.setfootDet, 60);
                };
                Service.get('/tkksxt/api/admin/sj/get', data, success);
            }
        },
        created: function () {
            this.tmList();
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