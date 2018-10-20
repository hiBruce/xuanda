import page from "Pagination";
mod.pro = Vue.component('pro', {
    template: __inline("/web/html/teacher/question_library/my_question_list.html"),
    data: function () {
        return {
            a:11
        };
    },
    methods: {
        callPraentCb:function(){
            this.cb(this.a)
        },
        closeModal:function(){
            this.$modal.hide('select_pro')
        }
    },
    created: function () {
    },
    mounted: function () {
    },
    props: ['com','cb']
});
