/**
 * 教师列表
 * @author 胡晓光
 */

import page from "Pagination";

mod.list_teacher = Vue.component('list_teacher', {
    template: __inline("/web/html/admin/account_manager/list_teacher/list_teacher.html"),
    data: function () {
        return {
            keyword: '',
            pageSize: 10,
            pageNo: 1,
            pageContro: "",
            jsList: [],
        };
    },
    methods: {
        //弹出导入教师的框
        importTeachers: function () {
            //弹出导入框
            this.$modal.show(this, {
                templateURL: mod.js_import,
                callback: this.getDwJsList,
                width: 700,
                title: '导入教师'
            })
        },

        /**
         * 获取教学点教师
         * @param page
         */
        getTeachers: function (page) {
            var self = this;
            if (isNull(page)) page = 1;
            self.pageNo = page;
            var param = {
                pageNo: self.pageNo,
                pageSize: self.pageSize,
                name: $("#searchName").val(),
                loginName: $('#searchLoginName').val(),
                sjhm: $('#searchPhone').val(),
                loading: true
            };
            var success = function (result) {
                if (result.success) {
                    self.jsList = result.data;
                    Vue.nextTick(function () {
                        window.setfootDet();
                    });
                    if (page == 1) {
                        self.pageContro.upDate({
                            pageTotal: result.pageCount
                        });
                    }
                }
            };
            Service.get("/centro/api/user/loadTeachers", param, success);
        },

        /**
         * 取消教师身份
         * @param user
         */
        remove: function (user) {
            var self = this;
            self.$modal.confirm("删除教师[ " + (user.name ? user.name : '') + " ]？", function () {
                var params = {
                    dwId: user.id,
                    userId: user.id,
                    realDelete: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.tip("success", "教师删除成功！");
                        self.getTeachers(self.pageNo);
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.get("/centro/api/user/deleteAccount", params, success);
            });
        },

        /**
         * 教师详情
         * @param row
         */
        detail: function (user) {
            if (user.name) {
                this.$modal.show(this, {
                    templateURL: mod.js_detail,
                    title: "教师【 " + (user.name ? user.name : '') + " 】 详细信息",
                    width: 500,
                    userInfo: user
                });
            } else {
                this.$modal.warn("这条数据不完整")
            }
        },

        /**
         * 编辑教师信息
         */
        edit: function (user) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.js_edit,
                title: "教师【 " + (user.name ? user.name : '') + " 】 详细信息",
                width: 500,
                userInfo: user,
                method: function (chapter) {
                    self.getTeachers(self.pageNo);
                }
            });
        },

        /**
         * 编辑教师信息
         */
        add: function () {
            var self = this;
            var user = {
                name: '',
                gender: '',
                certificate: '',
                phone: ''
            };
            this.$modal.show(this, {
                templateURL: mod.js_edit,
                title: "添加教师",
                width: 500,
                userInfo: user,
                method: function (chapter) {
                    self.getTeachers(self.pageNo);
                }
            });
        },

        /**
         * 从用户中心选择教师
         */
        selectUser: function () {
            var self = this;
            self.$modal.show(self, {
                templateURL: __uri("/web/v/ucenter/glzx/modal/select_user_js.js"),
                title: "设置用户为教学点教师",
                cancelcb: self.getDwJsList,
                width: 1000,
                method: self.getDwJsList,
                jxdInfo: self.jxdInfo
            });
        },
        /**
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            self.pageContro = new Pagination({
                container: $(".hwmanagement_page"),//必填
                pageTotal: 0,//必填，此处默认为0
                callback: function (page) {//点击分页后的回调函数
                    self.getDwJsList(page);
                }
            });
        }
    },
    created: function () {
        window.loading()
        var self = this;
        self.getTeachers();
    },
    mounted: function () {
        this.pagination();
    },
});