define(function () {
    var modal = Vue.component('modal',{
        template: __inline("./modal_answer_reply.html"),
        data: function () {
            return {
                row:[],
            }
        },
        methods: {
            init:function () {
                CKEDITOR.replace('edit_container', { height: '240px', width: '100%' });
                setTimeout(function(){
                    CKEDITOR.instances['edit_container'].setData('');
                },0)
            },
            submit:function () {
                var self = this;
                if(CKEDITOR.instances['edit_container'].getData().isEmpty()){
                    self.$modal.tip('error','请输入回复内容！',null,3000)
                    return
                }
                self.row.lsxx = CKEDITOR.instances['edit_container'].getData();
                self.row.children = [];
                var success = function (ret) {
                    if(ret.success){
                        self.$modal.hide(self)
                        self.options.method();
                    }else{
                        self.$modal.tip('error','系统异常请重试！',null,3000)
                    }
                }
                Service.postBody('/jxxt/api/course/ksdy/submit',self.row,success)
            },
            closeModal: function () {
                this.$modal.hide(this)
            },
        },
        created: function () {
            var self = this;
            self.row = self.options.row;
        },
        mounted: function () {
            var self = this;
            self.init();
        },
        props: ['options']
    });
    return modal
});