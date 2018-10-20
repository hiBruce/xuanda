/*
 *编辑试题，此组件需要根据实际业务再次修改
 * */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("./cjtl.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                tl: {
                    nr: '',
                },
                course: {},
                bj: {},
            };
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this);
            },
            /**
             * 提交章节名称
             */
            submitTl: function () {
                var self = this;
                var data = self.tl;
                if (!self.tl.nr.trim()) {
                    self.$modal.error('请输入讨论内容');
                    return;
                }
                self.tl.kcId = self.course.id;
                self.tl.kcMc = self.course.name;
                self.tl.bjId = self.bj.id;
                self.tl.bjMc = self.bj.bjmc;
                var success = function (result) {
                    self.result = result;
                    if (result.success) {
                        self.closeModal();
                        self.$modal.success("创建成功");
                        self.options.cb(1);
                    }
                };
                Service.postBody("/jxxt/api/admin/tlq/update", data, success);
            }
        },
        created: function () {
            this.course = this.options.course;
            this.bj = this.options.bj;
        },
        mounted: function () {
        },
        props: ['options']
    });
    return modal;
});