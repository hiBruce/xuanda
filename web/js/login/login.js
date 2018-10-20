define(function () {
    window.app = new Vue({
        el: "#app",
        data: function () {
            return {
                dataModel: {
                    login_name: '',
                    password: '',
                    captchaCode: '',
                    captchaId: ''
                }
            };
        },
        methods: {
            doLogin: function () {
                var self = this;
                $("#error_msg").css("display", "none");
                FormValidator.validate('loginForm', function () {
                    var redirect_url = URL.getParameter("redirect_url");
                    var app_key = URL.getParameter("app_key");
                    var data = $.extend(self.dataModel, {
                        redirect_url: redirect_url,
                        app_key: app_key,
                        autoLoginTime: self.autoLoginTime
                    });
                    Request.post('/login/doLogin',data,function(result){
                        if (result.success) {
                            window.location.href = redirect_url?redirect_url:'/';
                        } else {
                            $("#error_msg").html(data.message).css("display", "block");
                        }
                    });
                });
            }
        },
        mounted() {
        }
    });
});



