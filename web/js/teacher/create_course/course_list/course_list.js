import page from "Pagination";
mod.course_list = Vue.component('course_list', {
    template: __inline("/web/html/teacher/create_course/course_list.html"),
    data: function () {
        return {
            pageSize: 10,
            pageNo: 1,
            pageContro: '',
            kcList: [],
            dwId: '',
            showTab: false,
        };
    },
    methods: {
        /*
            * 切换tab
            * */
        changeTab: function (num) {
            this.showTab = !!num;
            this.getCourseList(1);
        },
        /*
         * 添加根目录按钮的显示弹框
         * 参数：不带modal_的页面名称
         * */
        showModal: function () {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.course_create,//必填
                title: '创建课程',//必填
                width: 600,
                getCourseList: self.getCourseList,
            });
        },
        getCourseList: function (page) {
            var self = this;
            self.pageNo = page ? page : self.pageNo;
            var param = {
                pageNo: self.pageNo,
                pageSize: 15,
                kcMc: $('#searchName').val(),
                loading: true,
                isPackage: self.showTab ? 1 : 0,
            };
            var success = function (result) {
                if (result.success) {
                    self.kcList = result.data;

                    if((self.kcList.length<=0 && self.pageNo>1)){
                        self.pageNo--;
                        self.getCourseList();
                    }else{
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        self.pageContro.upDate({
                            pageTotal: pageTotal,
                            nowPage:self.pageNo
                        });
                    }
                }
                ;
                setTimeout(function () {
                    window.setfootDet();
                }, 60);
            };
            Service.get('/jxxt/api/admin/dwkc/list', param, success);
        },
        //回车搜索
        keyEnter: function (event) {
            var self = this;
            //console.log(event.keyCode)
            if (event.keyCode == 13) {
                self.getCourseList(1);
            }
            if (event.keyCode == 8) {
                if ($('#searchName').val().length == 1) {
                    $('#searchName').val('');
                    self.getCourseList(1);
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
                    self.getCourseList(page);
                }
            });
        },

        ckgljs: function (kc) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.teacher_zrjs_list,
                title: "查看课程【" + kc.kcMc + "】的责任教师",
                width: 1000,
                kc: kc
            });
        },
        szgljs: function (kc) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.teacher_zrjs_assign,
                title: "设置课程【" + kc.kcMc + "】责任教师",
                width: 1000,
                kc: kc
            });
        },
        ckfdjs: function (kc) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.teacher_fdjs_list,
                title: "查看课程【" + kc.kcMc + "】的辅导教师",
                width: 1000,
                kc: kc
            });
        },
        szfdjs: function (kc) {
            if (kc.publishStatus) {
                var self = this;
                this.$modal.show(this, {
                    templateURL: mod.teacher_fdjs_assign,
                    title: "设置课程【" + kc.kcMc + "】辅导教师",
                    width: 1000,
                    kc: kc
                });
            } else {
                this.$modal.warn("课程未发布，暂不能设置辅导老师!")
            }
        },
        ckzj: function (kc) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.teacher_zj_list,
                title: "查看课程【" + kc.kcMc + "】的助教",
                width: 1000,
                kc: kc
            });
        },
        szzj: function (kc) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.teacher_zj_assign,
                title: "设置课程【" + kc.kcMc + "】助教",
                width: 1000,
                kc: kc
            });
        },
        editCourse: function (course) {
            var self = this;
            location.href = '/ucenter/courseList/detail?kcid='+course.kcId ;
            // this.$modal.show(this, {
            //     templateURL: __uri('/web/v/ucenter/glzx/modal/edit_course_baseinfo.js'),
            //     title: "编辑课程【" + course.kcMc + '】',
            //     course: course,
            //     cb: self.getCourseList
            // });
        },

        isDelete: function (course, type) {
            var self = this;
            this.$modal.confirm('确定要删除吗？删除后，所有学员学习记录都将会被删除，无法恢复！',
                function (result) {
                    self.checkPassword(course, type);
                });
        },
        checkPassword: function (course, type) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.set_password,
                title: "输入密码",
                width: 400,
                course: course,
                cb: type == 0 ? self.deleteCourse : self.deleteKcb,
            });
        },
        deleteCourse: function (course) {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.$modal.success("删除成功！");
                    self.getCourseList(self.pageNo);
                }else{
                    self.$modal.error(result.message)
                }
            };
            Service.get('/jxxt/api/admin/course/' + course.kcId + '/delete', {
                dwId: this.jxdInfo.id,
                loading: true,
            }, success);
        },
        copyCourse: function (kc) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.course_start,
                title: "开课",
                width: 1000,
                kc: kc,
                jxdInfo: self.jxdInfo,
                cb: self.getCourseList,
            });
        },
        //复制课程
        fuzhi : function (kc) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.course_copy,
                title: "复制课程",
                width: 1000,
                kc: kc,
                jxdInfo: self.jxdInfo,
                cb: self.getCourseList,
            });
        },
    },
    created: function () {
    },
    mounted: function () {
        this.getCourseList();
        this.pagination();
    },
});
