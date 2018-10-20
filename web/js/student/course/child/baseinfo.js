/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var baseinfo = Vue.component('baseinfo', {
        template: __inline("/web/html/student/course/child/baseinfo.html"),
        data: function () {
            return {
                courseId: $("#courseId").val(),
                rows_courseCategory: [],
                course: {},
                temp_data: {},
                temp_sel_arr: [],//暂存选中数据的数组
                temp_sel_ind: 0,
                showCredits: 0
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
            },
            /**
             * 获取课程分类信息
             */
            getCourseClassifyList: function () {
                var self = this;
                var data = {
                    pageNo: self.pageNo
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.rows_courseCategory = result.data;
                        if (!self.course.classifyId)
                            self.course.classifyId = self.rows_courseCategory[0].id;
                        self.computeData();
                    }
                };
                Service.get('/jxxt/api/admin/courseCategory/getAllCategory', data, success);
            },
            computeData: function () {
                var self = this;
                self['temp_data'] = getEleFun(this.rows_courseCategory, self.course.classifyId)

                function getEleFun(paramsArr, comPareId) {
                    if (comPareId) {
                        var getEle = [];
                        var canReturn = false;
                        getEle = paramsArr.filter(function (ele, i) {
                            return ele.id == comPareId;
                        });
                        ;
                        if (getEle && getEle.length <= 0) {
                            for (var i = 0, j = paramsArr.length; i < j; i++) {
                                if (paramsArr[i]) {
                                    getEle = getEleFun(paramsArr[i].subCateogries, comPareId);
                                    if (getEle && getEle.length > 0) {
                                        return getEle;
                                    }
                                }
                            }
                        }
                        return getEle;
                    } else {
                        return []
                    }
                    ;
                }

                self['temp_data'] = self['temp_data'][0];
                if (self['temp_data']) {
                    self['temp_data']['ind'] = 0;
                    self.temp_sel_arr.push(self['temp_data']);
                    getDefaultData(self['temp_data'])

                    function getDefaultData(data) {
                        if (data.parentId) {
                            var parent = getEleFun(self.rows_courseCategory, data.parentId);
                            if (parent.length > 0) {
                                self.temp_sel_arr.unshift(parent[0]);
                                getDefaultData(parent[0])
                            }
                        }
                        ;
                    }

                    this.temp_sel_ind = self.temp_sel_arr.length;
                    self.temp_sel_arr.forEach(function (ele, i) {
                        ele.ind = i;
                    })
                    console.log(self.temp_sel_arr)
                }


            },
            setInd: function (ind) {
                this.temp_sel_ind = ind;
                // var  e = e || window.event;
                // var target  = e.target || e.srcElement;
                // this.temp_data = $(target).val();
            },
            addTeacher: function () {
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_teacher.js'),
                    width: 600,
                    course: this.course,
                    title: '添加教师',
                    cb: this.getCourse
                });
            },
            editTeacher: function (ind) {
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_teacher.js'),
                    width: 600,
                    course: this.course,
                    title: '添加教师',
                    teacherInfo: this.course['kcZjjsList'][ind],
                    cb: this.getCourse
                })
            },
            /*
            *删除教师
            */
            deleteTeacher: function (id) {
                var self = this;
                this.$modal.confirm("确定要删除吗？", del)

                function del() {
                    Service.get("/jxxt/api/admin/kcZjjs/delete", {id: id}, function (res) {
                        if (res.resultCode == 0) {
                            self.$modal.success("删除成功");
                            self.getCourse()
                        } else {
                            self.$modal.error("删除失败")
                        }
                    })
                }
            },
            /**
             * 加载我管理的课程
             */
            getCourse: function () {
                var self = this;
                if (!isNull(this.courseId) && !this.courseId.isEmpty()) {
                    var success = function (result) {
                        if (!self.course.id) {
                            Vue.nextTick(self.uploadVideo)
                        }
                        if (result.resultCode == 0) {
                            self.course = result.data;
                            self.$root.course = result.data;
                            if (!self.course.sourceType)
                                self.course.sourceType = 0;
                            if (!self.course.sfsk)
                                self.course.sfsk = 0;
                            if (!self.course.type)
                                self.course.type = 1;
                            if (!self.course.studyStyle)
                                self.course.studyStyle = 0;
                        }
                    };
                    Service.get('/jxxt/api/admin/course/manageCourse/' + this.courseId, null, success);
                } else {
                    self.initPage();
                }
            },
            /*
            *提交课程信息
            */
            saveCourse: function () {
                var self = this;
                if (this.course.type == 2 && this.course.sfsk == 0 && !this.course.sksj) {
                    self.$modal.error("设置课程为收费课程并且可以试看，请输入试看时间！");
                } else if (this.course.sourceUrl == 1 && !this.course.sourceUrl) {
                    self.$modal.error("请输入第三方链接地址");
                } else if (self.course.kcZjjsList.length <= 0) {
                    self.$modal.error("请填写教师介绍");
                } else {
                    var dataArr = ['name', 'credits', 'classifyId', 'sourceType', 'type', 'studyStyle', 'profile', 'imgUrl'];
                    if (this.validator(dataArr)) {
                        var success = function (result) {
                            self.$modal.success("操作成功!");
                            self.getCourse()
                        };
                        Service.postBody('/jxxt/api/admin/course/update', this.course, success);
                    }
                }
            },
            /*
            * 校验课程完整性
            */
            validator: function (dataArr) {
                var self = this;
                for (var i = 0, j = dataArr.length; i < j; i++) {
                    if (!self.course[dataArr[i]] && self.course[dataArr[i]] !== 0) {
                        self.$modal.error("请填写完整信息");
                        return false;
                    }
                }
                ;
                return true;
            },
            /**
             * 更新课程信息
             */
            submitCourseInfo: function () {
                var self = this;
                var success = function (result) {
                    self.$modal.success("操作成功!");
                    self.getCourse()
                };

                Service.postBody('/jxxt/api/admin/course/update', this.course, success);
            },
            /**
             * 加载封面图片修改弹框
             */
            upload: function () {
                if (this.course.publishStatus == 0) {
                    this.$modal.show(this, {
                        templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/modal_upload.js'),
                        course: this.course,
                        cb: this.saveImg,
                        title: "添加封面"
                    });
                }
            },
            /* 保存封面图片
           *
           * @param url
           */
            saveImg: function (url) {
                this.course.imgUrl = url;
                this.submitCourseInfo();
            },
            uploadVideo: function () {
                var self = this;
                $.fcup({
                    updom: '#change_video',//这个是页面里定义好的一个元素
                    upurl: '/upfile',
                    upstr: self.course.coverVideoUrl ? '更换视频' : '上传视频',
                    upfinished: '更换视频',
                    maxSize: 200,
                    acceptType: 'video',
                    upcallback: function (res) {
                        if (res.resultCode == 0) {
                            self.course.coverVideoUrl = res.url;
                            self.course.coverVideoName = res.filename;
                            self.submitCourseInfo()
                        } else if (res.resultCode == '2001') {
                            self.$modal.error(res.message);
                        } else {
                            self.$modal.error('上传失败');
                        }
                    },
                    errorcb: function (message) {
                        self.$modal.error(message)
                    }
                });
            },
            delVideo: function () {
                this.course.coverVideoUrl = '';
                this.course.coverVideoName = '';
                this.submitCourseInfo()
            },
            initParams: function () {
                if (!this.course.sourceType)
                    this.course.sourceType = 0;
                if (!this.course.sfsk)
                    this.course.sfsk = 0;
                if (!this.course.type)
                    this.course.type = 1;
                if (!this.course.studyStyle)
                    this.course.studyStyle = 0;
            },
            checkCreditShow: function () {
                if (this.course.classCode) {
                    var classCodeArr = this.course.classCode.split(".");
                    if (classCodeArr[0] == "4028829c46f4bf830146f4c7db180002") {
                        this.showCredits = 1;
                    } else if (classCodeArr[0] == "4028829c46f4bf830146f4c84dfc0003") {
                        this.showCredits = 2;
                    }
                }
            }

        },
        created: function () {
            this.getCourseClassifyList();
            this.course = this.$store.getters.getCourse();
            if (this.course.id) {
            } else {
                var self = this;
                if (this.course.classCode)
                    self.checkCreditShow();
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.checkCreditShow();
                })
            }
        },
        mounted: function () {
        },
    });
    return baseinfo
});