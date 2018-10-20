/**
 * 我的课程
 */
var str = '';
var getStr = function () {
    var itemId = window.location.href;
    var strArr = itemId.split('/');
    str = strArr[strArr.length - 1];
    if (str.indexOf("#") >= 0) {
        str = str.substring(0, str.indexOf("#"));
    }
    str = str;
};
getStr();
var pageCardList = '';
var hotCardListpage = '';

define(["Pagination"], function () {
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                fal: 1,
                listInd: 0,
                groupData: {
                    createDate: ''
                },
                hasJoin: 1,
                str: str,
                items: '',
                hotcardpage: 1,
                cardpage: 1,
                controlJoin: true,
                circleTopics: '',//帖子列表
                latestGuests: '',//最新访客
                activityMember: '',//活跃成员
                memberList: [],//圈子成员列表
                hotCardList: [],//精华
                subjectGroup: [],//可能感兴趣的圈子
                type: 1,//用户发表帖子的type
                accessoryUrl: '',//用户发帖时上传的资源
                commentArr: [],//暂存所有帖子的评论
                commentArrHot: []//暂存精华帖子的评论
            };
        },
        methods: {
            getUrl: function (items) {
                return ((items.sourceType != 1) ? '/groupdetail/' + items.id : '/join_front?target_url=' + encodeURIComponent(items.sourceUrl) + '&app_key=' + APP_LNPT_KEY);
            },
            cut: function (e, ind) {
                this.listInd = ind;
            },
            getAllData: function () {
                this.getCardlist(1);
                this.getLatestGuests();
                this.getActivityMember();
                this.getMemberList();
                this.getHotCardList(1);
                this.getSubjectGroup();
            },
            getCardlist: function (page) {
                var pageNo = page || this.cardpage;
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/loadGroupTopics', {
                    groupId: this.str,
                    pageNo: pageNo
                }, function (res) {
                    if (res.resultCode == 0) {
                        self.circleTopics = res.data;
                        if (pageNo == 1) {
                            var totalPage = Math.ceil(res.page.rowCount / res.page.pageSize);
                            if (totalPage > 0) {
                                setTimeout(function () {
                                    pageCardList.upDate({
                                        pageTotal: totalPage
                                    });
                                }, 60);
                            }
                        }
                    }
                });
            },
            getHotCardList: function (page) {
                var self = this;
                var pageNo = page || this.hotcardpage;
                Service.get('/zjxxw/api/groupmgr/group/eliteTopic', {
                    groupId: this.str,
                    pageNo: pageNo
                }, function (res) {
                    if (res.resultCode == 0) {
                        self.hotCardList = res.data;
                        if (pageNo == 1) {
                            var totalPage = Math.ceil(res.page.rowCount / res.page.pageSize);
                            if (totalPage > 0) {
                                setTimeout(function () {
                                    hotCardListpage.upDate({
                                        pageTotal: totalPage
                                    });
                                }, 60);
                            }
                        }
                    }
                });
            },
            getSubjectGroup: function () {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/loadHotGroup', {groupId: this.str}, function (res) {
                    if (res.resultCode == 0) {
                        self.subjectGroup = res.data;
                    }
                });
            },
            getMemberList: function () {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/loadUserList', {groupId: this.str}, function (res) {
                    if (res.resultCode == 0) {
                        self.memberList = res.data;
                    }
                });
            },
            getLatestGuests: function () {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/loadGroupTransient', {groupId: this.str}, function (res) {
                    if (res.resultCode == 0) {
                        self.latestGuests = res.data;
                    }
                });
            },
            getActivityMember: function () {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/loadActiveUserList', {groupId: this.str}, function (res) {
                    if (res.resultCode == 0) {
                        self.activityMember = res.data;
                    }
                });
            },
            join: function (e) {
                if (loginStatus) {
                    if (this.controlJoin) {
                        var self = this;
                        this.controlJoin = false;
                        var target = this.getTarget(e);
                        var type = $(target).attr('type');
                        var method = '/zjxxw/api/groupmgr/groupUser/';
                        if (type == 1) {
                            method += 'add';
                        } else if (type == 2) {
                            method += 'remove';
                        }
                        Service.get(method, {groupId: this.str}, function (res) {
                            self.controlJoin = true;
                            if (res.resultCode == 0) {
                                self.getGroupData();
                                if (type == 2) {
                                    var text = '退出成功';
                                    var tips = '加入';
                                    $(target).attr('type', 1);
                                    self.hasJoin = 1;
                                } else {
                                    var text = '加入成功';
                                    var tips = '退出';
                                    $(target).attr('type', 2);
                                    self.hasJoin = 0;
                                }
                                $(".join-btn").text(tips);
                                self.$modal.success(text);
                                self.getGroupData();
                                self.getAllData();
                            } else if (res.resultCode == -1) {
                                self.$modal.error(res.data);
                            }
                        });
                    }
                } else {
                    self.$modal.openself.$modal("/web/v/login/login-self.$modal.html", "用户登录");
                }
            },
            judgeHasJoin: function () {
                if (loginStatus) {
                    var self = this;
                    Service.get('/zjxxw/api/groupmgr/groupUser/isJoin', {groupId: this.str}, function (res) {
                        if (res.resultCode == 0) {
                            if (res.data) {
                                self.hasJoin = 0;
                            } else {
                                self.hasJoin = 1;
                            }
                        } else {
                            // self.$modal.confirm('操作失败');
                        }
                    });
                } else {
                    this.hasJoin = 1;
                }
            },
            publish: function () {
                var self = this;
                if (loginStatus) {
                    if (this.groupData.isJoin) {
                        var remarks = $("#remarks").val();
                        if (!remarks) {
                            this.$modal.warn('请输入评论内容');
                        } else {
                            if (window.getSensitiveWords(remarks)) {
                                var data = {
                                    groupId: this.str,
                                    type: this.type,
                                    remarks: remarks,
                                    accessoryUrl: this.accessoryUrl
                                };
                                Service.postBody('/zjxxw/api/groupmgr/groupMemberTopic/add', data, function (res) {
                                    if (res.resultCode == 0) {
                                        self.circleTopics = [];
                                        self.getCardlist(1);
                                        $("#remarks").val('');
                                        self.$modal.success('发布成功');
                                    }
                                });
                            } else {
                                this.$modal.error("请不要输入敏感词汇！");
                            }
                        }
                    } else {
                        self.$modal.confirm('加入圈子后才可以发帖');
                    }
                } else {
                    self.$modal.openself.$modal("/web/v/login/login-self.$modal.html", "用户登录");
                }
            },
            comment: function (e, ind, topic, ishot) {
                var target = this.getTarget(e);
                var par = $(target).parents('.tab-tips');
                if (!$(target).attr('type')) {
                    $(target).attr('type', 1);
                    if (ishot) {
                        this.getHotTopicComment(topic, 1, par, ind);
                    } else {
                        this.getTopicComment(topic, 1, par, ind);
                    }
                } else {
                    par.find('.comment-div').eq(ind).hide();
                    $(target).attr('type', '');
                }
            },
            getTopicComment: function (topic, pageNo, par, ind) {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/groupMemberTopic/' + topic + '/commentList', {pageNo: pageNo}, function (res) {
                    if (res.resultCode == 0) {
                        if (res.data.length > 0) {
                            var pageTotal = Math.ceil(res.page.rowCount / res.page.pageSize);
                            if (pageNo > 1) {
                                var data = self.commentArr[ind]['data'].concat(res.data);
                            } else {
                                var data = res.data;
                            }
                            Vue.set(self.commentArr, ind, {
                                moreCon: pageTotal > pageNo ? true : false,
                                pageNo: pageNo,
                                data: data
                            });
                        }
                        par.find('.comment-div').eq(ind).show();
                    }
                });
            },
            getMoreComment: function (e, topic, pageNo, ind, ishot) {
                var target = this.getTarget(e);
                var par = $(target).parents('.invitation');
                pageNo++;
                if (ishot) {
                    self.getHotTopicComment(topic, pageNo, par, ind);
                } else {
                    this.getTopicComment(topic, pageNo, par, ind);
                }

            },
            getHotTopicComment: function (topic, pageNo, par, ind) {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/groupMemberTopic/' + topic + '/commentList', {pageNo: pageNo}, function (res) {
                    if (res.resultCode == 0) {
                        var pageTotal = Math.ceil(res.page.rowCount / res.page.pageSize);
                        self.commentArrHot.set(ind, {
                            moreCon: pageTotal > pageNo ? true : false,
                            data: res.data
                        });
                        par.find('.comment-div').eq(ind).show();
                    }
                });
            },
            getTarget: function (e) {
                var event = e || window.event;
                var target = event.target || event.srcElement; //获取document 对象的引用
                return target;
            },
            commentPublish: function (e, ind, group, topicId, ishot) {
                if (loginStatus) {
                    var target = this.getTarget(e);
                    var par = $(target).parents('.invitation');
                    var content = par.find(".content_text").eq(ind).val();
                    var self = this;
                    if (content) {
                        if (window.getSensitiveWords(content)) {
                            var data = {
                                groupId: group,
                                topicId: topicId,
                                content: content
                            };

                            Service.postBody('/zjxxw/api/groupmgr/groupUserTopicComment/add', data, function (res) {
                                if (res.resultCode == 0) {
                                    par.find(".content_text").eq(ind).val('');
                                    if (ishot) {
                                        self.getHotTopicComment(topicId, 1, par, ind);
                                        self.getHotCardList();
                                    } else {
                                        self.getTopicComment(topicId, 1, par, ind);
                                        self.getCardlist();
                                    }
                                } else {
                                    self.$modal.confirm('评论出错', null, 1);
                                }
                            });
                        } else {
                            self.$modal.error("请不要输入敏感词汇！");
                        }
                    } else {
                        self.$modal.confirm('请输入评论内容', null, 1);
                    }
                } else {
                    self.$modal.openself.$modal("/web/v/login/login-self.$modal.html", "用户登录");
                }

            },
            upvote: function (e, id, ind, isthree) {
                if (loginStatus) {
                    var target = this.getTarget(e);
                    if (!$(target).hasClass('col-red')) {
                        var data = {
                            topicId: id,
                            groupId: this.str
                        };
                        var self = this;
                        Service.post('/zjxxw/api/groupmgr/GroupUserTopicLike/add', data, function (res) {
                            if (res.resultCode == 0) {
                                if (res.data) {
                                    self.$modal.confirm('点赞失败');
                                } else {
                                    self.$modal.confirm('点赞成功');
                                    $(target).addClass('col-red');
                                    if (isthree) {//精华帖的点赞
                                        self.hotCardList[ind]['likeCount']++;
                                        self.hotCardList[ind]['userIsLike'] = true;
                                    } else {
                                        self.circleTopics[ind]['likeCount']++;
                                        self.circleTopics[ind]['userIsLike'] = true;
                                    }

                                }
                            } else {
                                self.$modal.confirm('发生错误');
                            }
                        });
                    } else {
                        self.$modal.confirm('您已经点过赞了');
                    }
                } else {
                    self.$modal.openself.$modal("/web/v/login/login-self.$modal.html", "用户登录");
                }
            },
            getGroupData: function () {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/group', {'groupId': this.str}, function (res) {
                    if (res && res.data) {
                        self.groupData = res.data;
                        var str2 = self.groupData.type;
                        self.groupData.type = res.data.type.split(",");
                    }
                });
            },
            upImg: function () {

            },
            circleImg: function () {

            },
            pageCard: function () {
                var self = this;
                pageCardList = new Pagination({
                    container: $("#pagewarp"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.cardpage = page;
                        self.getCardlist(page);
                    }
                });
            },
            hotCard: function () {
                var self = this;
                hotCardListpage = new Pagination({
                    container: $(".hot-group-page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.hotcardpage = page;
                        self.getHotCardList(page);
                    }
                });
            }
        },
        components: {
            'sc': function (res, rej) {
                require([__uri('/web/html/_layout_/sc/sc.js?v')], res);
            }
        },
        created: function () {
            this.getGroupData();
            this.getAllData();
        },
        mounted: function () {
            this.pageCard();
            this.hotCard();
            // this.judgeHasJoin();

        }
    });
    return classManage;
});