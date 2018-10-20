/**
 * 我的课程
 */
define(["Pagination"], function () {
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                avtive: 'active',
                activePage: {},
                activity_search: [],
                activity_ranking: [],
                acitvity_topn: [],
                type_list: [],
                typeStatus: 0,//分类状态
                searchTime: null,
                searchOptions: {
                    // 活动的来源   0:浙江学习网 1：第三方应用
                    // categoryId:0,
                    //1-未开始，2-进行中，3-已结束
                    status: '',
                    //0线下，1线上
                    style: '',
                    //发布时间
                    // publishTime,
                    // 分页查询
                    pageNo: 1,
                    pageSize: 10,
                    // 是否查询热门
                    orderbyHot: false,
                    // 是否查询置顶
                    orderbyTopN: false,
                    //排序条件
                    // orderBy,
                    title: '',
                    typeId: null,
                    active: 'active',
                    startTime: '',
                    // 最近发布
                    orderbyPubTime: 'false'
                },
                // 我要参加
                attend: {
                    // 活动id
                    activityId: '',
                    status: 1
                }
            };
        },
        methods: {
            /**
             * 排行榜搜索结果列表
             */
            searchActivity: function () {
                var self = this;
                this.getSearchList(function (result) {
                });
            },
            /**
             * 关键字搜索列表
             * */
            searchKeyword: function (e) {
                var self = this;
                clearTimeout(this.searchTime);
                this.searchTime = setTimeout(function () {
                    self.searchOptions.title = $('.topall>input').val();
                    self.getSearchList(null, 1);
                }, 400);
            },
            getSearchList: function (cb, pageNo) {
                if (pageNo) {
                    this.searchOptions.pageNo = pageNo;
                }
                ;
                var self = this;
                var success = function (result) {
                    self.activity_search = result.data;
                    if (cb) {
                        cb(result);
                    }
                    if (result.page) {
                        var pageTotal = Math.ceil(result.page.rowCount / result.page.pageSize);
                        if (result.page.currentPageIndex == 1) {
                            self.activePage.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                    setTimeout(setfootDet, 0);
                };
                Service.postBody('/zjxxw/api/activity/search', this.searchOptions, success);
            },
            /**
             * 类型列表
             * */
            searchList: function () {
                var self = this;
                var success = function (result) {
                    self.type_list = result.data;
                };
                Service.get('/zjxxw/api/activitytype/list', this.searchOptions, success);
            },
            /**
             * 类型搜索列表
             **/
            searchTypelist: function () {
                this.getSearchList();
            },
            /**
             * 热门活动列表
             */
            topnActivity: function () {
                var self = this;
                var topn = 6;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.acitvity_topn = result.data;
                    }
                };
                Service.get('/zjxxw/api/activity/top/' + topn, null, success);
            },
            /**
             * 活动排行榜
             */
            rankingActivity: function () {
                var self = this;
                var topn = 10;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.activity_ranking = result.data;
                    }
                };
                Service.get('/zjxxw/api/activity/ranking/' + topn, null, success);
            },
            /**
             * 点击获取类型
             */
            typeActivity: function (id, event) {
                $(event.target).addClass('active').parent().siblings().children("a").removeClass("active");
                this.searchOptions.typeId = id;
                this.searchActivity();
            },
            /**
             * 点击全部、进行时、进行时、已结束
             */
            statusActivity: function (status) {
                this.searchOptions.status = status;
                this.searchActivity();
            },
            /**
             * 点击线上活动，线下活动
             */
            lineActivity: function (style, event) {
                $(event.target).addClass('active').parent().siblings().children("a").removeClass("active");
                this.searchOptions.style = style;
                this.searchActivity();
            },
            /**
             * 点击全部  获取全部的类型
             */
            allType: function (event) {
                $(event.target).addClass('active').parent().siblings().children("a").removeClass("active");
                this.searchOptions.typeId = '';
                this.searchActivity();
            },
            /**
             * 点击选择日期 获取最近一周、最近一月、最近一季的活动列表
             *
             */
            clickDate: function (event) {
                $(event.target).css({"backgroundColor": "#2bcede", "color": "#fff", 'borderRadius': '66px'});
                $('#lately').css('display', 'block');
                $('#latestRelease').css({"backgroundColor": "#fff", "color": "#333333", "border": "none"});
                var date = new Date();
                var year = date.getFullYear();//获取完整的年份(4位,1970-????)
                var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
                var day = date.getDate();//获取当前日(1-31)
                var currentTime = year + "-" + month + "-" + day;
                $('#lately').children('li').eq(0).click(function () {
                    var val = $(this).text();
                    $('#clickDate').text(val);
                    $(this).css('backgroundColor', '#F5F5F5');
                    $(this).siblings('li').css('backgroundColor', '#FFF');
                    this.searchOptions.startTime = currentTime;
                    this.searchActivity();
                    $('#lately').css('display', 'none');
                });
                $('#lately').children('li').eq(1).click(function () {
                    var val = $(this).text();
                    $('#clickDate').text(val);
                    $(this).css('backgroundColor', '#F5F5F5');
                    $(this).siblings('li').css('backgroundColor', '#FFF');
                    day = day + 7;
                    // 判断是否是闰年 平年2月28 闰年2月29
                    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                        if (month == 12 || month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10) {
                            if (day > 31) {
                                month = month + 1;
                                if (month > 12) {
                                    year = year + 1;
                                    month = month - 12;
                                }
                                day = day - 31;
                            }
                        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                            if (day > 30) {
                                month = month + 1;
                                day = day - 30;
                            }
                        } else if ((month == 2)) {
                            if (day > 28) {
                                month = month + 1;
                                day = day - 28;
                            }
                        }
                    }
                    else if (year % 4 !== 0 && year % 100 == 0 || year % 400 !== 0) {
                        if (month == 12 || month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10) {
                            if (day > 31) {
                                month = month + 1;
                                if (month > 12) {
                                    year = year + 1;
                                    month = month - 12;
                                }
                                day = day - 31;
                            }
                        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                            if (day > 30) {
                                month = month + 1;
                                day = day - 30;
                            }
                        } else if ((month == 2)) {
                            if (day > 29) {
                                month = month + 1;
                            }
                        }
                    }
                    var currentTime = year + "-" + month + "-" + day;
                    this.searchOptions.startTime = currentTime;
                    this.searchActivity();
                    $('#lately').css('display', 'none');
                });
                $('#lately').children('li').eq(2).click(function () {
                    var val = $(this).text();
                    $('#clickDate').text(val);
                    $(this).css('backgroundColor', '#F5F5F5');
                    $(this).siblings('li').css('backgroundColor', '#FFF');
                    month += 1;
                    this.searchOptions.startTime = currentTime;
                    this.searchActivity();
                    $('#lately').css('display', 'none');
                });
                $('#lately').children('li').eq(3).click(function () {
                    var val = $(this).text();
                    $('#clickDate').text('选择日期');
                    $(this).css('backgroundColor', '#F5F5F5');
                    $(this).siblings('li').css('backgroundColor', '#FFF');
                    this.searchOptions.startTime = ' ';
                    this.searchActivity();
                    $('#lately').css('display', 'none');
                });
            },
            /**
             * 点击最新发布
             *
             */
            clickLatest: function () {
                $(event.target).css({"backgroundColor": "#2bcede", "color": "#fff", 'borderRadius': '66px'});
                $('#clickDate').css({"backgroundColor": "#fff", "color": "#333333", "border": "none"});
                $('#lately').css('display', 'none');
                this.searchOptions.orderbyPubTime = true;
                this.searchOptions.startTime = ' ';
                this.searchActivity();
            },
            /**
             * 点击增加点击量
             */
            clickC: function (id, url) {
                var success = function (result) {
                    // location.href = url;
                };
                Service.get('/zjxxw/api/activity/' + id + "/clickCount", null, success);
            },
            /**
             * 用户没有登录时点击我要参加
             */
            uncttend: function () {
                location.href = "/login?redirect_url=%2Fapps%2Fucenter%2Factivity%2Flist";
            },

            /**
             * 登录过点击我要参加
             */
            cttending: function (row, ind) {
                if (loginStatus) {
                    this.attend.activityId = row.id;
                    this.attend.status = 1;
                    var self = this;
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.$modal.confirm("参加成功", null, 1);
                            self.activity_search[ind].isJoin = true;
                            self.activity_search[ind].memberCount += 1;

                        } else if (result.resultCode == -1) {
                            self.$modal.confirm(result.message, null, 1);
                        }
                    };
                    Service.post('/zjxxw/api/activityuser/join/', this.attend, success);
                } else {
                    Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
                }
            },

            /**
             * 登录过点击取消参加
             */
            cttended: function (row, ind) {
                this.attend.activityId = row.id;
                this.attend.status = 0;
                var self = this;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.$modal.confirm("已取消", null, 1);
                        self.activity_search[ind].isJoin = false;
                        self.activity_search[ind].memberCount -= 1;
                        // $('#' + id).siblings('.activityStatus').css('display', 'block');
                        // $('#' + id).siblings('.cancleStatus').css('display', 'none');
                    } else if (result.resultCode == -1) {
                        self.$modal.confirm(result.message);
                    }
                };
                Service.post('/zjxxw/api/activityuser/join/', this.attend, success);
            },
            getUrl: function (items) {
                return ((items.type != 1) ? '/activitydetail/' + items.id : '/join_front?target_url=' + encodeURIComponent(items.sourceUrl) + '&app_key=' + APP_LNPT_KEY);
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                self.activePage = new Pagination({
                    container: $(".nodata-warp"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getcjList(page);
                    }
                });
            }

            // /**
            //  * 判断用户是否参加当前活动
            //  */
            // userActivityStatus: function (activity,ind) {
            //     var self = this;
            //     var success = function (result) {
            //         var activityUser = result.data;
            //         if(activityUser.activityId ){
            //             self.activity_search[ind].hasJoin = true;
            //         }
            //     };
            //     Service.get('/api/activityuser/' + activity.id, null, success);
            // },
        },
        created: function () {
            this.pageInit();
            this.topnActivity();
            this.searchActivity();
            this.rankingActivity();
            this.searchList();
            $('.topall>a').click(function () {
                this.searchKeyword();
            });
            $('.cat_status li').click(function () {
                $(this).children('a').addClass('active');
                $(this).siblings().children('a').removeClass('active');
            });
        }
    });
    return classManage;
});