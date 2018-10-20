import page from "Pagination";
mod.list_student = Vue.component('list_student', {
    template: __inline("/web/html/admin/account_manager/list_student/list_student.html"),
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
        importStudents: function () {
            //弹出导入框
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/glzx/rygl/import_xs.js?v'),
                callback: this.loadStudents,
                width: 700,
                title: '导入学生'
            })
        },
        /**
         * 查看学员课程
         * @param xs
         */
        showCourses: function (xs) {
            var self = this;
            this.$modal.show(this, {
                templateURL:  mod.student_courses,
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
                templateURL: mod.student_course_assign,
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
                templateURL: mod.student_courses_package_assign,
                title: "为学员【 " + (xs.name ? xs.name : '') + " 】分配课程包",
                width: 600,
                xs: xs,
            });
        },

        /**
         * 查询学生列表
         * @param page
         */
        loadStudents: function (page) {
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

        //回车搜索
        keyEnter: function (event) {
            var self = this;
            if (event.keyCode == 13) {
                self.loadStudents();
            }
            if (event.keyCode == 8) {//删除按钮
                if ($('#searchName').val().length == 1) {
                    $('#searchName').val('');
                    self.loadStudents();
                }
            }
        },

        /**
         * 显示学生详细信息
         * @param user
         */
        detail: function (user) {
            if (user.name) {
                this.$modal.show(this, {
                    templateURL:  mod.student_detail,
                    title: '学生【 ' + (user.name ? user.name : '') + ' 】详细信息',
                    width: 600,
                    userInfo: user
                });
            } else {
                this.$modal.warn("这条数据不完整")
            }

        },

        /**
         * 添加学生
         */
        add: function () {
            var self = this;
            self.$modal.show(self, {
                templateURL: mod.student_edit,
                title: "添加学生",
                width: 600,
                method: self.loadStudents,
                jxdInfo: self.jxdInfo
            });
        },

        /**
         * 编辑教师信息
         */
        edit: function (user) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.js_edit,
                title: "学生【 " + (user.name ? user.name : '') + " 】 详细信息",
                width: 500,
                userInfo: user,
                method: function (chapter) {
                    self.loadStudents(self.pageNo);
                }
            });
        },

        /**
         * 删除学生
         * @param user
         */
        remove: function (user) {
            var self = this;
            self.$modal.confirm("删除学生[ " + (user.name ? user.name : '') + " ]？", function () {
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
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            self.pageContro = new Pagination({
                container: $('.hwmanagement_page'),//必填
                pageTotal: 0,//必填，此处默认为0
                callback: function (page) {//点击分页后的回调函数
                    self.loadStudents(page);
                }
            });
        }
    },
    created: function () {
        window.loading()
        this.loadStudents();
    },
    mounted: function () {
        this.pagination();
    },
});
