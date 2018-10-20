/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("/web/html/student/course/modal/modal_add_menuName.html"),
        data: function () {
            return {
                kcxx: {
                    xxmc: '',
                    kcId: '',
                },
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
            },
            confirm: function () {
                var self = this;
                if (self.kcxx.xxmc) {
                    self.kcxx.kcId = self.options.course.id;
                    var success = function (result) {
                        self.kcxx = result.data;
                        self.options.cb(self.kcxx);
                        self.$modal.hide(self);
                    };
                    Service.postBody('/jxxt/api/admin/kcxx/update', this.kcxx, success);
                } else {
                    self.$modal.error("请输入菜单名称")
                }
            }
        },
        created: function () {

        },
        mounted: function () {

        },
        props: ['options']
    });
    return modal
});