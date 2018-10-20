mod.edit_article = Vue.component('edit_article', {
    template: __inline("/web/html/admin/cms/article_manager/edit_article.html"),
    data: function () {
        return {
            article: {}
        };
    },
    methods: {
        /**
         * 初始化编辑器
         * @param id
         * @param content
         */
        initEditor: function (id, content) {
            CKEDITOR.replace(id);
            if (content) {
                CKEDITOR.instances[id].setData(content);
            }
        },

        /**
         * 提交保存文章
         */
        submit: function () {
            var self = this;
            this.article.content = CKEDITOR.instances['content'].document.getBody().getText();
            var validationOptions = {
                showIputTips: true,
                showInputBorderRed: false,
                showLabelRed: false
            };

            var success = function (result) {
                if (result.resultCode == 0) {
                    self.$modal.hide();
                    self.options.method(result.data);
                    self.$modal.tip('success', '操作成功！');
                } else {
                    self.$modal.tip('error', result.message);
                }
            };

            self.article['_source_'] = 'aCms';
            FormValidator.validate('editForm', function (errors, validator) {
                // 判断是修改还是添加账号
                Service.post('/api/content/save', self.article, success);
            }, validationOptions);
        }
    },
    created: function () {
        //window.loading()
    },
    mounted: function () {
        this.article = Object.assign({}, this.options.article);
        this.initEditor('content', this.article.content);
    },
    props: ['options']
});
