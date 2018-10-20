/**
 * 我的课程
 */
define(['../menu.js',"Pagination"], function (menu) {
    menu.init();
    let classManage = new Vue({
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
                    kcnrlx: 4
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
                        if (pageNo ===1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.postBody('/tkksxt/api/admin/cj/list', data, success);
            },
            //获取我选择的课程列表
            wdkc: function () {
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
                window.location.href = "/ucenter/view_exam?cjid=" + cj.id + "&sjid=" + cj.sjid;
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
            this.wdkc();
        },
        mounted: function () {
            this.pageInit();
        }

    });
    return classManage;
});