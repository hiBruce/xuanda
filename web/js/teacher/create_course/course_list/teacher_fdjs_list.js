import page from "Pagination";
mod.teacher_fdjs_list = Vue.component('teacher_fdjs_list', {
    template: __inline("/web/html/teacher/create_course/teacher_fdjs_list.html"),
    data: function () {
        return {
            jxdId: '',
            kcid: '',
            kcJsList: [],
            jsList: [],
            id: '',
            pageContro: {},
            pageNo: 1
        };
    },
    methods: {
        /**
         * 查看教学点课程辅导教师
         */
        getCourseJs: function (page) {
            var self = this;
            if (isNull(page)) page = 1;
            self.pageNo = page ? page : self.pageNo;
            var data = {
                kcId: self.options.kc.kcId,
                jxdId: self.options.jxdInfo.id,
                pageNo: self.pageNo,
                pageSize: 10,
                jszt: 1
            };
            var success = function (result) {
                if (result.success) {
                    self.kcJsList = result.data;
                    if (self.pageNo == 1) {
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        self.pageContro.upDate({
                            pageTotal: pageTotal
                        });
                    }
                } else {
                    self.$modal.tip("error", "数据加载异常，请重试！");
                }
            };
            Service.get('/jxxt/api/kcjs/kcJsLb', data, success);
        },
        showConfirm: function (js) {
            var self = this;
            self.id = js.id;
            self.$modal.confirm('取消教师' + js.name + '在课程' + self.options.kc.kcMc + '中辅导教师的身份？', self.submit, null);
        },
        submit: function () {
            var self = this;
            var data = {
                jsId: self.id,
                kcId: self.options.kc.kcId,
                jxdId: self.options.jxdInfo.id,
                jszt: 1
            };
            var success = function (ret) {
                if (ret.success) {
                    // for (i = 0; i < self.kcJsList.length; i++) {
                    //     if (self.kcJsList[i].id == self.id) {
                    //         self.kcJsList.splice(i, 1);
                    //     }
                    // }
                    self.getCourseJs(self.pageNo);
                    self.$modal.success("删除成功！");
                } else {
                    self.$modal.tip("error", "删除失败请重试！");
                }
            };
            Service.get('/jxxt/api/kcjs/scKcJs', data, success);
        },
        closeModal: function () {
            this.$modal.hide(this);
        },
        /**
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            self.pageContro = new Pagination({
                container: $('.hwmanagement_page_2'),//必填
                pageTotal: 0,//必填，此处默认为0
                callback: function (page) {//点击分页后的回调函数
                    self.getCourseJs(page);
                }
            });
        }
    },
    created: function () {
    },
    mounted: function () {
        this.getCourseJs();
        this.pagination();
    },
    props: ['options']
});
