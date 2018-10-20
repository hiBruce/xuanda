import page from "Pagination";
mod.list_admin = Vue.component('list_admin', {
    template: __inline("/web/html/admin/account_manager/list_admin/list_admin.html"),
    data: function () {
        return {
            keyword: '',
            pageSize: 10,
            pageNo: 1,
            pageContro: '',
            xsList: []
        };
    },
    methods: {
        //弹出导入教师的框
        importXs: function () {
            //弹出导入框
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/glzx/rygl/import_xs.js?v'),
                callback: this.getDwXyList,
                width: 700,
                title: '导入学生'
            })
        },
        /**
         * 查看学员课程
         * @param xs
         */
        ckkc: function (xs) {
            var self = this;
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/glzx/modal/ckxykc.js'),
                title: "查看学员【 " + (xs.name ? xs.name : '') + " 】的课程",
                width: 600,
                xs: xs,
            });
        },
        /**
         * 分配学员课程
         * @param xs
         */
        fpkc: function (xs) {
            var self = this;
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/glzx/modal/fpxykc.js'),
                title: "为学员【 " + (xs.name ? xs.name : '') + " 】分配课程",
                width: 600,
                xs: xs,
            });
        },
        /**
         * 分配学员课程包
         * @param xs
         */
        fpkcb: function (xs) {
            var self = this;
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/glzx/modal/fpxykcb.js'),
                title: "为学员【 " + (xs.name ? xs.name : '') + " 】分配课程包",
                width: 600,
                xs: xs,
            });
        },
        getDwXyList: function (page) {
            var self = this;
            if (isNull(page)) page = 1;
            self.pageNo = page;
            var param = {
                pageNo: self.pageNo,
                pageSize: self.pageSize,
                name: $('#searchName').val(),
                loginName: $('#searchLoginName').val(),
                sjhm: $('#searchPhone').val(),
                loading: true
            };
            var success = function (result) {
                if (result.success) {
                    self.xsList = result.data;
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
            Service.get('/centro/api/user/loadStudents', param, success);
        },

        /**
         * 取消学生身份
         * @param user
         */
        cancleXs: function (user) {
            var self = this;
            self.$modal.confirm("移除学生【 " + (user.name ? user.name : '') + " 】？", function () {
                var params = {
                    dwId: self.jxdInfo.id,
                    id: user.id
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.tip("success", '学生删除成功！');
                        self.getDwXyList(self.pageNo);
                        // self.jsList.forEach(function (value, index) {
                        //     if (value.id == user.id) {
                        //         self.jsList.splice(index, 1);
                        //     }
                        // });
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.get("/centro/api/dw/deleteDwXs", params, success);
            });
        },
        /**
         * 添加学生
         */
        addStudent: function () {
            var self = this;
            self.$modal.show(self, {
                templateURL: __uri('/web/v/ucenter/glzx/modal/add_new_student.js'),
                title: "新增教学点学生",
                width: 600,
                method: self.getDwXyList,
                jxdInfo: self.jxdInfo
            });
        },
        /**
         * 从用户中心选择学生
         */
        selectUser: function () {
            var self = this;
            self.$modal.show(self, {
                templateURL: __uri('/web/v/ucenter/glzx/modal/select_user_xs.js'),
                title: "设置用户为教学点学生",
                cancelcb: self.getDwXyList,
                width: 1000,
                method: self.getDwXyList,
                jxdInfo: self.jxdInfo
            });
        },
        showDetail: function (user) {
            if (user.name) {
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/glzx/modal/ry_detail.js'),
                    title: '学生【 ' + (user.name ? user.name : '') + ' 】详细信息',
                    width: 400,
                    userInfo: user
                });
            } else {
                this.$modal.warn("这条数据不完整")
            }

        },
        //回车搜索
        keyEnter: function (event) {
            var self = this;
            if (event.keyCode == 13) {
                self.getDwXyList();
            }
            if (event.keyCode == 8) {//删除按钮
                if ($('#searchName').val().length == 1) {
                    $('#searchName').val('');
                    self.getDwXyList();
                }
            }
        },
        /**
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            self.pageContro = new Pagination({
                container: $('.hwmanagement_page'),//必填
                pageTotal: 0,//必填，此处默认为0
                callback: function (page) {//点击分页后的回调函数
                    self.getDwXyList(page);
                }
            });
        }
    },
    created: function () {
        window.loading()
        this.getDwXyList();
    },
    mounted: function () {
        this.pagination();
    },
});
