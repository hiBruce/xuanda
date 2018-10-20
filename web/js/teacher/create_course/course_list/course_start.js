import page from "Pagination";
mod.course_start = Vue.component('course_start', {
    template: __inline("/web/html/teacher/create_course/course_start.html"),
    data: function () {
        return {
            jxdInfo: {},
            name: '',
            periodId : '',
            periodRow : []
        };
    },
    methods: {
        closeModal: function () {
            this.$modal.hide(this);
        },
        //获取周期列表
        periodList : function () {
            var self = this;
            var data = {
                dwId : self.jxdInfo.id,
                type : 1
            };
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.periodRow = result.data;
                } else {
                    self.$modal.error(result.message);
                }
            };
            Service.get('/jxxt/api/period/list', data, success);
        },

        /**
         * 提交
         */
        submitDwKc: function () {
            var self = this;
            if (!self.name.trim()) {
                self.$modal.warn("请输入课程名称！");
                return;
            }
            if(self.periodId == ""){
                self.$modal.warn("请选择开课周期！");
                return;
            }

            var data = {
                dwid: self.jxdInfo.id,
                name: self.name,
                periodId : self.periodId,
                courseId: self.options.kc.kcId,
                loading: true
            };
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.options.cb(1);
                    self.closeModal();
                    self.$modal.success("开课成功！");
                } else {
                    self.$modal.error(result.message);
                }
            };
            Service.get("/jxxt/api/admin/course/copyCourse", data, success);
        }
    },
    created: function () {
        this.periodList();
    },
    mounted: function () {
        this.jxdInfo = this.options.jxdInfo;
        this.name = this.options.kc.kcMc;
        this.courseId = this.options.kc.kcId;
    },
    props: ['options']
});
