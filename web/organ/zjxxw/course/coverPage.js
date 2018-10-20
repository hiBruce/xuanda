/**
 * 课程首页js
 */
define(['/static/lib/js/jquery.raty.min.js', 'Pagination'], function () {
    var course = new Vue({
        el: ".page",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                courseId: URL.getParameter(),
                course: {},
                learningStatus: [],
                score: 0,
                teachers: [],
                recommendCourseRows: [],
                studyStudentsRows: [],
                isCollect: false,//判断是否收藏
                menuNum: 0,
                courseChapters: [],
                notes: {},
                orderBy: 'DCjsj',
                orderByDirection: 'desc',
                addNote: 0,
                nowLeft: 0,
                loginStatus: '',
                courseComments: [],
                courseComment: {
                    courseId: URL.getParameter(),
                    score: '5',
                    content: ''
                },
                menuList: [],//新增菜单
                courseDuration: '',
            }
        },
        methods: {
            getLoginStatus: function () {
                var self = this;
                window.getLoginStatus().then(function (boo) {
                    self.loginStatus = boo;
                })
            },
            //收藏相关
            collect: function () {
                var content = {
                    title: this.course.name,
                    teacherName: this.course.teacherName,
                    studyNum: this.course.studyNum,
                    imgUrl: this.course.imgUrl
                };
                var self = this;
                Service.post('/zjxxw/api/collect/add', {
                    collectId: this.courseId,
                    scfl: 2,
                    content: JSON.stringify(content)
                }, function (res) {
                    if (res.resultCode == 0) {
                        self.isCollect = true
                    }
                })
            },
            cancelCollect: function () {
                var self = this;
                Service.post('/zjxxw/api/collect/cancel', {collectId: this.courseId}, function (res) {
                    if (res.resultCode == 0) {
                        self.isCollect = false
                    }
                })
            },
            judgeCollect: function () {
                if (loginStatus) {
                    var self = this;
                    Service.post('/zjxxw/api/collect/isCollect', {collectId: this.courseId}, function (res) {
                        if (res.resultCode == 0) {
                            self.isCollect = !!res.data;
                        }
                    })
                }
            },
            /**
             * 加载课程分类
             */
            getCourse: function () {
                var self = this;
                var success = function (result) {
                    if (result.success) {
                        self.course = result.data.course;
                        self.learningStatus = result.data.learningStatus;
                        self.teachers = result.data.teachers;
                    }
                };
                Service.get('/jxxt/api/admin/course/' + this.courseId, null, success);
            },
            /**
             * 加载课程视频总时长
             */
            countCourseDuration: function () {
                var self = this;
                var success = function (result) {
                    self.courseDuration = result.data;
                };
                Service.get('/jxxt/api/admin/chapter/countDuration/' + this.courseId, null, success);
            },
            initPage: function () {

            },

            loadScore2: function () {
                var success = function (result) {
                    this.score = result.data;
                    $('.star div').raty({
                        number: 5, //多少个星星设置
                        score: this.score, //初始值是设置
                        hints: ['差', '一般', '好', '非常好', '全五星'],
                        path: '/static/temp/grade',
                        starHalf: 'halfstar.png',
                        starOff: 'xin1.png',
                        starOn: 'xin.png',
                        width: '240px',
                        half: true,
                        readOnly: true
                    });
                }
                Service.get("/jxxt/api/course_comment/average/" + this.courseId, null, success);
            },

            loadCousePartials: function (tbName) {
                if (tbName.endsWith('_page')) {
                    Request.fillPage('/course/detail/' + this.courseId + '/' + tbName, $('#' + tbName));
                }
            },

            /**
             * 加载推荐课程
             */
            loadRecommendCourse: function () {
                var self = this;
                var data = {
                    pageNo: self.pageNo
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.recommendCourseRows = result.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/recommendList/3', data, success);
            },
            /**
             * 加载学习该课程学员
             */
            loadStudyStudents: function () {
                var self = this;
                var data = {
                    pageNo: self.pageNo
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.studyStudentsRows = result.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/' + this.courseId + '/studentsList', data, success);
            },
            goLogin: function () {
                Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
            },
            showMenu: function (num) {
                if (this.menuNum != num) {
                    this.menuNum = num;
                    if (num == 1) {
                        this.getOutline()
                    } else if (num == 2) {
                        this.getNotes()
                    } else if (num == 3) {
                        this.getComment()
                    }
                    ;
                }
            },
            //获取目录
            getOutline: function () {
                var self = this;
                Service.get('/jxxt/api/admin/course/' + this.courseId + '/outline', null, function (res) {
                    if (res.resultCode == '0') {
                        self.courseChapters = res.data;
                    }
                })
            },
            //获取笔记
            getNotes: function (pageNo, orderBy, orderByDirection) {
                var self = this;
                var params = {
                    pageNo: pageNo || 1,
                    orderBy: orderBy || this.orderBy,
                    orderByDirection: orderByDirection || this.orderByDirection
                }
                Service.get('/jxxt/api/admin/course/' + this.courseId + '/notes', params, function (res) {
                    if (res.resultCode == 0) {
                        Vue.set(self.notes, 'page', res.page);
                    }
                    ;
                    if (params.pageNo == 1) {
                        try {
                            var pageTotal = Math.ceil(res.page.rowCount / res.page.pageSize);
                            notePage.upDate({
                                pageTotal: pageTotal
                            })
                        } catch (e) {
                        }
                    }
                    Vue.set(self.notes, 'notes', res.data);
                })
            },
            //笔记内的获取详情方法
            showNoteDetail: function () {

            },
            ChangeOrder: function (order) {
                if (this.orderBy == order) {
                    this.orderByDirection = (this.orderByDirection == 'asc') ? 'desc' : 'asc'
                } else {
                    this.orderBy = order;
                    this.orderByDirection = 'desc'
                }
                this.getNotes(1, this.orderBy, this.orderByDirection)
            },
            //获取评价
            getComment: function (pageNo) {
                this.loadScore('halfstar', true)
                var self = this;
                var pageNo = pageNo || 1;
                Service.get('/jxxt/api/admin/course/' + this.courseId + '/comment', {
                    pageNo: pageNo,
                    commentScore: 0
                }, function (res) {
                    if (res.resultCode == 0) {
                        self.courseComments = res.data;
                        res.data.forEach(function (courseComment) {
                            var id = courseComment.id;
                            self.loadScore(id);
                        });
                        if (res.page && pageNo == 1) {
                            var pageTotal = Math.ceil(res.page.rowCount / res.page.pageSize);
                            commentPage.upDate({
                                pageTotal: pageTotal
                            })
                        }
                    }
                })
            },
            addNotesBtn: function () {
                //Dialog.openDialog("/course/notes/create_notes","新增笔记");
                this.addNote = 1;
            },
            closeNotes: function () {
                this.addNote = 0;
            },
            addNoteCb: function () {
                this.addNote = 0;
                this.getNotes()
            },
            submitContent: function () {
                if (loginStatus) {
                    var self = this;
                    if (this.courseComment.content) {
                        if (window.getSensitiveWords(this.courseComment.content)) {
                            var success = function (result) {
                                if (result.resultCode != 0) {
                                    self.$modal.error(result.message);
                                } else {
                                    self.getComment();
                                    self.courseComment.content = '';
                                }
                            };
                            Service.postBody("/jxxt/api/course_comment/add", this.courseComment, success);
                        } else {
                            self.$modal.error("请不要填写敏感词汇")
                        }
                    } else {
                        self.$modal.confirm('请填写评论信息', null, 1)
                    }
                } else {
                    Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
                }
            },
            loadScore: function (id, readonly) {
                var self = this;
                var readonly = readonly ? false : true;
                var success = function (result) {
                    var score = result.data;
                    $('#' + id).raty({
                        number: 5, //多少个星星设置
                        score: score, //初始值是设置
                        hints: ['差', '一般', '好', '非常好', '全五星'],
                        path: '/static/temp/grade',
                        starHalf: 'halfstar.png',
                        starOff: 'xin1.png',
                        starOn: 'xin.png',
                        width: '240px',
                        half: true,
                        readOnly: readonly,
                        click: function (score, evt) {
                            self.courseComment.score = score;
                        }
                    });
                }
                Service.get("/jxxt/api/course_comment/score/" + id, null, success);
            },
            getMenuList: function () {
                var self = this;

                function success(result) {
                    if (result.resultCode == 0) {
                        self.menuList = result.data;
                        setTimeout(function () {
                            self.controlMenuSwipe()
                        }, 0)
                    }
                }

                Service.get("/jxxt//api/admin/kcxx/list", {sfgk: 0, courseId: this.courseId}, success);
            },
            /*
           * 菜单按钮滚动
           * */
            menuScroll: function (dir) {
                var wid = parseFloat($(".menu_inner_wrap").width());
                var ulWid = parseFloat($(".main-l-title").width());
                if (!dir) {
                    dir = 'left';
                }
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
            /*
           * 设置菜单总宽度 ,在获取菜单列表后再延时调用一次此方法
           * */
            controlMenuSwipe: function (cb) {
                var ul = $(".main-l-title");
                var allW = 70;
                var li = ul.find("li");
                var i = 0;
                [].forEach.call(li, function (ele) {
                    i++;
                    var wid = parseFloat(window.getComputedStyle(ele).width)
                    allW += wid;
                });
                console.log(i)
                ul.css('width', allW);
                setTimeout(cb)
            },
            checkRight: function (courseId, chapterId, type) {
                var self = this;
                var data = {
                    courseId: courseId,
                    chapterId: chapterId
                }

                function success(result) {
                    if (result.resultCode == 0) {
                        if (type == 2 || type == 5) {
                            //视频
                            //跳转到视频播放页面
                            window.location.href = '/ucenter/course/learning/' + courseId + '?chapterId=' + chapterId;
                        }
                        if (type == 3) {
                            //作业
                            //跳转到作业页面
                            /*if(result.data.jzzt>0){
                                self.$modal.warn("该作业已过期！截止时间"+result.data.jzsj)
                                return
                            }*/
                            window.location.href = '/ucenter/course/learning/' + courseId + '?chapterId=' + chapterId;
                        }
                        if (type == 4) {
                            //考试
                            if (result.data.kszt == 'wccj') {
                                self.$modal.warn("测试还未出成绩，请等待！");
                            } else if (result.data.kszt == 'yccj') {
                                //已经考完出成绩了，跳转到成绩详情页
                                window.location.href = "/ucenter/view_exam?cjid=" + result.data.cjid + "&sjid=" + result.data.sjid + "&courseId=" + result.data.courseId + "&chapterId=" + result.data.chapterId;
                            }/*else if(result.data.kszt=='wks'){
                                self.$modal.warn("当前测试还未开始！开始日期："+date(result.data.kssj));
                            }else if(result.data.kszt=='yjs'){
                                self.$modal.warn("当前测试已截止！截止日期："+date(result.data.jssj));
                            }*/ else {
                                window.location.href = '/ucenter/course/learning/' + courseId + '?chapterId=' + chapterId;
                            }
                        }

                        if (type == 6) {
                            //练习
                            if (result.data.lxzt == 'no') {
                                self.$modal.warn("练习次数已满！");
                            } else {
                                window.location.href = '/ucenter/course/learning/' + courseId + '?chapterId=' + chapterId;
                            }
                        }
                    } else if (result.resultCode == 2) {
                        //没有权限
                        self.$modal.warn("缺少权限！");
                    }
                }

                Service.get("/jxxt/api/student/checkKcZj", data, success);
            },
            joinCourse: function (url) {
                if (this.course.isNeedPwd) {
                    this.$modal.show(this, {
                        templateURL:window.globalUrl+'/course/modal/modal_password.js',//必填
                        surecb: function () {
                            location.href = url;
                        },//点击关闭时的回调，如没有则不填
                        title: "课程密码",//必填
                        course: this.course,
                        width: 600
                    })
                } else {
                    this.$modal.loading();
                    location.href = url;
                }
            },
            goStudy: function (url) {
                this.$modal.loading();
                location.href = url;
            }
        },
        components: {
            'addnote': function (res, rej) {
                require([window.globalUrl+'/course/createNote.js?v'], res)
            },
            'sc': function (res, rej) {
                require(['/web/html/_layout_/sc/sc.js'], res)
            }
        },
        created: function () {
            this.getLoginStatus()
            this.getCourse();
            this.loadScore2()
            this.countCourseDuration();
            this.getOutline()
        },
        mounted: function () {
        },
    });
});