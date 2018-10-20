import page from "Pagination";
mod.edit_channel = Vue.component('edit_channel', {
    template: __inline("/web/html/admin/cms/channel_manager/edit_channel.html"),
    data: function () {
        return {
            channel : {
            }
        };
    },
    methods: {
        save : function (){
            var self = this;
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

            self.channel['_source_']= 'aCms',
            FormValidator.validate('editForm', function (errors, validator) {
                // 判断是修改还是添加账号
                Service.post('/api/channel/save', self.channel, success);
            }, validationOptions);
        }
    },
    created: function () {
        //window.loading()
    },
    mounted: function () {
        this.channel = Object.assign({}, this.options.channel);
    },
    props: ['options']
});
