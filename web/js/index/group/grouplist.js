/**
 * 我的课程
 */
define(["Pagination"], function () {
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                activeClassNum: 0,//暂存当前选中分类的下标
                activeTagsNum: 0,//暂存当前选中标签的下标
                totalPage: 0,
                groupData: {},
                circleClassify: [{
                    createDate: '',
                    creatorId: "",
                    delStatus: '',
                    id: '',
                    name: '全部',
                    sort: '1',
                    active: true
                }],
                allCircleTag: [],
                circleTag: [],
                circleList: [],
                userJoinData: [],
                controlJoin: true,
                params: {
                    classId: '',
                    typeId: '',
                    pageNo: URL.getParameter('pageNo') ? URL.getParameter('pageNo') : 1
                }
            };
        },
        watch: {
            activeClassNum: {
                handler: function (val, oldval) {
                    var self = this;
                    this.circleTag = [];
                    this.circleTag = this.allCircleTag.filter(function (ele) {
                        if (ele.groupClassId == self.circleClassify[val].id) {
                            return ele;
                        }
                    });
                }
            }
        },
        methods: {
            loadGroups: function () {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/loadGroupList', this.params, function (res) {
                    if (res.resultCode == 0) {
                        if (res.data.length > 0) {
                            res.data.forEach(function (ele, i) {
                                ele['hasjoin'] = false;
                            });
                            self.circleList = res.data;
                            self.totalPage = Math.ceil(res.page.rowCount / res.page.pageSize);
                            self.mergeGroupData();
                        } else {
                            if (self.params.pageNo === 1) {
                                self.circleList = '';
                                self.totalPage = 0;
                            }
                        }
                        self.pagination();
                        setTimeout(setfootDet, 0);
                    } else {

                    }
                });
            },
            getUserJoinData: function () {
                if (loginStatus) {
                    var self = this;
                    Service.get('/zjxxw/api/groupmgr/group/getGroupListByUserId', {}, function (res) {
                        if (res.resultCode == 0) {
                            if (res.data.length > 0) {
                                self.userJoinData = res.data;
                                self.mergeGroupData();
                            }
                        } else {

                        }
                    });
                }
            },
            mergeGroupData: function () {
                if (this.userJoinData.length > 0 && this.circleList.length > 0) {
                    for (var i = 0, j = this.circleList.length; i < j; i++) {
                        for (var k = 0, y = this.userJoinData.length; k < y; k++) {
                            if (this.circleList[i]['id'] === this.userJoinData[k]['groupId']) {
                                this.circleList[i]['hasjoin'] = true;
                            }
                        }
                    }
                }
            },
            loadGroupTags: function () {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/loadTypeList', null, function (res) {
                    self.allCircleTag = res.data;
                });
            },
            loadGroupCategory: function () {
                var self = this;
                Service.get('/zjxxw/api/groupmgr/group/loadClassList', null, function (res) {
                    self.circleClassify = self.circleClassify.concat(res.data);
                });
            },
            changeCategory: function (event, ind) {
                this.params.classId = this.circleClassify[ind].id;
                this.activeClassNum = ind;
                this.params.typeId = '';
                this.activeTagsNum = 0;
                this.loadGroups();
            },
            changeTags: function (event, ind) {
                this.params.typeId = ind ? this.circleTag[ind - 1].id : "";
                this.activeTagsNum = ind;
                this.loadGroups();
            },
            pagination: function () {
                var self = this;
                if (this.params.pageNo == 1) {
                    self.groupData.upDate({
                        pageTotal: this.totalPage
                    });
                }

            },
            getTarget: function (e) {
                var event = e || window.event;
                var target = event.target || event.srcElement; //获取document 对象的引用
                return target;
            },
            join: function (e, group) {
                if (loginStatus) {
                    var target = this.getTarget(e);
                    var self = this;
                    if (!$(target).hasClass('hasjoin-btn') && $(target).attr('type') == 1) {
                        $(target).attr('type', 2);
                        var method = '/zjxxw/api/groupmgr/groupUser/add';
                        Service.get(method, {groupId: group.id}, function (res) {
                            if (res.resultCode == 0) {
                                var text = '加入成功';
                                $(target).addClass('hasjoin-btn');
                                $(target).text('已加入');
                                group.memberCount++;
                                self.$modal.confirm(text, null, 1);
                            } else {
                                memberCount.confirm(res.message, null, 1);
                                $(target).attr('type', 1);
                            }
                        });
                    }
                } else {
                    Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
                }
            },
            getUrl: function (items) {
                return ((items.sourceType != 1) ? '/groupdetail/' + items.id : '/join_front?target_url=' + encodeURIComponent(items.sourceUrl) + '&app_key=' + APP_LNPT_KEY);
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.groupData = new Pagination({
                    container: $(".cj-page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getcjList(page);
                    }
                });
            }
        },
        created: function () {
            this.pageInit();
            this.loadGroups();
            this.loadGroupTags();
            this.loadGroupCategory();
            this.getUserJoinData();
        },
        mounted: function () {

        }
    });
    return classManage;
});