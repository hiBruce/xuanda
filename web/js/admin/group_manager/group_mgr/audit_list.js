import page from "Pagination";
mod.audit_list = Vue.component('audit_list', {
    template: __inline("/web/html/admin/group_manager/audit_list.html"),
    data: function () {
        return {
            pageNo: 1,
            // 页面数据模型
            rows: [],
            pagelit: ''
        };
    },
    methods: {

        /**
         * 获取待审核圈子信息
         */
        list: function (pageNo) {
            var self = this;
            var pageNo = pageNo ? pageNo : self.pageNo;
            // 待审核圈子的审核状态字段 reviewStatus为0
            var reviewStatus = 0;
            var data = {
                pageNo: pageNo
            };
            var success = function (result) {
                self.rows = result.data;
                //拿到分页信息，将总页码传入分页组件，更新页码
                if (pageNo <= 1) {
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    self.pagelit.upDate({
                        pageTotal: pageTotal
                    });
                };
                setTimeout(setfootDet,0)
            };
            Service.get('/zjxxw/api/admin/group/list/' + reviewStatus, data, success);
        },

        /**
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            this.pagelit = new Pagination({
                container: $(".pageSetting"),//必填
                pageTotal: 0,//必填
                callback: function (page) {//点击分页后的回调函数
                    self.list(page);
                }
            });
        }
    },
    created: function () {
        this.list();
    },
    mounted: function () {
        this.pagination();
    }
});
