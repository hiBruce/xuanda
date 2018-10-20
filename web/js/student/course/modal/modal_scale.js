/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.extend({
        template: __inline("/web/html/student/course/modal/modal_scale.html"),
        data: function () {
            return {
                courseKh: {},
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this);
            },
            /**
             * 提交课程考核比例设置
             */
            submitScale: function () {
                var self = this;
                // 验证比例之和是否为100%
                var khbl = Number(self.courseKh.spbl) + Number(self.courseKh.lxbl)
                    + Number(self.courseKh.csbl) + Number(self.courseKh.qdbl)
                    + Number(self.courseKh.zybl);
                if (khbl === 100) {
                    self.courseKh.kcId = self.options.course.id;
                    var success = function (result) {
                        self.$modal.success("设置成功！");
                        self.closeModal();
                    };
                    Service.postBody('/jxxt/api/admin/course/updateKcKh', self.courseKh, success);
                } else {
                    self.$modal.error("所设比例总和不为100%，请修改后再次提交！");
                }
            },

            /**
             * 根据课程id获取该课程的考核比例
             *
             * @param courseId
             */
            getKcKh: function (courseId) {
                var self = this;
                var success = function (result) {
                    if (result.data) {
                        self.courseKh = result.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/getKhBl/' + courseId, null, success);
            }
        },
        created: function () {
            this.getKcKh(this.options.course.id);
        },
        mounted: function () {

        },
        props: ['options']
    });
    return modal
});