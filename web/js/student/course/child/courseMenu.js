define(function () {
    var courseMenu = Vue.component('courseMenu', {
        template: __inline("/web/html/student/course/child/courseMenu.html"),
        data: function () {
            return {
                rows_chapter: [],
                learningStatus: {},
                chapter: {},
                course: ''
            };
        },
        methods: {
            /*
            * 跳往详情页面
            * */
            goDetail: function (chapter) {
                //'/ucenter/course/learning/'+course.id+'?chapterId='+third.id
                var self = this;
                var data = {
                    courseId: this.course.id,
                    chapterId: chapter.id
                };
                Service.get("/jxxt/api/student/checkKcZj", data, function (result) {
                    if (result.success) {
                        var type = result.data.type;
                        var errorMsg = '';
                        var Url = '';
                        if (type == 3) {
                            //作业
                            //跳转到作业页面
                            if (result.data.jzzt > 0) {
                                errorMsg = "该作业已过期！截止时间" + result.data.jzsj;
                            }
                        }
                        if (type == 4) {
                            //考试
                            if (result.data.kszt == 'wccj') {
                                errorMsg = "考试还未出成绩，请等待！";
                            } else if (result.data.kszt == 'yccj') {
                                //已经考完出成绩了，跳转到成绩详情页
                                Url = "/ucenter/view_exam?cjid=" + result.data.cjid + "&sjid=" + result.data.sjid;
                            } else if (result.data.kszt == 'wks') {
                                errorMsg = "当前考试还未开始！开始日期：" + date(result.data.kssj);
                            } else if (result.data.kszt == 'yjs') {
                                errorMsg = "当前考试已截止！截止日期：" + date(result.data.jssj);
                            }
                        }

                        if (type == 6) {
                            //练习
                            if (result.data.lxzt == 'no') {
                                errorMsg = "练习次数已满！";
                            }
                        }
                        if (errorMsg) {
                            self.$modal.warn(errorMsg);
                        } else {
                            location.href = Url || ('/course/learning/' + self.course.id + '?chapterId=' + chapter.id);
                        }
                    } else {
                        self.$modal.error(result.message);
                    }
                });

            },
            /**
             * 获取课程章节信息
             */
            getCourseChapterList: function () {
                var self = this;
                var data = {
                    pageNo: self.pageNo
                };
                var success = function (result) {
                    self.rows_chapter = result.data;
                };
                Service.get('/jxxt/api/admin/course/' + this.course.id + '/outline', data, success);
            },
            /**
             * 设置章节内容
             */
            setChapterContent: function (type, parentChapter, thisChapter) {
                var self = this;
                var templateUrl, title, width;
                switch (type) {
                    case 1:
                        // 子章节名称
                        templateUrl = __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_chapterName.js');
                        title = "添加子章节";
                        width = 732;
                        break;
                    case 3:
                        // 作业
                        templateUrl = __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_homework.js');
                        title = "添加作业";
                        width = 732;
                        break;
                    case 2:
                        // 视频内容
                        templateUrl = __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_video.js');
                        title = "添加视频";
                        width = 732;
                        break;
                    case 5 :
                        // 文本内容
                        templateUrl = __uri('/web/v/ucenter/build_course/edit_course/modal/modal_text.js');
                        title = "添加文本";
                        break;
                    case 6 :
                        // 练习
                        templateUrl = __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_practice.js');
                        title = "添加练习";
                        width = 930;
                        break;
                    case 4 :
                        // 考试
                        templateUrl = __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_exam.js');
                        title = "添加考试";
                        width = 940;
                        break;
                }

                this.$modal.show(this, {
                    templateURL: templateUrl,
                    title: title,
                    width: width,
                    thisChapter: thisChapter,
                    parentChapter: parentChapter,
                    course: this.course,
                    callback: function (chapter) {
                        if (chapter) {
                            if (chapter.parentId == 0) {
                                self.rows_chapter.push(chapter);
                                for (var i = 0; i < self.rows_chapter.length; i++) {
                                    self.rows_chapter[i].chapterNum = i + 1;
                                }
                            } else {
                                var idx = self.rows_chapter.indexOf(parentChapter);
                                var i = idx;
                                for (; i < self.rows_chapter.length;) {
                                    i++;
                                    if (chapter.contentType == 0) {
                                        if (!self.rows_chapter[i] || self.rows_chapter[i].parentId != parentChapter.id) {
                                            break;
                                        }
                                    } else {
                                        if (!self.rows_chapter[i] || self.rows_chapter[i].contentParentId != parentChapter.id) {
                                            break;
                                        }
                                    }
                                }
                                ;
                                self.rows_chapter.splice(i, 0, chapter);
                            }
                            self.updateChaptertNum();
                        }
                    }
                });
            },

            /**
             * 更新章节排序字段
             */
            updateChaptertNum: function () {
                var self = this;
                var chapterList;
                self.rows_chapter.forEach(function (r, rIndex) {
                    r.chapterNum = rIndex + 1;
                });
                var success = function (result) {
                };
                Service.postBody('/jxxt/api/admin/chapter/sortChapter', this.rows_chapter, success);
            },

            /**
             * 创建章节
             */
            createChapter: function (chapter) {
                var self = this;
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/modal_add_chapterName.js'),
                    title: "新增章节",
                    width: 600,
                    course: this.course,
                    callback: function (chapter) {
                        self.rows_chapter.push(chapter);
                        for (var i = 0; i < self.rows_chapter.length; i++) {
                            self.rows_chapter[i].chapterNum = i + 1;
                        }
                        // 更新
                        self.updateChaptertNum();
                    }
                });
            },

            /**
             * 删除章节
             */
            deleteChapter: function (row) {
                var self = this;
                var success = function (result) {
                    self.$modal.success("删除成功！");
                    self.rows_chapter.splice(result.data.chapterNum - 1, 1);
                    self.updateChaptertNum();
                };
                self.$modal.confirm("是否删除", function () {
                    Service.get('/jxxt/api/admin/chapter/' + row.id + '/delete', null, success);
                });
            },
            /**
             * 判断是否可以删除
             */
            isDelete: function (row) {
                if (row.chapterNum < this.rows_chapter.length) {
                    if (row.contentType == 1) {
                        this.deleteChapter(row);
                    } else if (this.rows_chapter[row.chapterNum].contentType == 0) {
                        if (row.id != this.rows_chapter[row.chapterNum].parentId) {
                            this.deleteChapter(row);
                        } else {
                            this.$modal.error("删除失败，请删除该章节子目录后，再删除该章节。");
                        }
                    } else if (this.rows_chapter[row.chapterNum].contentType == 1) {
                        if (row.id != this.rows_chapter[row.chapterNum].contentParentId) {
                            this.deleteChapter(row);
                        } else {
                            this.$modal.error("删除失败，请删除该章节内容后，再删除该章节。");
                        }
                    }
                } else {
                    this.deleteChapter(row);
                }

            },
            /*
            * 选中目录改变样式
            * */
            selectMenu: function (e) {
                var target = e.target;
                if (!$(target).hasClass('menu_li')) {
                    target = $(target).parents(".menu_li");
                }
                ;
                if ($(target).length > 0) {
                    $(".select_menu").removeClass("select_menu");
                    $(target).addClass('select_menu');
                }
            },
            removeSel: function (e) {
                var target = e.target;
                if (!$(target).hasClass('menu_li')) {
                    target = $(target).parents(".menu_li");
                }
                ;
                if ($(target).length > 0) {
                    $(".select_menu").removeClass("select_menu");
                }
            },
            chapterMenuMove: function (direction, ind) {
                if (!direction) {
                    direction = 'up';
                }
                ;
                var self = this;
                //获取当前章节下的子章节
                var getAllChild = [];
                var thisChapter = JSON.parse(JSON.stringify(self.rows_chapter[ind]));
                for (var i = ind + 1, j = self.rows_chapter.length; i < j; i++) {
                    if (self.rows_chapter[i].parentId === self.rows_chapter[ind].id) {
                        getAllChild.push(self.rows_chapter[i]);
                    } else if (self.rows_chapter[i].parentId == 0) {
                        break;
                    }
                }
                ;
                if (direction === 'up') {
                    if (ind == 0) {
                        return;
                    }
                    ;
                    var upInd = 0;
                    for (var i = ind - 1; i >= 0; i--) {
                        if (self.rows_chapter[i].parentId == 0) {
                            upInd = i;
                            break;
                        }
                    }
                    ;
                    self.rows_chapter.splice(ind, getAllChild.length + 1);
                    for (var k = getAllChild.length - 1; k >= 0; k--) {
                        self.rows_chapter.splice(upInd, 0, getAllChild[k]);
                    }
                    self.rows_chapter.splice(upInd, 0, thisChapter);

                } else {
                    if (ind >= this.rows_chapter.length - 1) {
                        return;
                    }
                    ;
                    var downInd = 0;
                    var timeInd = 0;
                    for (var k = ind + 1, m = self.rows_chapter.length; k < m; k++) {
                        if (self.rows_chapter[k].parentId == 0) {
                            timeInd++;
                            downInd = k;
                            if (timeInd >= 2) {
                                downInd = k;
                                break;
                            }
                        }
                    }
                    ;
                    if (timeInd < 2) {
                        downInd = self.rows_chapter.length;
                    }
                    for (var k = getAllChild.length - 1; k >= 0; k--) {
                        self.rows_chapter.splice(downInd, 0, getAllChild[k]);
                    }
                    self.rows_chapter.splice(downInd, 0, thisChapter);
                    self.rows_chapter.splice(ind, getAllChild.length + 1);
                }
                this.updateChaptertNum();
            },
            childMenuMove: function (direction, ind) {
                if (!direction) {
                    direction = 'up';
                }
                if (direction === 'up') {
                    var thisMenu = JSON.parse(JSON.stringify(this.rows_chapter[ind]));
                    var upMenu = JSON.parse(JSON.stringify(this.rows_chapter[ind - 1]));
                    if (thisMenu.parentId === upMenu.parentId) {
                        this.rows_chapter.splice([ind - 1], 2, thisMenu, upMenu);
                    }
                } else {
                    var thisMenu = JSON.parse(JSON.stringify(this.rows_chapter[ind]));
                    var downMenu = JSON.parse(JSON.stringify(this.rows_chapter[ind + 1]));
                    if (thisMenu.parentId === downMenu.parentId) {
                        this.rows_chapter.splice([ind], 2, downMenu, thisMenu);
                    }
                }
                ;
                this.updateChaptertNum();
            },
            getTime: function (time) {
                return window.dateMinute(time);
            }
        },
        created: function () {
            this.course = this.$store.getters.getCourse();
            this.learningStatus = this.$store.getters.getLearnStatus();
            if (this.course.id) {
                this.getCourseChapterList();
            } else {
                var self = this;
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.learningStatus = data.learningStatus;
                    self.getCourseChapterList();
                });
            }
        },
        mounted: function () {
        }
    });
    return courseMenu;
});