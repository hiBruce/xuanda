/**
 * 教师列表
 * @author 胡晓光
 */

mod.js_edit = Vue.component('js_edit', {
    template: __inline("/web/html/admin/account_manager/list_teacher/js_edit.html"),
    data: function () {
        return {
            userInfo: {}
        };
    },
    methods: {
        closeModal: function () {
            this.$modal.hide(this);
        },
        /**
         * 修改后更新教师信息
         */
        update: function () {
            var self = this;
            var validationOptions = {
                showIputTips: true,
                showInputBorderRed: false,
                showLabelRed: false
            };

            var success = function (result) {
                if (result.resultCode == 0) {
                    self.$modal.hide();
                    self.options.method();
                    self.$modal.tip('success', '添加成功！');
                } else {
                    self.$modal.tip('error', result.message);
                }
            };
            FormValidator.validate('editForm', function (errors, validator) {
                // 判断是修改还是添加账号
                if(self.userInfo.id && self.userInfo.id.length > 0){
                    Service.postBody('/centro/api/user/updateUserInfo', self.userInfo, success);
                } else {
                    self.userInfo.userType = 'js';
                    Service.post('/centro/api/user/createAccount', self.userInfo, success);
                }

            }, validationOptions);
        },
    },
    created: function () {
        this.userInfo = Object.assign({}, this.options.userInfo);
    },
    props: ['options']
});