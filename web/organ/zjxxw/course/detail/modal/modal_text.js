/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("./modal_text.html"),
        data: function () {
            return {}
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this);
                CKEDITOR.instances['text_container'].destroy();
            },
            /**
             * 提交章节名称
             */
            submitChapter: function () {
                var self = this;
                // type值为5时，为文本格式的章节
                self.options.thisChapter.type = 5;
                if (self.options.thisChapter.contentName) {
                    self.options.thisChapter.courseId = self.options.course.id;
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.options.callback(result.data);
                            self.$modal.success("操作成功！");
                            self.closeModal();
                        }
                    };
                    Service.postBody('/jxxt/api/admin/chapter/update', this.options.thisChapter, success);
                } else {
                    self.$modal.warn("请输入章节名称，再点击确定按钮!");
                }
            },
            /*
             * 显示编辑介绍
             * */
            showEditIntro: function () {
                var self = this;
                setTimeout(function () {
                    CKEDITOR.instances = {};
                    CKEDITOR.replace('text_container');
                    if (self.options.thisChapter.profile && CKEDITOR.instances['text_container']) {
                        CKEDITOR.instances['text_container'].setData(self.options.thisChapter.profile);
                    }
                }, 10);
            },
            /**
             * 保存编辑介绍
             */
            saveEditText: function () {
                var realContent = CKEDITOR.instances['text_container'].document.getBody().getText();
                if (realContent.trim()) {
                    var editContent = CKEDITOR.instances['text_container'].getData();
                    this.options.thisChapter.profile = editContent;
                    this.submitChapter();
                } else {
                    this.$modal.warn('请填写文本内容，再点击保存按钮！');
                }
            },
        },
        created: function () {
            if (isNull(this.options.thisChapter)) {
                this.options.thisChapter = {
                    contentName: '',
                    profile: '',
                    contentParentId: this.options.parentChapter.id,
                    type: 5,
                    contentType: 1,
                };
            }
            ;
            this.showEditIntro();
        },
        mounted: function () {

        },
        props: ['options']
    });
    return modal
});