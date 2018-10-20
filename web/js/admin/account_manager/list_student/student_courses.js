/**
 * 教师列表
 * @author 胡晓光
 */

mod.student_courses = Vue.component('student_courses', {
    template: __inline("/web/html/admin/account_manager/list_student/student_courses.html"),
    data: function () {
        return {
            pageSize: 10,
            pageNo: 1,
            pageContro: '',
            dwkcList: []
        };
    },
    methods: {
        /**
         * 查看教学点课程辅导教师
         */
        getCourseJs: function (page) {
            var self = this;
            if (isNull(page)) page = 1;
            var data = {
                xyId: self.options.xs.id,
                dwId: self.options.jxdInfo.id,
                pageNo: page,
                pageSize: 10
            };
            var success = function (result) {
                if (result.success) {
                    self.dwkcList = result.data;
                    if (page == 1) {
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        self.pageContro.upDate({
                            pageTotal: pageTotal
                        });
                    }
                } else {
                    self.$modal.tip("error", "数据加载异常，请重试！");
                }
            };
            Service.get('/jxxt/api/admin/dwkc/ckxynbkc', data, success);
        },
        /**
         * 移除学员课程
         * @param dwkc
         */
        scKc: function (dwkc) {
            var self = this;
            self.$modal.confirm('移除学员' + self.options.xs.name + '的课程' + dwkc.kcMc + '？', function () {
                var data = {
                    xyId: self.options.xs.id,
                    kcId: dwkc.kcId
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.success('移除成功！');
                        self.getCourseJs(1);
                    } else {
                        self.$modal.error(result.message);
                    }
                };
                Service.get('/jxxt/api/fk/scxykc', data, success);
            }, null);
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
    mounted: function () {
        this.getCourseJs();
        this.pagination();
    },
    props: ['options']
});