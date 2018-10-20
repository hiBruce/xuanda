define(function (require) {
    var app=new Vue({
        el:"#app",
        data:function(){
            return{
                registerForm:{
                    username:'',
                    password:'',
                    confirmPassword:'',
                    phone:'',
                    capchacode:''
                }
            }
        },
        methods:{
            getAuthCode:function(event){
                //验证手机号码格式
                if(!FormValidator.isValidPhoneNumber(this.registerForm.phone)){
                    FormValidator.showNormalInputTips($('#registerForm input[name=phone]').get(0), '手机号码格式错误，请重新输入！')
                    return false;
                }

                //验证验证码
                var success=function(result){
                    if (result.resultCode == "0") {
                        FormValidator.showNormalInputTips($(event.target).get(0), '验证码已发送！')    
                                   
                    } else {
                        FormValidator.showNormalInputTips($('#registerForm input[name=phone]').get(0), result.message) 
                    }
                };
                var params = {phone:this.registerForm.phone};
                Service.get('/centro/api/dw/sendCode',params, success);
            },
            register:function(id){
                var self=this;
                //验证用户名格式
                // if(!FormValidator.isValidUserName(this.registerForm.username)){
                //     FormValidator.showNormalInputTips($('#registerForm input[name=school]').get(0), '名称不能以数字开头,只能是中文、数字或英文且至少四位')
                //     $(event.target).focus();
                //     return false
                // }
                // //验证确认密码与密码一致

                // //验证手机号码格式              
                // if(!FormValidator.isValidPhoneNumber(this.registerForm.phone)){
                //     FormValidator.showNormalInputTips($('#registerForm input[name=phone]').get(0), '手机号码不能为空或者格式错误,请重新输入')
                //     return false
                // } 
                //注册提交信息
                var success = function (result) {
                    if (result.resultCode == "0") {
                        console.log("succuss")
                        console.log(result)
                    } else {
                        console.log(result)
                        //判断错误类型
                        if(result.field=='phone'){
                            //FormValidator.showNormalInputTips($('#registerForm input[name=phone]').get(0), result.message)
                        }else
                        if(result.field=='code'){
                            //FormValidator.showNormalInputTips($('#getcapchacode').get(0), result.message)
                        }else{
                            FormValidator.showNormalInputTips($('#register').get(0), result.message)
                        }                        
                    }
                };
                var params = { loginName: id.username, phone: id.phone,password:id.password, code: id.capchacode };
                Service.post('/centro/api/dw/user_register', params, success);            
               
            }
        }
    })
});