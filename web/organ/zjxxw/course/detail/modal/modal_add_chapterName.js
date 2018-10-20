/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("./modal_add_chapterName.html"),
        data: function () {
            return {
                chapter: {
                    type: 1,
                    contentType: 0,
                    courseId: '',
                },
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
            },
            /**
             * 提交章节名称
             */
            submitChapter: function () {
                var self = this;
                if (this.options.thisChapter.name) {
                    this.options.thisChapter.courseId = this.options.course.id;
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.options.callback(result.data);
                            self.$modal.success("操作成功！");
                            self.closeModal();
                        }
                    };
                    Service.postBody('/jxxt/api/admin/chapter/update', this.options.thisChapter, success);
                } else {
                    this.$modal.error("请输入章节名称，再点击确定按钮!");
                }
            },
        },
        created: function () {
            if (isNull(this.options.thisChapter)) {
                this.options.thisChapter = {
                    name: '',
                    contentType: 0,
                    parentId: this.options.parentChapter ? this.options.parentChapter.id : '',
                    type: 1
                };
            }
        },
        mounted: function () {

        },
        props: ['options']
    });
    return modal
});