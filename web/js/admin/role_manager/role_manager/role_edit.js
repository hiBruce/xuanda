import page from "Pagination";

mod.role_edit = Vue.component('role_edit', {
    template: __inline("/web/html/admin/role_manager/role_list/role_edit.html"),
    data: function () {
        return {
            role : {},
            dataPermissionList: [
                {name: '仅本人数据', value: 10},
                {name: '所在部门及以下数据', value: 20},
                {name: '本单位及以下数据', value: 30},
                {name: '全部数据（管理员）', value: 99}
            ]
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
                } else {
                    self.$modal.tip('error', result.message);
                }
            };
            FormValidator.validate('editForm', function (errors, validator) {
                Service.postBody('/centro/api/role/update', self.role, success);
            }, validationOptions);
        },
    },
    created: function () {

    },
    mounted: function () {
        this.role = Object.assign({}, this.options.role);
    },
    props: ['options']
});
