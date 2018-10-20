import page from "Pagination";
mod.course_copy = Vue.component('course_copy', {
    template: __inline("/web/html/teacher/create_course/course_copy.html"),
    data: function () {
        return {
            name: '',
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
            if (!self.name.trim()) {
                self.$modal.error("请输入课程名称！");
                return;
            }

            var data = {
                dwid: self.jxdInfo.id,
                name: self.name,
                courseId: self.options.kc.kcId,
                loading: true
            };
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.options.cb(1);
                    self.closeModal();
                    self.$modal.success("复制成功！");
                } else {
                    self.$modal.error(result.message);
                }
            };
            Service.get("/jxxt/api/admin/course/copyCourse", data, success);
        }
    },
    created: function () {
    },
    mounted: function () {
        this.jxdInfo = this.options.jxdInfo;
        this.name = this.options.kc.kcMc;
        this.courseId = this.options.kc.kcId;
    },
    props: ['options']
});
