/**
 * 教师列表
 * @author 胡晓光
 */

mod.js_detail = Vue.component('js_detail', {
    template: __inline("/web/html/admin/account_manager/list_teacher/js_detail.html"),
    data: function () {
        return {
            userInfo: {}
        };
    },
    methods: {
        closeModal: function () {
            this.$modal.hide(this);
        }
    },
    created: function () {
        this.userInfo = this.options.userInfo;
    },
    props: ['options']
});