import page from "Pagination";
mod.category_list = Vue.component('category_list', {
    template: __inline("/web/html/admin/activity_manager/category_manager/category_list.html"),
    data: function () {
        return {
            pageNo: 1,
            pagelit: '',
            // 页面数据模型
            rows: []
        };
    },
    methods: {
        /**
         * 获取活动分类信息
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
                if (pageNo <= 1) {
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    self.pagelit.upDate({
                        pageTotal: pageTotal
                    });
                    setTimeout(setfootDet,0)
                }
            };
            Service.get('/zjxxw/api/admin/activitytype/list', data, success);
        },

        /**
         * 修改活动分类
         * @param id
         */
        modify: function (id) {
            this.$router.push('/jxzz/hdgl/tjhdfl?id=' + id);
        },

        /**
         * 删除一个活动分类
         * @param id
         */
        remove: function (id) {
            var self = this;
            var success = function (result) {
                self.list();
            };
            this.$modal.confirm('确定要删除吗？', function (result) {
                Service.get('/zjxxw/api/admin/activitytype/' + id + '/delete', null, success);
            });
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
        },
        /**
         * 初始化页面
         */
        initPage: function () {
        }
    },
    created: function () {
        this.list();
    },
    mounted: function () {
        this.pagination();
    }
});
