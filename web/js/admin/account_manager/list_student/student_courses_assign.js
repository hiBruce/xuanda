/**
 * 教师列表
 * @author 胡晓光
 */

mod.student_course_assign = Vue.component('student_course_assign', {
    template: __inline("/web/html/admin/account_manager/list_student/student_courses_assign.html"),
    data: function () {
        return {
            pageSize: 10,
            pageNo: 1,
            pageContro: '',
            dwkcList: [],
            kcMc: ''
        };
    },
    methods: {
        /**
         * 获取教学点教师
         * @param page
         */
        getDwKcList: function (page) {
            var self = this;
            self.pageNo = page ? page : self.pageNo;
            var param = {
                pageNo: self.pageNo,
                pageSize: self.pageSize,
                kcMc: self.kcMc,
                dwId: self.options.jxdInfo.id,
                xyId: self.options.xs.id,
                publishStatus: 1,
                isNeedKk: 0,
                isPackage: 0,
            };
            var success = function (result) {
                if (result.success) {
                    console.log(result);
                    self.dwkcList = result.data;
                    if (self.pageNo == 1) {
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        self.pageContro.upDate({
                            pageTotal: pageTotal
                        });
                    }
                }
            };
            Service.get('/jxxt/api/admin/dwkc/list', param, success);
        },

        /**
         * 分配课程给学员
         * @param dwkc
         */
        fpKc: function (dwkc) {
            var self = this;
            self.$modal.confirm('分配课程' + dwkc.kcMc + '给学员' + self.options.xs.name + '？', function () {
                var data = {
                    xyId: self.options.xs.id,
                    kcId: dwkc.kcId,
                    dwId: self.options.jxdInfo.id,
                };
                var success = function (result) {
                    if (result.success) {
                        for (i = 0; i < self.dwkcList.length; i++) {
                            if (dwkc.id == self.dwkcList[i].id) {
                                self.dwkcList[i].xyKc = true;
                                break;
                            }
                        }
                        self.$modal.tip("success", '分课成功！');
                    } else {
                        self.$modal.tip("error", '分课失败，请重试！');
                    }
                };
                console.log(data);
                Service.get('/jxxt/api/fk/xyfk', data, success);
            }, null);
        },
        /**
         * 移除学员课程
         * @param dwkc
         */
        scKc: function (dwkc) {
            var self = this;
            var data = {
                xyId: self.options.xs.id,
                kcId: dwkc.kcId
            };
            var success = function (result) {
                if (result.success) {
                    for (i = 0; i < self.dwkcList.length; i++) {
                        if (dwkc.id == self.dwkcList[i].id) {
                            self.dwkcList[i].xyKc = false;
                            break;
                        }
                    }
                    self.$modal.success('移除成功！');
                } else {
                    self.$modal.error(result.message);
                }
            };
            Service.get('/jxxt/api/fk/scxykc', data, success);
        },
        isDelete: function (dwkc) {
            var self = this;
            this.$modal.confirm('确定要移除学员课程吗？移除学员课程将会同时删除学员的相关学习记录！',
                function (result) {
                    self.checkPassword(dwkc);
                });
        },
        checkPassword: function (dwkc) {
            var self = this;
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/glzx/modal/check_password.js'),
                title: "输入密码",
                width: 400,
                course: dwkc,
                cb: self.scKc,
            });
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
                    self.getDwKcList(page);
                }
            });
        }
    },
    mounted: function () {
        this.pagination();
        this.getDwKcList();
    },
    props: ['options']
});