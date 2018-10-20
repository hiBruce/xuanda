/**
 * 验证码计时器
 * @type {{clock: null, nums: number, btn: null, start: AuthCodeTimer.start, count: AuthCodeTimer.count}}
 */
var AuthCodeTimer = {
        clock: null,
        nums: 120,
        start: function () {
            $('#changePhoneCodeBtn').html(this.nums + " s");
            this.clock = setInterval("AuthCodeTimer.count()", 1000); //一秒执行一次
        },
        count: function () {
            this.nums--;
            if (this.nums > 0) {
                $('#changePhoneCodeBtn').html(this.nums + " s");
            } else {
                clearInterval(this.clock); //清除js定时器
                $('#changePhoneCodeBtn').attr("disabled", false);
                $('#changePhoneCodeBtn').addClass("active");
                $('#changePhoneCodeBtn').html('获取验证码');
                this.nums = 120; //重置时间
            }
        },
        reset: function () {
            clearInterval(this.clock); //清除js定时器
            $('#changePhoneCodeBtn').attr("disabled", false);
            $('#changePhoneCodeBtn').addClass("active");
            $('#changePhoneCodeBtn').html('获取验证码');
            this.nums = 120; //重置时间
        }
    };

define(function (require) {
    var md = require('metadata');
    var Swiper = require('Swiper');
    var app = new Vue({
        el: "#app",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                dataModel: userInfo ? userInfo : '',
                areaProvince: {},
                areaCity: {},
                areaDistrict: {},
                areas: [],
                cities: [],
                districts: [],
                message: '操作成功！',
                pageNo: 1,
                // 页面数据模型
                rows: [],
                apps: [],
                tabNum: 1
            };
        },
        methods: {
            getAreas: function () {
                var self = this;
                return new Promise(function (res, rej) {
                    md.init(function () {
                        self.areas = metadata.getClassCodeCategory('area');
                        res();
                    });
                });
            },
            /**
             * tab切换
             */
            activeTab: function (num) {
                //this.initPage();
                this.tabNum = num;
                return;
            },
            /**
             * 获取当前登录用户
             */
            isEmptyUser: function () {
                if (isNull(this.dataModel.name)) this.dataModel.name = '';
                if (isNull(this.dataModel.gender)) this.dataModel.gender = '';
                if (isNull(this.dataModel.certificate)) this.dataModel.certificate = '';
                if (isNull(this.dataModel.email)) this.dataModel.email = '';
                if (isNull(this.dataModel.areaProvince)) this.dataModel.areaProvince = '';
                if (isNull(this.dataModel.areaCity)) this.dataModel.areaCity = '';
                if (isNull(this.dataModel.areaDistrict)) this.dataModel.areaDistrict = '';
                if (isNull(this.dataModel.phone)) this.dataModel.phone = '';

            },
            /**
             * 默认选中性别
             */
            radioChecked: function () {
                var gender = this.dataModel.gender;
                if (gender == 1) {
                    $("#male").attr("checked", "checked");
                }
                if (gender == 2) {
                    $("#female").attr("checked", "checked");
                }
            },
            /**
             * 默认选中地区
             */
            areaChecked: function () {
                var self = this;
                if (isNull(this.dataModel.areaProvince) || '' == this.dataModel.areaProvince) {
                    self.dataModel.areaProvince = this.areas[0].code;
                    self.dataModel.areaProvinceName = this.areas[0].name;
                    self.areaProvince = this.areas[0];
                    // self.cities = this.areas[0].children;
                    // self.dataModel.areaCity =self.cities[0].code;
                    // self.dataModel.areaCityName =self.cities[0].name;
                    // self.districts = self.cities[0].children;
                    // self.dataModel.areaDistrict =self.districts[0].code;
                    // self.dataModel.areaDistrictName =self.districts[0].name;
                } else {
                    var ind = 0;
                    var cityind = 0;
                    var distInd = 0;
                    this.areas.forEach(function (ele, i) {
                        if (ele.code == self.dataModel.areaProvince) {
                            ind = i;
                        }
                    });
                    self.areaProvince = this.areas[ind];
                    // self.cities = self.areaProvince.children;
                    // self.cities.forEach(function(ele,i){
                    //     if(ele.code ==  self.dataModel.areaCity){
                    //         cityind = i
                    //     }
                    // });
                    // self.areaCity = self.cities[cityind]
                    // self.districts = self.areaCity.children;
                    // self.districts.forEach(function(ele,i){
                    //     if(ele.code ==  self.dataModel.areaDistrict.code){
                    //         distInd = i
                    //     }
                    // });
                    // self.areaDistrict = self.districts[distInd];
                }
            },
            /**
             * 地区选择
             */
            changeProvince: function (v) {
                var self = this;
                this.areas.forEach(function (v) {
                    if (v.code === self.dataModel.areaProvince.code) {
                        this.cities = v.children;
                        this.districts = this.cities[0].children;
                    }
                });
            },
            changeCity: function () {
                var self = this;
                this.cities.forEach(function (v) {
                    (v.code === self.dataModel.areaCity) && (this.districts = v.children);
                });
            },
            /**
             * 验证两次输入的密码一致性
             */
            isSamePassword: function () {
                var newPassword = $("#newPassword").val();
                var passwordConfirm = $("#passwordConfirm").val();
                if (newPassword == passwordConfirm) return true;
                else {
                    FormValidator.showInputTips($("#newPassword"), '密码输入不一致！');
                    return false;
                }
                if(a===0){
                    return false
                }
            },
            /**
             * 新密码与旧密码是否一致
             */
            oldIsNewPwd: function () {

            },
            /**
             * 获取手机验证码
             */
            getAuthCode: function (event) {
                //判断是否填写了手机号，以及手机号是否正确
                if (!FormValidator.isValidPhoneNumber($('#newPhoneNumber').val())) {
                    FormValidator.showInputTips($('#newPhoneNumber'), '请正确填写手机号');
                } else {
                    FormValidator.clearErrorStatus($("#phoneForm"));
                    var btn = $(event.target);
                    btn.attr("disabled", true);

                    //调用后台 发送手机验证码
                    var success = function (result) {
                        if (result.resultCode == "0") {
                            AuthCodeTimer.start();
                            FormValidator.showNormalInputTips($('#captchaCode'), '验证码已发送，120s后重新获取');
                            var time = 0;
                            var getTime = setInterval(function () {
                                time++;
                                if (time <= 121) {
                                    clearInterval(getTime);
                                    btn.attr("disabled", false);
                                }
                            }, 1000);
                        } else {
                            FormValidator.showInputTips($('#captchaCode'), result.message);
                            btn.attr("disabled", false);
                        }
                    };
                    Service.get("/centro/api/sms/sendCode", {phone: $('#newPhoneNumber').val()}, success);
                }
            },
            /**
             * 获取列表
             */
            list: function () {
                var self = this;
                var data = {
                    type: '1'
                };
                var success = function (result) {
                    self.rows = result.data;
                    // self.settingChecked();
                };
                Service.get('/zjxxw/api/archives/classify/listAndChecked', data, success);
            },
            selectApps: function () {
                var self = this;
                var apps = '';
                var checkedapps = $("input[type=checkbox]:checked");
                console.log(checkedapps.size());
                for (var i = 0; i < checkedapps.size(); i++) {
                    //由于复选框一般选中的是多个,所以可以循环输出选中的值
                    var checkedone = checkedapps[i];
                    apps = apps + checkedone.name + ',';
                }
                if (apps != '') apps = apps.substring(0, apps.length - 1);
                var data = {'apps': apps};
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.$modal.tip("success", self.message);
                        Request.get("/loadSe", null, function () {
                            //location.reload();
                            self.list();
                        });
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.postBody('/centro/api/userapps/modifyApps', data, success);
            },
            /*
            * 解除绑定
            * */
            unbind: function (num) {
                var self = this;
                var text = (num == 1) ? 'QQ' : '微信';
                self.$modal.confirm('确定要解除绑定' + text + '吗?', function () {
                    Request.get("/unbind?type=" + num, null, function (res) {
                        if (res.resultCode == 0) {
                            self.$modal.success('操作成功');
                            Request.get("/loadSe", null, function () {
                                setTimeout(function () {
                                    location.reload();
                                }, 1500);
                            });
                        } else {
                            self.$modal.error('操作失败');
                        }
                    });
                });
            },
            /**
             * 表单提交
             */
            finishStep1: function () {
                var self = this;
                var btn = $(event.target);
                var validationOptions = {
                    showIputTips: true,
                    showInputBorderRed: false,
                    showLabelRed: false
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.$modal.confirm(self.message, function () {
                            Request.get("/loadSe", null, function () {
                                location.reload();
                            });
                        });
                    } else {
                        self.$modal.confirm(result.message);
                    }
                };
                FormValidator.validate('personalForm', function (errors, validator) {
                    self.dataModel.areaCity = self.areaCity.code;
                    self.dataModel.areaCityName = self.areaCity.name;
                    self.dataModel.areaDistrict = self.areaDistrict.code;
                    self.dataModel.areaDistrictName = self.areaDistrict.name;
                    self.dataModel.areaProvince = self.areaProvince.code;
                    self.dataModel.areaProvinceName = self.areaProvince.name;
                    Request.get("/updateUserInfo", self.dataModel, success);
                    // Service.postBody('/api/user/updateUserInfo', self.dataModel, success);
                }, validationOptions);

            },
            finishStep2: function () {
                var self = this;
                var validationOptions = {
                    showIputTips: true,
                    showInputBorderRed: false,
                    showLabelRed: false
                };
                var data = {
                    oldpwd: $("#oldPassword").val(),
                    newpwd: $("#passwordConfirm").val()
                };
                var oldPassword = $("#oldPassword").val();


                var success = function (result) {
                    if (!result.success) {
                        FormValidator.showInputTips($("#oldPassword"), '原密码不正确！');
                        return;
                    } else {
                        var success = function (result) {
                            if (result.success) {
                                self.$modal.confirm(self.message, function () {
                                    Request.get("/loadSe", null, function () {
                                        location.reload();
                                    });
                                }, 1);
                            } else {
                                self.$modal.confirm(result.message, null, 1);
                            }
                        };
                        Service.post('/centro/api/user/modifyPassword', data, success);
                    }
                };
                /**
                 * 验证用户原密码
                 */

                FormValidator.validate('pwdForm', function (errors, validator) {
                    if (self.isSamePassword()) {
                        if ($("#oldPassword").val() == $("#passwordConfirm").val()) {
                            FormValidator.showInputTips($("#newPassword"), '新密码不能与旧密码相同！');
                        } else {
                            Service.postBody('/centro/api/user/volidateOldPassword', oldPassword, success);
                        }
                    }
                }, validationOptions);


            },
            finishStep3: function () {
                var self = this;
                var validationOptions = {
                    showIputTips: true,
                    showInputBorderRed: false,
                    showLabelRed: false
                };

                var success1 = function (result) {
                    if (result.success) {
                        self.dataModel.phone = $("#newPhoneNumber").val();

                        self.$modal.confirm(self.message);
                        Request.get("/loadSe", null, function () {
                            location.reload();
                        });
                    } else {
                        self.$modal.confirm(result.message);
                    }
                };

                FormValidator.validate('phoneForm', function (errors, validator) {
                    var captchaCode = $("#captchaCode").val();
                    var data = {
                        code: captchaCode,
                        phone: $("#newPhoneNumber").val()
                    };
                    var success = function (result) {
                        if (result.resultCode == "0") {
                            Service.postBody('/centro/api/user/modifyPhone', $("#newPhoneNumber").val(), success1);
                        } else {
                            self.$modal.error(result.message);
                        }
                    };

                    Service.get('/centro/api/sms/checkCode', data, success);


                }, validationOptions);
            },
            finishStep4: function () {
                //debugger
                var self = this;
                var apps = '';
                var checkedapps = $("input[type=checkbox]:checked");
                console.log(checkedapps.size());
                for (var i = 0; i < checkedapps.size(); i++) {
                    //由于复选框一般选中的是多个,所以可以循环输出选中的值
                    var checkedone = checkedapps[i];
                    // console.log(checkedone.name)
                    apps = apps + checkedone.name + ',';
                    // console.log(checkedapps[i] + checkedone)h
                }
                if (apps != '') apps = apps.substring(0, apps.length - 1);
                var data = {'apps': apps};
                var success = function (result) {
                    if (result.success) {
                        location.reload();
                        self.$modal.confirm(self.message);
                    } else {
                        self.$modal.confirm(result.message);
                    }
                };
                Service.postBody('/centro/api/userapps/modifyApps', data, success);
            },
            initPage: function () {
                $("#newPhoneNumber").val('');
                $("#oldPassword").val('');
                $("#newPassword").val('');
                $("#passwordConfirm").val('');
                $("#captchaCode").val('');
            }
            /*uploadAvatar: function () {
                $("#result").on("click", function () {
                    $("#files").find('input').click();
                });
                var self = this;
                $.fcup({
                    updom: '#files',//这个是页面里定义好的一个元素
                    upurl: '/upfile',
                    upstr: self.dataModel.avator ? '修改头像' : '上传头像',
                    upfinished: self.dataModel.avator ? '修改头像' : '上传头像',
                    maxSize: 2,
                    acceptType: 'img',
                    upcallback: function (res) {
                        if (res.resultCode == 0) {
                            self.dataModel.avator = res.url;
                        } else if (res.resultCode == '2001') {
                            self.$modal.error(res.message);
                        } else {
                            self.$modal.error('上传失败');
                        }
                    },
                    errorcb: function (message) {
                        self.$modal.error(message);
                    }
                });
            }*/
        },
        watch: {
            'areaProvince': {
                handler: function (newval, oldVal) {
                    var self = this;
                    this.areas.forEach(function (val) {
                        if (val.code === newval.code) {
                            self.cities = val.children;
                            var ind = 0;
                            self.cities.forEach(function (ele, i) {
                                if (ele.code == self.dataModel.areaCity) {
                                    ind = i;
                                    return;
                                }
                            });
                            self.areaCity = self.cities[ind];
                            // self.dataModel.areaCity =self.cities[ind].code;
                            // self.dataModel.areaCityName =self.cities[ind].name;
                        }
                    });
                },
                deep: true
            },
            'areaCity': {
                handler: function (newval, oldVal) {
                    var self = this;
                    self.districts = this.areaCity.children;
                    var ind = 0;
                    this.districts.forEach(function (val, i) {
                        if (val.code == self.dataModel.areaDistrict) {
                            ind = i;
                            return;
                        }
                    });
                    self.areaDistrict = self.districts[ind];
                    // self.dataModel.areaDistrict =self.districts[ind].code;
                    // self.dataModel.areaDistrictName =self.districts[ind].name;
                },
                deep: true
            }

        },
        created: function () {
            var self = this;
            this.getAreas().then(function () {
                self.areaChecked();
            });
            this.isEmptyUser();
            this.radioChecked();
            this.list();
        },
        mounted: function () {
            Vue.nextTick(this.uploadAvatar);
        }
    });
});
