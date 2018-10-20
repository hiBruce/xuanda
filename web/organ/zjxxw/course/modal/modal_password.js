/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("./modal_password.html"),
        data: function () {
            return {
                password:""
            }
        },
        methods: {
            closeModal:function(){
                this.$modal.hide(this)
            },
            submitPas:function(){
                if(this.password){
                    var self = this;
                    Service.post("/jxxt/api/admin/course/checkCoursePwd",{
                        courseId:this.options.course.id,
                        pwd:this.password
                    },function(res){
                        if(res.success){
                            if(res.data){
                                self.$modal.success("验证成功",function(){
                                    if(self.options.surecb){
                                        self.options.surecb()
                                    }
                                })
                            }else{
                                self.$modal.error('密码错误')
                            }
                        }else{
                            self.$modal.error(res.message)
                        }
                    })
                }else{
                    this.$modal.warn("请输入密码!")
                }
            }
        },
        created: function () {
            var self = this;
        },
        mounted: function () {

        },
        props: ['options']
    });
    return modal
});