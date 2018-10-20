mod.create_topic = Vue.component('create_topic', {
    template: __inline("/web/html/teacher/learning_trace/classes_discuss/create_topic.html"),
    data: function () {
        return {
            tl: {
                nr: '',
            },
            bjList: [],
            course: {},
            bj: {},
        };
    },
    methods: {
        closeModal: function () {
            this.$modal.hide(this);
        },

        /**
         * 获取班级列表
         */
        loadBjList: function () {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.bjList = result.data;
                    self.bj = self.bjList[0];
                }
            };
            Service.get("/jxxt/api/course/bj/bjList", {kcId: this.course.id}, success);
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
        this.course = this.options.kcList[0];
    },
    mounted: function () {
        this.loadBjList();
    },
    props: ['options']
});
