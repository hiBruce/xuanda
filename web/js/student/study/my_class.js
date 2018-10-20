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
                managerClassList: []
            };
        },
        methods: {
            /**
             * 加载我的班级
             */
            loadMyManagerClass: function (page) {
                if (!page) {
                    page = 1;
                }
                var self = this;
                var data = {
                    pageNo: page,
                    pageSize: 5,
                    loading: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.managerClassList = result.data;
                        if (page === 1) {
                            self.pagelit.upDate({
                                pageTotal: result.pageCount
                            });
                        }
                    }
                };
                Service.get('/jwxt/admin/bj/myClassPage', data, success);
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
                        self.loadMyManagerClass(page);
                    }
                });
            }
        },
        created: function () {
            // window.loading();
        },
        mounted: function () {
            this.pagination();
            this.loadMyManagerClass();
        }

    });
    return classManage;
});