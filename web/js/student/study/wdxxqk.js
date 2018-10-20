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
                xyKcList: [],
                bjList: [],
                kcList: [],
                bjId: '',
                kcId: '',
                pagelit: ''
            };
        },
        methods: {
            /**
             * 获取学习情况
             */
            getXyKcList: function (pageNo) {
                var self = this;
                pageNo = pageNo || 1;
                var data = {
                    bjId: self.bjId,
                    kcId: self.kcId,
                    pageNo: pageNo,
                    pageSize: 10,
                    loading: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.xyKcList = result.data;
                        var pageTotal = Math.ceil(result.page.rowCount / result.page.pageSize);
                        if (pageNo === 1) {
                            self.pagelit.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.get("/jxxt/api/admin/xykctj/wdKcJd", data, success);
            },
            /**
             * 我的班级列表
             */
            getMyManagerBjList: function () {
                var self = this;
                var success = function (result) {
                    if (result.success) {
                        self.bjList = result.data;
                    }
                };
                Service.get("/jwxt/admin/bj/myClassList", null, success);
            },
            /**
             * 加载我的课程
             */
            loadMyManageCourseList: function () {
                var self = this;
                var success = function (result) {
                    if (result.success) {
                        self.kcList = result.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/myCourseList', null, success);
            },
            /**
             * 重置搜索
             */
            restSearch: function () {
                this.xyMc = '';
                this.bjId = '';
                this.kcId = '';
                this.getXyKcList();
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                this.pagelit = new Pagination({
                    container: $(".xscj_page"),
                    pageTotal: 0,//必填
                    callback: function (page) {//点击分页后的回调函数
                        self.getXyKcList(page);
                    }
                });
            }
        },
        created: function () {
            window.loading();
        },
        mounted: function () {
            this.pagination();
            this.getXyKcList();
            this.getMyManagerBjList();
            this.loadMyManageCourseList();
        }

    });
    return classManage;
});