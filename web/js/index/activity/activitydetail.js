define(["Pagination", 'fcup', 'Swiper'], function () {
    //截取地址栏中的id
    var activityId = location.href;
    var index = activityId.lastIndexOf("\/");
    activityId = activityId.substring(index + 1, activityId.length);
    // var fcup = require('fcup');
    // var Swiper = require('Swiper');
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                // 页面数据模型
                tlcontent: '',
                dataModel: {
                    id: '',
                    topStatus: 0,
                    title: '',
                    sourceUrl: '',
                    pic1: '',
                    pic2: '',
                    pic3: '',
                    description: '',
                    content: '',
                    notice: '',
                    startDate: '',
                    endDate: '',
                    sponsor: '',
                    address: '',
                    cost: 0,
                    maxMemberCount: 100,
                    clickCount: 0,
                    createDate: '',
                    creatorName: ''
                },
                // 我要参加
                attend: {
                    // 活动id
                    activityId: '',
                    status: 1
                },
                image_list: [],
                //提交评论 回复
                discuss: {
                    "id": "",
                    //活动ID
                    parentId: '',
                    //评论标题
                    title: '',
                    //评论内容
                    content: '',
                    //用户id
                    creatorId: '',
                    //用户姓名
                    creatorName: '',
                    //用户头像
                    creatorPic: '',
                    //回复id
                    commentId: '',
                    //回复name
                    nameReply: '',
                    //回复内容
                    contentReply: '',
                    //回复时间
                    createDate: ''
                },
                // 评论列表信息
                discuss_list: [],
                //热门活动
                activity: [],
                // 提交回复信息
                submitMessage: {},
                pageTotal: 0,
                pageNo: 1
            };
        },
        methods: {
            /**
             * 活动的详细信息
             */
            getActivityInfo: function () {
                var self = this;
                if (!isNull(activityId) && !activityId.isEmpty()) {
                    var self = this;
                    var success = function (result) {
                        self.dataModel = Utils.getDefault(result.data, self.dataModel);
                        setTimeout(function () {
                            setTimeout(function () {
                                new Swiper('.swiper-container', {
                                    loop: true,
                                    autoplayDisableOnInteraction: false,
                                    autoplay: 3000,
                                    spaceBetween: 30,
                                    effect: 'fade',
                                    pagination: '.swiper-pagination',
                                    paginationClickable: true
                                });
                            }, 10);
                        }, 0);
                    };
                    Service.get('/zjxxw/api/activity/' + activityId, null, success);
                } else {
                    //self.initPage();
                }
            },
            /**
             * 管理者登录时 添加活动通知
             */
            activityNotify: function () {
                // $('.addNotify').css('display','block');
            },
            /**
             * 管理者登录时 删除评论
             */
            deleteComment: function (id) {
                var self = this;
                Service.get('/zjxxw/api/activity/comment/' + id + '/delete', null, function (res) {
                    if (res.resultCode == 0) {
                        self.discussList();
                    } else {
                        Dialog.confirm('删除失败');
                    }

                });
            },
            /**
             * 用户没有登录时点击我要参加
             */
            uncttend: function () {
                Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
            },
            /**
             * 登录过点击我要参加
             */
            cttend: function (id, event) {
                var self = this;
                if (loginStatus) {
                    if (self.attend.status == 1) {
                        self.attend.activityId = activityId;
                        var success = function (result) {
                            if (result.resultCode == 0) {
                                self.$modal.confirm('参加成功', null, 1);
                                self.attend.status = 0;
                                Vue.nextTick(self.upload);
                                // $('.activityStatus').css('display', 'none');
                                // $('.cancleStatus').css('display', 'block');
                            } else if (result.resultCode == -1) {
                                self.$modal.confirm(result.message, null, 1);
                            }
                        };
                        Service.post('/zjxxw/api/activityuser/join/', this.attend, success);
                    } else if (self.attend.status == 0) {
                        self.attend.activityId = id;
                        var success = function (result) {
                            if (result.resultCode == 0) {
                                self.$modal.confirm('已取消', null, 1);
                                self.attend.status = 1;
                                // $('.activityStatus').css('display', 'block');
                                // $('.cancleStatus').css('display', 'none');
                            } else if (result.resultCode == -1) {
                                self.$modal.confirm(result.message, null, 1);
                            }
                        };
                        Service.post('/zjxxw/api/activityuser/join/', this.attend, success);
                    }
                } else {
                    Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
                }

            },
            /**
             * 判断用户是否参加当前活动
             */
            userActivityStatus: function () {
                if (loginStatus) {
                    var self = this;
                    this.attend.activityId = activityId;
                    var success = function (result) {
                        var activityUser = result.data;
                        if (activityUser.activityId != null) {
                            self.attend.status = 0;
                            Vue.nextTick(self.upload);
                            // $('.activityStatus').css('display', 'none');
                            // $(".cancleStatus").css('display', 'block');
                        }
                    };
                    Service.get('/zjxxw/api/activityuser/' + self.attend.activityId, null, success);
                }
            },
            /*
             * 控制上传
             * */
            upload: function () {
                var self = this;
                $.fcup({
                    updom: '.upload_photo',
                    upurl: '/upfile',
                    upstr: '上传图片',
                    upfinished: '上传图片',
                    acceptType: 'img',
                    upcallback: function (res) {
                        if (res.resultCode == 0) {
                            Service.postBody('/zjxxw/api/activity/resource/update', {
                                url: res.url,
                                type: 2,
                                title: res.filename,
                                activityId: activityId
                            }, function (result) {
                                if (result.resultCode == 0) {
                                    self.$modal.confirm("已提交审核", null, 1);
                                } else {
                                    self.$modal.confirm('上传失败', null, 1);
                                }
                            });
                        } else {
                            self.$modal.confirm('上传失败', null, 1);
                        }
                    }
                });
            },

            /**
             * 轮播图部分
             */
            getImageInfo: function () {
                var self = this;
                var success = function (result) {
                    self.image_list = result.data;
                    setTimeout(function () {
                        var canAni = true;
                        var oPic = $('#slider_pic').find('ul');
                        var oImg = oPic.find('li');
                        var oLen = oImg.length;
                        var oLi = oImg.width();
                        var prev = $("#prev");
                        var next = $("#next");
                        oPic.width(oLen * 177);//计算总长度
                        var iNow = 0;
                        var maxTick = Math.floor($("#slider_pic ul").width() / $("#slider_pic").width());
                        var iTimer = null;
                        prev.off('click', reduce);
                        next.off('click', plus);
                        prev.on('click', reduce);
                        next.on('click', plus);

                        function plus() {
                            if (canAni) {
                                canAni = false;
                                if (iNow < maxTick) {
                                    iNow++;
                                }
                                clickScroll();
                            }

                        };

                        function reduce() {
                            if (canAni) {
                                canAni = false;
                                if (iNow > 0) {
                                    iNow--;
                                }
                                clickScroll();
                            }
                        }

                        function clickScroll() {
                            iNow == 0 ? prev.addClass('no_click') : prev.removeClass('no_click');
                            iNow == maxTick ? next.addClass("no_click") : next.removeClass("no_click");
                            oPic.animate({left: -iNow * ($("#slider_pic").width() + 2)});
                            canAni = true;
                        }
                    }, 1000);
                };
                Service.get('/zjxxw/api/activity/resource/' + activityId + '/list', null, success);
            }
            ,
            /**
             * 提交活动评论
             */
            submitContent: function (event) {
                var self = this;

                var data = {
                    content: this.tlcontent,
                    parentId: this.dataModel.id,
                    commentId: '',
                    loading: true
                };
                if (!data.content) {
                    this.$modal.warn("请输入内容！");
                    return;
                }
                if (Utils.getStrLength(data.content) > 1000) {
                    this.$modal.confirm('评论字数不能超过500', null, 1);
                    return;
                }
                var self = this;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.$modal.removeLoad({parEle: '.discuss'});
                        self.tlcontent = '';
                        self.discussList();
                        self.tlcontent = '';
                        document.querySelector("#showLen").innerText = 0;
                    }
                };
                Service.postBody('/zjxxw/api/activity/comment/update/', data, success);
            },

            /**
             * 用户没有登录时提交活动评论
             */
            unsContent: function () {
                Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
            },
            /**
             * 活动评论列表
             */
            discussList: function () {
                var self = this;
                if (!isNull(activityId) && !activityId.isEmpty()) {
                    var self = this;
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.pageTotal = Math.ceil(result.page.rowCount / result.page.pageSize);
                            if (self.pageNo > 1) {
                                self.discuss_list = self.discuss_list.concat(result.data);
                            } else {
                                self.discuss_list = result.data;
                            }
                        }
                    };
                    Service.get('/zjxxw/api/activity/comment/' + activityId + '/activitylist', {pageNo: this.pageNo}, success);
                }
            },
            //活动列表分页
            getMoreComment: function () {
                if (this.pageNo < this.pageTotal) {
                    this.pageNo++;
                    this.discussList();
                }
            },

            /**
             * 点击回复活动信息
             */
            reply: function (id, creatorName, contentl, event) {
                var self = this;
                $(event.target).parents('.discussion-text').siblings('.ceing').css("display", "block").children('textarea').focus().val('').siblings('.submit').click(function () {
                    /**
                     * 点击提交信息
                     */
                    self.discuss.content = $(event.target).parents('.author').siblings('.ceing').children('textarea').val();
                    self.discuss.commentId = id;
                    self.discuss.parentId = self.dataModel.id;
                    var success = function (result) {
                        $(event.target).parents('.author').siblings('.ceing').children('textarea').val('');
                        $(event.target).parents('.author').siblings('.ceing').css("display", "none");
                        self.discussList();
                    };
                    Service.postBody('/zjxxw/api/activity/comment/update/', self.discuss, success);
                    var scroll_offset = $("#activity_photo").offset();
                    $("body,html").animate({
                        scrollTop: scroll_offset.top //让body的scrollTop等于.discussion_list的top，就实现了滚动
                    }, 1000);
                });
                $(event.target).parents('.author').siblings('.ceing').children('textarea').focus().siblings('.cancle').click(function () {
                    $(event.target).parents('.author').siblings('.ceing').css("display", "none");
                });
            },
            getHotActiList: function () {
                var self = this;
                var success = function (result) {
                    self.activity = result.data;
                };
                Service.get('/zjxxw/api/activity/ranking/5', {typeId: ''}, success);
            },
            setTlcontent: function (val) {
                this.tlcontent = val;
            }
        },
        components: {
            'sc': function (res, rej) {
                require([__uri('/web/html/_layout_/sc/sc.js?v')], res);
            }
        },
        created: function () {
            this.getActivityInfo();
            this.getImageInfo();
            this.discussList();
            this.userActivityStatus();
            this.getHotActiList();
        },
        mounted: function () {
            // if ($("#commentText").length > 0) {
            //     Utils.controlEleLen('commentText', 'showLen');
            // }
        }
    });
    return classManage;
});