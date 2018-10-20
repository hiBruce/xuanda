import page from "Pagination";
mod.activity_audit = Vue.component('activity_audit', {
    template: __inline("/web/html/admin/activity_manager/activity_mgr/activity_audit.html"),
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
         * 获取待审核资源列表
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
                };
                setTimeout(setfootDet,0)
            };
            Service.get('/zjxxw/api/admin/activity/resource/reviewList', data, success);
        },

        /**
         * 提交审核
         * @param id
         */
        reviewRec: function (id, reviewStatus) {
            var self = this;
            var text = reviewStatus==1?'确定要通过此资源吗？':'确定要驳回此资源吗？'
            this.$modal.confirm(text,function(){
                var param = {
                    id: id,
                    reviewStatus: reviewStatus
                };
                var success = function (result) {
                    self.$modal.tip('操作成功');
                    //window.location.assign('/admin#/jxzz/hdgl/hdsh');
                    self.list();
                };
                Service.post('/zjxxw/api/admin/activity/resource/review', param, success);
            })

        },

        /*
        * 图片大图
        * */
        showImg: function (url) {
            this.$modal.img(url);
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
