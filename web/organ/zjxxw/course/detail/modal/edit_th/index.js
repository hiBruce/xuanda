/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function (){
    var modal = Vue.component('modal', {
        template: __inline("./index.html"),
        data: function () {
            return {
                th:{},
                content:''
            }
        },
        methods: {
            closeModal: function (){
                this.$modal.hide(this);
            },
            submitTH:function(){
                var self = this;
                if (!self.th.cnr) {
                    self.$modal.removeLoad();
                    self.$modal.error("请输入体会内容，再点击提交按钮！");
                } else {
                    if(self.th.cnr.length>500){
                        self.$modal.warn("体会最多输入500，当前字数："+self.th.cnr.length);
                        return;
                    }
                    self.th.ckcid = self.options.course.id;
                    self.th.ckcmc = self.options.course.name;
                    self.th.loading= true;
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.$modal.success("修改成功！");
                            self.closeModal();
                            self.options.cb && self.options.cb()
                            self.th ={};
                        }else{
                            self.$modal.error("修改失败！");
                        }
                        // document.querySelector("#num").innerText = 0;
                    };
                    Service.postBody('/jxxt/api/course/notes/updateTh', self.th, success);
                }
            }
        },
        created: function (){
        },
        mounted: function (){
            this.th = JSON.parse(JSON.stringify(this.options.th));
            if(this.th.cnr){
                $("#num").text(this.th.cnr.length)
            }
        },
        props: ['options']
    });
    return modal
});