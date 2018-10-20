/**
 * 我的课程
 */
define(["Pagination", 'fcup'], function () {
    var classManage = new Vue({
        el: ".page",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                danxRow: [],
                duoxRow: [],
                pandRow: [],
                zhugRow: [],
                wxtkRow: [],
                ydljRow: [],
                cj: {},
                sj: {},
                flag: false,
                sjname: '',
                examId: ''
            };
        },
        methods: {
            tmList: function () {
                var self = this;
                self.examId = self.getParameter("cjid");
                var data = {
                    pageNo: -1,
                    cjid: self.examId
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.danxRow = result.data.danxList;
                        self.duoxRow = result.data.duoxList;
                        self.pandRow = result.data.pandList;
                        self.zhugRow = result.data.zhugList;
                        self.wxtkRow = result.data.wxtkList;
                        self.ydljRow = result.data.ydljList;
                        self.cj = result.data.cj;
                    }
                    setTimeout(setfootDet, 10);
                };
                Service.postBody('/tkksxt/api/admin/sjtm/list', data, success);
            },
            getSj: function () {
                var self = this;
                var data = {
                    id: $("#sjid").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.sj = result.data;
                    }
                    setTimeout(setfootDet, 10);
                };
                Service.get('/tkksxt/api/admin/sj/get', data, success);
            },
            checkScore: function (e, tm) {
                var self = this;
                var target = e.target || e.srcElement;
                var score = $(target).val();
                if (parseFloat(score) > parseFloat(tm.tmfz)) {
                    self.$modal.error('设置分值不能超过题目分值');
                    $(target).val("");
                    self.flag = true;
                } else if (parseFloat(score) < parseFloat(0)) {
                    self.$modal.error('设置分值不能小于0');
                    $(target).val("");
                    self.flag = true;
                } else {
                    self.flag = false;
                }
            },
            checkBeforeSubmit: function () {
                let ok = true;
                for (var n of document.querySelectorAll(".fs_input")) {
                    if (Number.isNaN(Number.parseFloat(n.value))) {
                        ok = false;
                        break;
                    }
                }
                return ok;
            },
            submitForm: function () {
                var self = this;
                // var formData = '';
                // $('#zfForm').find('input').each(function(i,ele){
                //     formData+=( $(ele).attr('name')+'='+encodeURIComponent($(ele).val())+'&')
                // });
                // $('#zfForm').find('textarea').each(function(i,ele){
                //     formData+=( $(ele).attr('name')+'='+$(ele).val()+'&')
                // });

                var formData = decodeURI($('#zfForm').serialize());
                formData = decodeURIComponent(formData.replace(/\+/g, "  "));

                var data = {
                    formData: formData,
                    cjid: self.examId
                };
                if (self.flag) {
                    return;
                }
                if (!this.checkBeforeSubmit()) {
                    this.$modal.warn("请批阅完试卷后提交");
                    return;
                }
                ;
                var success = function (result) {
                    console.log(result);
                    if (result.resultCode == "0") {
                        self.$modal.success("保存成功", function () {
                            window.location.href = "/admin#/jxzz/jxgl/ksgl";
                        }, 1);
                    }
                };
                self.$modal.confirm("确认保存批改", function () {
                    Service.post('/tkksxt/api/admin/cj/submitDp', data, success);
                });
            },
            /**
             * 从URL获取参数
             * @param param
             * @returns {*}
             */
            getParameter: function (key) {
                var url = location.href;
                var ind = url.indexOf("?");
                if (ind != -1) {
                    var strs = url.substr(ind + 1);
                    var params = url.indexOf("&") == -1 ? [strs] : strs.split("&");
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i].split("=");
                        if (key == param[0]) {
                            return param[1];
                        }
                    }
                    return '';
                }
            }
        },
        created: function () {
            this.tmList();
            this.getSj();
        },
        mounted: function () {

        }

    });
    return classManage;
});