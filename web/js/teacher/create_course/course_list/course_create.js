import page from "Pagination";
mod.course_create = Vue.component('course_create', {
    template: __inline("/web/html/teacher/create_course/course_create.html"),
    data: function () {
        return {
            kcMc: '',
        };
    },
    methods: {
        closeModal: function () {
            this.$modal.hide(this);
        },
        /**
         * 提交
         */
        submitDwKc: function () {
            var self = this;
            if (!self.kcMc.trim()) {
                self.$modal.error("请输入课程名称！");
                return;
            }
            var data = {
                dwId: self.jxdInfo.id,
                kcMc: self.kcMc,
                templateType: 9
            };
            var success = function (result) {
                self.result = result;
                if (result.success) {
                    self.options.getCourseList();
                    self.closeModal();
                    self.$modal.success("创建成功！");
                }
            };
            Service.get("/jxxt/api/admin/dwkc/insert", data, success);
        }
    },
    created: function () {
    },
    mounted: function () {
    },
    props: ['options']
});
