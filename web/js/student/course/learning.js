define(["Pagination"], function () {
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                showTabNum: 1,
                chapter: {
                    courseId: $("#courseId").val()
                },
                courseId: $("#courseId").val(),
                chapterId: $("#chapterId").val(),
                course: {},
                controlMenuBoo: false,
                dataModel: {
                    ckcid: '',
                    cksid: '',
                    cnr: ''
                },
                rows_chapter: [],
                notePage: 1,//笔记页码
                notes: [],//笔记列表
                inputNote: ''//用户输入的内容
            };
        },
        methods: {
            initPage: function () {
                var self = this;
                $('.tabs .tabitem').click(function () {
                    $('.tabs .tabitem').removeClass("tabitem-pos");
                    $(this).addClass("tabitem-pos");
                    var id = $(this).attr('id');
                    id = id.substring(4);
                    $('#tabbox-' + id).show();
                    $('#tabbox-' + id).siblings().hide();

                    // if (id == "chapter") {
                    //     self.loadChapter();
                    // }
                    // if (id == "note") {
                    //     self.loadNotes();
                    // }
                });
            },
            // loadChapter: function (num) {
            //     var pageNo = num || 1;
            //     Request.fillPage('/course/detail/' + $("#courseId").val() + '/data_center_course_outline_page?chapterId=' + $("#chapterId").val() + '&pageNo=' + pageNo, 'outline_page', this.setThisClassSty);
            // },
            // loadNotes: function (num) {
            //     var pageNo = num || 1;
            //     Request.fillPage('/course/detail/' + $("#courseId").val() + '/data_center_course_notes_page?chapterId=' + $("#chapterId").val() + '&pageNo=' + pageNo, 'courseNote_page');
            // },
            fillPage: function (url, pageId) {
                var random = Utils.generateRandomCode();

                if (url.indexOf("?") > 0) {
                    url += "&v=" + random;
                } else {
                    url += "?v=" + random;
                }

                $.get(url, function (result) {
                    $("#" + pageId).html(result);
                });
            },
            changeTabNum: function (num) {
                this.showTabNum = num;
            },
            // controlMenu: function () {
            //     this.controlMenuBoo = !this.controlMenuBoo;
            //     if (this.controlMenuBoo) {
            //         $('#course-toolbar-box').animate({'width': 0}, 300);
            //         $("#j-hideRightBtn").animate({'right': '0'}, 300);
            //     } else {
            //         $('#course-toolbar-box').animate({'width': 320}, 300);
            //         $("#j-hideRightBtn").animate({'right': '320px'}, 300);
            //     }
            // },
            initPlayer: function (result) {
                var time = 0;
                var interTime = null;
                var duration = 0;
                window.loadedHandler = function () {//播放器加载后会调用该函数
                    player.addListener('time', timeHandler); //监听播放时间,addListener是监听函数，需要传递二个参数，'time'是监听属性，这里是监听时间，timeHandler是监听接受的函数
                    player.addListener('pause', getPause);
                    player.addListener('play', setPlay);
                    player.addListener('ended', sendEnd);
                    player.addListener('duration', durationHandler); //监听播放时间
                };
                window.timeScheduleAdjust = (result.percent >= 100) ? 1 : 0;//ckplayer的禁止拖动配置无法传入，只能修改源码，这是官方提供的方法，，真TMSB  http://www.ckplayer.com/manualx/31.html
                var videoObject = {
                    container: '#video', //容器的ID或className
                    variable: 'player', //播放函数名称
                    loaded: 'loadedHandler', //当播放器加载后执行的函数
                    flashplayer: false, //强制使用flashplayer
                    seek: 0, //默认跳转的时间
                    video: $("#videoUrl").val()
                };
                var player = new ckplayer(videoObject);

                function setPlay() {
                    player.removeListener('play', setPlay);
                    player.videoSeek(parseFloat(result.playTime));
                    startSendTime();
                };

                function timeHandler(t) {
                    time = t;
                };

                function getPause(t) {
                    clearInterval(interTime);
                    player.addListener('play', startSendTime);
                    sendTime();
                };

                function durationHandler(totalTime) {
                    duration = totalTime;
                }

                function startSendTime() {
                    interTime = setInterval(function () {
                        sendTime();
                    }, 10000);
                };

                function sendEnd() {
                    clearInterval(interTime);
                    player.addListener('play', startSendTime);
                    var percent = 100;
                    Service.get('/jxxt/api/course/lps/log_video_play_complete', {
                        ksId: $("#chapterId").val(),
                        xykcId: $("#xykcId").val(),
                        percent: percent
                    });
                };

                function sendTime() {
                    var percent = duration <= 0 ? "0" : (Math.round((time / duration) * 100));
                    Service.get('/jxxt/api/course/lps/log_video_playing', {
                        ksId: $("#chapterId").val(),
                        xykcId: $("#xykcId").val(),
                        playTime: time,
                        percent: percent
                    });
                }
            },
            setPlayDate: function () {
                var self = this;
                Service.get('/jxxt/api/course/lps/get_video_progress', {
                    ksId: $("#chapterId").val(),
                    xykcId: $("#xykcId").val()
                }, function (res) {
                    if (res.resultCode == 0) {
                        self.initPlayer(res.data);
                    }
                });
            },
            setThisClassSty: function () {
                var chapterId = $("#chapterId").val();
                $("#" + chapterId).addClass("playActive");
            },
            getCourse: function () {
                var self = this;
                if (!isNull(this.courseId) && !this.courseId.isEmpty()) {
                    var success = function (result) {
                        self.course = result.data;
                        self.getCourseChapterList();
                    };
                    Service.get('/jxxt/api/admin/course/manageCourse/' + this.courseId, null, success);
                } else {
                    self.initPage();
                }
            },
            /**
             * 获取课程章节信息
             */
            getCourseChapterList: function () {
                var self = this;
                var data = {
                    pageNo: 1
                };
                var success = function (result) {
                    self.rows_chapter = result.data;
                    self.setThisClassSty();
                };
                Service.get('/jxxt/api/admin/course/' + this.course.id + '/outline', data, success);
            },
            getCourseNotesList: function (pageNo, cb) {
                var courseId = this.courseId;
                var chapterId = this.chapterId;
                var pageNo = pageNo || this.notePage;
                var self = this;
                Service.get('/jxxt/api/course/notes/myNotes', {
                    courseId: courseId,
                    chapterId: chapterId,
                    pageNo: pageNo
                }, function (result) {
                    if (result.resultCode == '0') {
                        self.notePage = pageNo;
                        if (result.data.length > 0) {
                            if (pageNo > 1) {
                                self.notes = self.notes.concat(result.data);
                            } else {
                                self.notes = result.data;
                            }
                        } else {
                            if (cb) {
                                self.$modal.warn("没有更多笔记了");
                            }

                        }
                    } else {
                        self.notePage--;
                    }
                    if (cb) {
                        cb();
                    }
                });
            },
            saveNote: function () {
                var self = this;
                var cnr = $("#noteContent").val();
                var title = $("#title").val();
                if (!cnr) {
                    self.$modal.warn("笔记内容不能为空");
                    return;
                }
                if (!title) {
                    self.$modal.warn("笔记标题不能为空");
                    return;
                }
                var nfxzt = 0;
                if ($('input[name=fxzt]:checked').length == 1) {
                    nfxzt = 1;
                }
                var data = {
                    ckcid: self.courseId,
                    cksid: self.chapterId,
                    cnr: cnr,
                    nfxzt: nfxzt,
                    cbt: title
                };
                var success = function (result) {
                    if (result.success) {
                        self.getCourseNotesList(1);
                        self.$modal.success("保存成功");
                        $("#noteContent").val('');
                        $("#title").val('');
                        $('input[name=fxzt]:checked').attr("checked", false);
                    } else {
                        self.$modal.error(result.message);
                    }
                };
                Service.postBody('/jxxt/api/course/notes/create', data, success);

            },
            getMoreNote: function (e) {
                var ev = e || window.event;
                var target = ev.target;
                if ($(target).attr("hasClick") == 1) {
                    return;
                } else {
                    $(target).attr("hasClick", 1);
                    var maxPage = $("#notePageNum").val();
                    this.notePage++;
                    this.getCourseNotesList(this.notePage, function () {
                        $(target).attr("hasClick", 0);
                    });

                }
            },
            finishText: function () {
                if (!$("#percent").val() || $("#percent").val() < 0) {
                    var self = this;
                    var data = {
                        kcnrid: $("#kcnrid").val(),
                        xykcid: $("#xykcid").val()
                    };
                    var success = function (result) {
                        if (result.success) {
                            $("#finishbtn").css("background", '#eee');
                            self.$modal.success('操作成功！', function () {
                                var url = $("#j-next").attr("href");
                                if (url && url.trim() != 'javascript:void(0)') {
                                    location.href = url;
                                } else {
                                    location.href = location.href;
                                }
                            });
                        } else {
                            self.$modal.warn('操作失败！');
                        }
                    };
                    Service.get("/jxxt/api/course/lps/textFinish", data, success);
                }
            },
            setWbBtn: function () {
                if ($("#percent").length > 0) {
                    if ($("#percent").val() > 0) {
                        $("#finishbtn").css("background", '#eee');
                    }
                }
            }
        },
        created: function () {
            this.getCourse();
            this.initPage();
            // this.loadChapter();
            // this.loadNotes()
            this.getCourseNotesList();
        },
        mounted: function () {
            this.setPlayDate();
            this.setWbBtn();

        }
    });
    var pageCon = new Pagination({
        container: $(".paggsplit-page"),
        pageTotal: 0,
        callback: function (page) {
            app.loadMyCourses(page);
        }
    });
    return classManage;
});