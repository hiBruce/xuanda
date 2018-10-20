/**
 * 我的课程
 */
define(['../menu.js',"Pagination"], function (menu) {
    menu.init();
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                kcRow: [],
                cjList: [],
                searchOptions: {
                    zt: 2,//全部
                    kcid: '',
                    kcnrmc: '',
                    kcnrlx: 6
                }
            };
        },
        methods: {
            getcjList: function (page) {
                var self = this;
                var pageNo = page || 1;
                var data = {
                    pageNo: pageNo,
                    cj: self.searchOptions,
                    zt: 0,
                    loading: true
                };
                var success = function (result) {
                    if (result.success) {
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        self.cjList = result.data;
                        if (pageNo === 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        }
                        // // setTimeout(setfootDet, 0);
                    }
                };
                Service.postBody('/tkksxt/api/admin/cj/list', data, success);
            },
            //获取我管理的课程列表
            wcjdkc: function () {
                var self = this;
                var data = {};
                var success = function (result) {
                    if (result.success) {
                        self.kcRow = result.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/myCourseList', data, success);
            },
            chakan: function (cj) {
                //查看试卷
                window.location.href = "/ucenter/view_exercise?cjid=" + cj.id + "&sjid=" + cj.sjid;
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".cj-page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getcjList(page);
                    }
                });
            }
        },
        created: function () {
            // window.loading();
            this.getcjList();
            this.wcjdkc();
        },
        mounted: function () {
            this.pageInit();
        }

    });
    return classManage;
});