import page from "Pagination";
mod.modal_select_homework = Vue.component('modal_select_homework', {
    template: __inline("/web/html/teacher/question_library/modal/modal_select_homework.html"),
    data: function () {
        return {
            a:11
        };
    },
    methods: {
        closeModal:function(){
            this.$modal.hide(this)
        },
    },
    created: function () {
    },
    mounted: function () {
    },
    props: ['options']
});
