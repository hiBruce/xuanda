import page from "Pagination";
mod.teacher_fdjs_assign = Vue.component('teacher_fdjs_assign', {
    template: __inline("/web/html/teacher/create_course/teacher_fdjs_assign.html"),
    data: function () {
        return {
            pageSize: 10,
            pageNo: 1,
            pageContro: '',
            jsList: [],
            jsIdArray: [],
            jsMc: '',
            sjhm : '',
            loginName : ''
        };
    },
    methods: {
        /**
         * 获取教学点教师
         * @param page
         */
        getDwJsList: function (page) {
            var self = this;
            if (isNull(page)) page = 1;
            self.pageNo = page;
            var param = {
                pageNo: self.pageNo,
                pageSize: self.pageSize,
                dwId: self.options.jxdInfo.id,
                name: self.jsMc,
                loginName : self.loginName,
                sjhm : self.sjhm
            };
            var success = function (result) {
                if (result.success) {
                    //判断教师是否已经是该课程教师
                    Service.get('/jxxt/api/kcjs/kcJs', {
                        kcId: self.options.kc.kcId,
                        jszt: 1,
                        jxdId: self.options.jxdInfo.id
                    }, function (result2) {
                        if (result2.success) {
                            var jsList = result2.data;
                            var userList = result.data;
                            for (j = 0; j < userList.length; j++) {
                                userList[j].isKcJs = false;
                                for (i = 0; i < jsList.length; i++) {
                                    if (jsList[i].id == userList[j].id) {
                                        userList[j].isKcJs = true;
                                        break;
                                    }
                                }
                            }
                            self.jsList = userList;
                            Vue.nextTick(function () {
                                window.setfootDet();
                            });
                            if (page == 1) {
                                var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                                self.pageContro.upDate({
                                    pageTotal: pageTotal
                                });
                            }
                        }
                    });

                }
            };
            Service.get('/centro/api/user/loadTeachers', param, success);
        },

        /**
         * 添加辅导教师
         * @param js
         */
        tjFdJs: function (js) {
            var self = this;
            self.$modal.confirm('将教师' + js.name + '设置为课程' + self.options.kc.kcMc + '的辅导教师？', function () {
                var data = {
                    kcId: self.options.kc.kcId,
                    jsIdStr: js.id,
                    jxdId: self.options.jxdInfo.id,
                    jszt: 1
                };
                var success = function (result) {
                    if (result.success) {
                        for (i = 0; i < self.jsList.length; i++) {
                            if (js.id == self.jsList[i].id) {
                                self.jsList[i].isKcJs = true;
                                break;
                            }
                        }
                        self.$modal.tip("success", '设置成功！');
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.get('/jxxt/api/kcjs/fpJs', data, success);
            }, null);
        },
        /**
         * 删除辅导教师
         * @param js
         */
        scFdJs: function (js) {
            var self = this;
            self.$modal.confirm('取消教师' + js.name + '在课程' + self.options.kc.kcMc + '中辅导教师的身份？', function () {
                var data = {
                    kcId: self.options.kc.kcId,
                    jsId: js.id,
                    jxdId: self.options.jxdInfo.id,
                    jszt: 1
                };
                var success = function (result) {
                    if (result.success) {
                        for (i = 0; i < self.jsList.length; i++) {
                            if (js.id == self.jsList[i].id) {
                                self.jsList[i].isKcJs = false;
                                break;
                            }
                        }
                        self.$modal.tip("success", '移除成功！');
                    } else {
                        self.$modal.tip("error", '移除失败，请重试！');
                    }
                };
                Service.get('/jxxt/api/kcjs/scKcJs', data, success);
            }, null);
        },
        closeModal: function () {
            this.$modal.hide(this);
        },
        /**
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            self.pageContro = new Pagination({
                container: $('.hwmanagement_page_1'),//必填
                pageTotal: 0,//必填，此处默认为0
                callback: function (page) {//点击分页后的回调函数
                    self.getDwJsList(page);
                }
            });
        }
    },
    created: function () {
    },
    mounted: function () {
        this.pagination();
        this.getDwJsList();
    },
    props: ['options']
});
