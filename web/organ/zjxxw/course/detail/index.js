define(['vueRouter', 'vuex', 'Pagination', 'fcup'], function (vueRouter, Vuex) {
    window.eventBus = new Vue();
    Vue.use(vueRouter);
    Vue.use(Vuex);
    var routes = [
        {path: '/', redirect: '/progress'},
        {
            name: "baseinfo",
            path: '/baseinfo',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/baseinfo.js'], res);
            }
        },
        {
            name: "teacherTeam",
            path: "/teacherTeam",
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/teacherTeam.js'], res);
            }
        },
        {
            name: "teachingSet",
            path: "/teachingSet",
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/teachingSet.js'], res);
            }
        },
        {
            name: "classManage",
            path: "/classManage",
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/classManage.js'], res);
            }
        },
        {
            name: 'studentList',
            path: '/classManage/studentList',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/classManageStudentList.js'], res);
            }
        },
        {
            name: 'khbz',
            path: '/khbz',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/bjgl/khbz.js'], res);
            }
        },
        {
            name: 'progress',
            path: '/progress',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/xxjd/index.js'], res);
            }
        },
        {
            name: 'xscj',
            path: '/xscj',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/bjgl/xscj.js'], res);
            }
        },
        {
            name: 'courseData',
            path: '/courseData',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/add_source.js'], res);
            }
        },
        {
            name: 'courseMenu',
            path: '/courseMenu',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/courseMenu.js'], res);
            }
        },
        {
            name: 'homework',
            path: '/homework',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/homework/index.js'], res);
            }
        },
        {
            name: 'homework',
            path: '/homework/:id',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/homework/detail.js'], res);
            }
        },
        {
            name: 'exam',
            path: '/exam/',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/ks/index.js'], res);
            }
        },
        {
            name: 'exercise',
            path: '/exercise/',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/lx/index.js'], res);
            }
        },
        {
            name: 'quesetion',
            path: '/quesetion',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/question/index.js'], res);
            },
        },
        {
            name: 'notes',
            path: '/notes',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/notes/index.js'], res);
            },
        },
        {
            name: 'notice',
            path: '/notice',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/notice/index.js'], res);
            },
        },
        {
            name: 'kcpj',
            path: '/kcpj',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/kcpj/index.js'], res);
            },
        },
        {
            path: '/menu:index',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/newMenu/index.js'], res);
            },
        },
        {
            name: 'learnFromCourse',
            path: '/learnFromCourse',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/wdth/index.js'], res);
            },
        },
        {
            name: 'bjtl',
            path: '/bjtl',
            component: function (res, rej) {
                require([window.globalUrl+'/course/detail/child/bjgl/bjtl.js'], res);
            },
        }

    ];
    var router = new vueRouter({
        routes: routes
    });

    //前端数据状态管理
    var store = new Vuex.Store({
        state: {
            course: {},
            learningStatus: {},
            isFirst : false
        },
        //需要返回状态或者值
        getters: {
            getCourse: function (state) {
                return function (val) {
                    return state.course;
                }
            },
            getLearnStatus: function (state) {
                return function (val) {
                    return state.learningStatus;
                }
            },
            getIsFirst : function (state) {
                return function (val) {
                    return state.isFirst;
                }
            }
        },
        mutations: {
            updateCourse: function (state, data) {
                state.course = data;
            },
            updateLearnStatus: function (state, data) {
                state.learningStatus = data;
            },
            updateFirstStatus : function (state, data) {
                state.isFirst = data;
            },
        },
        actions: {
            updateCourseAction: function (context, data) {
                context.commit('updateCourse', data);
            },
            updateLearnStatusAction: function (context, data) {
                context.commit('updateLearnStatus', data);
            },
            updateIsFirstAction: function (context, data) {
                context.commit('updateFirstStatus', data);
            },
        }
    });


    var app = new Vue({
        el: "#app",
        delimiters: ['{%', '%}'],
        router: router,
        store: store,
        data: function () {
            return {
                courseId: $("#courseId").val(),
                course: {
                    imgUrl: '',
                    classifyId: '',
                },
                rows_courseCategory: [],
                chapter: {
                    type: '',
                    courseId: '',
                },
                learningStatus: {},
                rows_chapter: [],
                menuNum: 0,
                editTitle: false,//编辑课程名称的控制器
                editScore: false,//编辑课程分数
                editProfile: false,//编辑课程简介
                showlist: true,//控制新增练习列表和详情切换
                upload_img: '',
                kcxx: {},
                editCoursRequire: true,//控制编辑课程基本要求和展示的切换
                addMenuArr: [],
                nowLeft: 0,
            };
        },
        components: {},

        methods: {
            goUrl: function (e, url) {
                var eve = e || window.event;
                var target = $(eve.target);
                target.addClass("active");
                this.$router.push(url)
            },
            /**
             * 加载我管理的课程
             */
            getCourse: function () {
                var self = this;
                return new Promise(function (res, rej) {
                    if (!isNull(self.courseId) && !self.courseId.isEmpty()) {
                        var success = function (result) {
                            self.course = result.data.course;
                            self.learningStatus = result.data.learningStatus;
                            self.teachers = result.data.teachers;
                            if (result.data.name) {
                                self.editTitle = true;
                            }
                            if (result.data.credits) {
                                self.editScore = true;
                            }
                            if (result.data.profile) {
                                self.editProfile = true;
                            }
                            ;
                            self.$store.dispatch("updateCourseAction", self.course);
                            self.$store.dispatch('updateLearnStatusAction', self.learningStatus);
                            self.$store.dispatch("updateIsFirstAction", self.isFirst);

                            res(result.data)
                        };
                        Service.get('/jxxt/api/admin/course/' + self.courseId, null, success);
                    } else {
                        self.initPage();
                    }
                })
            },

            /**
             * 加载课程栏目（信息）
             */
            getKcXx: function () {
                var self = this;
                if (!isNull(this.courseId) && !this.courseId.isEmpty()) {
                    var success = function (result) {
                        self.addMenuArr = result.data;
                        Vue.nextTick(self.controlMenuSwipe)
                    };
                    var param = {
                        courseId: self.courseId,
                        sfgk: 0,
                    };
                    Service.get('/jxxt/api/admin/kcxx/list', param, success);
                }
            },
            /**
             * 提交课程信息
             */
            submitCourseInfo: function () {
                var self = this;
                var success = function (result) {
                    self.$modal.success("操作成功！");
                };
                Service.postBody('/jxxt/api/admin/course/update', this.course, success);
            },
            /*
            * 修改标题
            * */
            editTitleCon: function () {
                this.editTitle = false;
                Vue.nextTick(function () {
                    $("#name_input").focus()
                })
            },

            /*
            * 完成修改标题
            * */
            finishEditTitle: function () {
                if (this.course.name) {
                    this.editTitle = true;
                    this.submitCourseInfo();
                } else {
                    this.$modal.warn("请输入课程名称");
                }
            },
            /*
            * 修改学分
            * */
            editScoreCon: function () {
                this.editScore = false;
                Vue.nextTick(function () {
                    $("#scrot_input").focus()
                })
            },
            /*
            * 修改简介
            * */
            editCourseProfile: function () {
                this.editProfile = false;
                Vue.nextTick(function () {
                    $("#profile").focus()
                })
            },
            /*
            * 完成修改简介
            * */
            finishEditProfile: function () {
                if (this.course.profile) {
                    this.editProfile = true;
                    this.submitCourseInfo();
                } else {
                    this.$modal.warn("请输入课程简介");
                }
            },
            addnewMenu: function () {
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_menuName.js'),
                    cb: this.addmenu,
                    title: '添加栏目名称',
                    course: this.course,
                })
            },
            /*
            * 添加栏目
            * */
            addmenu: function (kcxx) {
                var self = this;
                // var obj = {
                //     control: true,
                //     xxmc: kcxx.xxmc || "未命名"
                // }
                this.addMenuArr.push(kcxx);
                setTimeout(function () {
                    self.controlMenuSwipe(function () {
                        self.menuScroll('right')
                    })
                })
            },
            /*
            * 显示编辑新增菜单
            * */
            showEditaddMenu: function (ind) {
                //control
                this.addMenuArr[ind].control = false;
                setTimeout(function () {
                    UE.getEditor('add_menu_' + ind + '_container');
                }, 0)
            },
            /**
             * 完成修改学分
             */
            finishEditScore: function () {
                if (this.course.credits) {
                    this.editScore = true;
                    this.submitCourseInfo();
                } else {
                    this.$modal.warn("请输入想要设置的学分值！");
                }
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
                    });
                }
            },
            /**
             * 保存封面图片
             *
             * @param url
             */
            saveImg: function (url) {
                this.course.imgUrl = url;
                this.submitCourseInfo();
            },
            /*
            * 显示课程基本要求
            * */
            showEditCourseRequire: function () {
                this.editCoursRequire = false;
                setTimeout(function () {
                    UE.getEditor('course_require_container');
                })
            },
            /*
            * 添加根目录按钮的显示弹框
            * 参数：不带modal_的页面名称
            * */
            showModal: function (name) {
                if (name === 'add_text') {
                    var addTextUe = UE.getEditor('addtext_container');
                    addTextUe.ready(function () {
                        addTextUe.setHeight(300);
                    });
                } else if (name === 'add_discuss') {
                    var discussUe = UE.getEditor('discuss_container');
                    discussUe.ready(function () {
                        discussUe.setHeight(300);
                    });
                } else if (name === 'upload') {
                    this.upload();
                } else if (name === 'baseinfo') {
                    this.$modal.show(this, {
                        templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/modal_baseinfo.js'),
                        title: "课程基本信息",
                        course: this.course
                    })
                }
            },
            test: function (url) {

                var form = $("<form>");//定义form表单,通过表单发送请求
                form.attr("style", "display:none");//设置为不显示
                form.attr("target", "");
                form.attr("method", "get");//设置请求类型
                form.attr("action", url);//设置请求路径
                $("body").append(form);//添加表单到页面(body)中
                form.submit();//表单提交
            },
            /*
            * 添加子目录按钮的显示弹框
            * 参数：不带modal_的页面名称
            * */
            showChildModal: function (name) {
                //参照上面根目录的方法展示弹框，传值就给这个方法加参数即可
            },
            /*
            * 关闭弹框
            * 参数：1、不带modal_的页面名称，2、all，代表关闭所有弹框
            * */
            closeModal: function (name) {
                if (name === 'all') {
                    $(".modal_wrap").hide()
                } else {
                    $("#modal_" + name).hide()
                }
            },

            /*
            * 添加练习--查看详情
            * */
            showDetail: function (practice) {
                this.showlist = false;
            },
            hideDetail: function () {
                this.showlist = true;
            },
            /*
            * 设置菜单总宽度 ,在获取菜单列表后再延时调用一次此方法
            * */
            controlMenuSwipe: function (cb) {
                var ul = $(".main-l-title");
                var allW = 50;
                var li = ul.find("li");
                [].forEach.call(li, function (ele) {
                    var wid = parseFloat(window.getComputedStyle(ele).width)
                    allW += wid;
                });
                ul.css('width', allW);
                setTimeout(cb)
            },
            /*
            * 菜单按钮滚动
            * */
            menuScroll: function (dir) {
                var wid = parseFloat($(".menu_inner_wrap").width());
                var ulWid = parseFloat($(".main-l-title").width());
                if (dir == 'left') {
                    this.nowLeft = parseFloat(this.nowLeft) - wid - 90;
                    if (this.nowLeft < 0) {
                        this.nowLeft = 0;
                    }
                    $(".menu_inner_wrap").animate({'scrollLeft': this.nowLeft})
                } else {
                    this.nowLeft = parseFloat(this.nowLeft) + wid - 90;
                    if (this.nowLeft > (ulWid - wid)) {
                        this.nowLeft = ulWid - wid;
                    }
                    $(".menu_inner_wrap").animate({'scrollLeft': this.nowLeft})
                }
            },
            getHasRoute: function (route) {
                if (this.$route.path.indexOf(route) >= 0) {
                    return true
                }
                ;
                return false;
            }
        },
        created: function () {
            if (this.courseId) {
                // this.getCourse();
                this.getKcXx();
            }
        },
        mounted: function () {
            setTimeout(setfootDet, 1000)
            // var errorMsg= location.href.split('?')[1].split("#")[0].split("=")[1]
            // if(errorMsg){
            //     this.$modal.warn(decodeURIComponent(errorMsg));
            // }
        }
    });
});
