import page from "Pagination";
mod.tag_list = Vue.component('tag_list', {
    template: __inline("/web/html/admin/group_manager/tag_list.html"),
    data: function () {
        return {
            pageNo: 1,
            pagelit: {},
            // 页面数据模型
            rows: []

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
                setTimeout(setfootDet,0)
                // //拿到分页信息，将总页码传入分页组件，更新页码
                // if (pageNo <= 1) {
                //     var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                //     self.pagelit.upDate({
                //         pageTotal: pageTotal
                //     });
                // }
            };
            Service.get('/zjxxw/api/admin/groupmgr/type/list', data, success);
        },

        /**
         * 修改圈子标签
         * @param id
         */
        modify: function (id) {
            window.location.assign('/admin#/jxzz/qzgl/tjbq?groupTypeId=' + id);
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
                Service.get('/zjxxw/api/admin/groupmgr/type/remove/' + id, null, success);
            });
        },

        /**
         * 初始化页面
         */
        initPage: function () {
        }
        // /**
        //  * 分页
        //  * @type {Pagination}
        //  */
        // pagination: function () {
        //     var self = this;
        //     this.pagelit = new Pagination({
        //         container: $(".pageSetting"),//必填
        //         pageTotal: 0,//必填
        //         callback: function (page) {//点击分页后的回调函数
        //             self.list(page);
        //         }
        //     });
        // }
    },
    created: function () {
        this.list();
    },
    mounted: function () {
        // this.pagination();
    }
});
