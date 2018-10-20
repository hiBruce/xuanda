/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("/web/html/student/course/modal/detail_tm.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                currentTm : {}
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this);
            },
            //查看题目
            viewTm : function(tm){
                var self = this;
                var data = {
                    id: tm.id
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.currentTm = result.data;
                    }
                };
                Service.get('/tkksxt/api/admin/tk/getForEdit', data, success);

            },
        },
        created: function () {
            this.viewTm(this.options.tm);
        },
        mounted: function () {
        },
        props: ['options']
    });
    return modal
});