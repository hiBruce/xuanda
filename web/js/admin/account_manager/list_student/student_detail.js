/**
 * 教师列表
 * @author 胡晓光
 */

mod.student_detail = Vue.component('student_detail', {
    template: __inline("/web/html/admin/account_manager/list_student/student_detail.html"),
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