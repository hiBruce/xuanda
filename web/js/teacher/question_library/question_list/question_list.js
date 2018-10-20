import page from "Pagination";
mod.question_list = Vue.component('question_list', {
    template: __inline("/web/html/teacher/question_library/question_list.html"),
    data: function () {
        return {
            tabNum:0
        };
    },
    components: {
        'wdtk': mod.my_question_list,
        'ggtk': mod.public_question_list,
    },
    methods: {
        showModal: function (name) {
            $("#modal_" + name).show();
        },

        /*
        * tab切换
        * */
        showTabs: function (num) {
            this.tabNum = num;
        }
    },
    created: function () {
    },
    mounted: function () {
    }
});
