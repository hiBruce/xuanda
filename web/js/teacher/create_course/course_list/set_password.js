import page from "Pagination";
mod.set_password = Vue.component('set_password', {
    template: __inline("/web/html/teacher/create_course/set_password.html"),
    data: function () {
        return {
            password: '',
        };
    },
    methods: {
        closeModal: function () {
            this.$modal.hide(this);
        },
        checkPassword: function () {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.closeModal();
                    self.options.cb(self.options.course,self.options.type);
                } else {
                    self.closeModal();
                    self.$modal.error(result.message);
                }
            };
            Service.post("/centro/api/user/checkPassword", {password: this.password}, success);
        }
    },
    created: function () {
    },
    mounted: function () {
        this.pagination();
        this.getDwJsList();
    },
    props: ['options']
});
