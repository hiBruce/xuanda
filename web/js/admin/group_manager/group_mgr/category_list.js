import page from "Pagination";
mod.category_list = Vue.component('category_list', {
    template: __inline("/web/html/admin/group_manager/category_list.html"),
    data: function () {
        return {
            pageNo: 1,

            // 页面数据模型
            rows: [],
            pageCon:''

        };
    },
    methods: {

        /**
         * 获取圈子标签信息
         */
        list: function (pageNo) {
            var self = this;
            var pageNo = pageNo ? pageNo : self.pageNo;
            var data = {
                pageNo: pageNo
            };
            var success = function (result) {
                self.rows = result.data;
                //拿到分页信息，将总页码传入分页组件，更新页码
                // if (pageNo <= 1) {
                //     var totalPage = Math.ceil(result.page.rowCount / result.page.pageSize);
                //     self.pageCon.upDate({
                //         pageTotal: totalPage
                //     });
                // }
            };
            Service.get('/zjxxw/api/admin/groupmgr/classify/list', data, success);
        },

        /**
         * 修改圈子标签
         * @param id
         */
        modify: function (id) {
            window.location.assign('/admin#/jxzz/qzgl/tjfl?groupClassId=' + id);
        },

        /**
         * 删除一个圈子标签
         * @param id
         */
        remove: function (id) {
            var self = this;
            var success = function (result) {
                self.list();
            };
            self.$modal.confirm('确定要删除吗？', function (result) {
                Service.get('/zjxxw/api/admin/groupmgr/classify/remove/' + id, null, success);
            });
        },

        /**
         * 初始化页面
         */
        initPage: function () {
            var self = this;
            this.pageCon = new Pagination({
                container: $(".pageSetting"),
                pageTotal: 0,
                callback: function (page) {
                    self.list(page);
                }
            });
        }
    },
    created: function () {
        this.list();
    },
    mounted: function () {
    }
});
