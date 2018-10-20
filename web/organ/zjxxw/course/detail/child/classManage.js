/**
 * 我的管理的班级
 */
define(['Pagination'], function () {
   var classManage = Vue.component('classManage', {
        template: __inline('./classManage.html'),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                managerClassList: []
            };
        },
        methods: {
            /**
             * 加载管理的班级
             */
            loadMyManagerClass: function (page) {
                if (page == undefined) {
                    page = 1;
                }
                var self = this;
                var data = {
                    pageNo: page,
                    pageSize: 5
                };
                var success = function (result) {
                    self.managerClassList = result.data;
                    if (page == 1) {
                        self.pagelit.upDate({
                            pageTotal: result.pageCount
                        });
                    }
                };
                Service.get('/jwxt/admin/bj/myManagerClassPage', data, success);
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
        },
        mounted: function () {
            this.pagination();
            this.loadMyManagerClass();
        }

    });
   return classManage;
});