/**
 * 我的管理的班级
 */
define(['Pagination'], function () {
    var bjtl = Vue.component('bjtl', {
        template: __inline('./bjtl.html'),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                course: {},
                pageNo: 1,
                bj: {},
                tlqList: [],
                tl: {},//讨论
                tlHf: '',//评论回复
                editFlag: '',
                orderBy: 't.cjsj',
                orderByDirection: 'desc',
                tlsl: 0,
            };
        },
        methods: {
            /**
             * 获取列表
             * @param page
             */
            getTlqList: function (page) {
                var self = this;
                self.pageNo = page ? page : self.pageNo;
                var data = {
                    pageNo: self.pageNo,
                    pageSize: 10,
                    bjId: self.bj.id,
                    kcId: self.course.id,
                    orderBy: self.orderBy,
                    orderByDirection: self.orderByDirection,
                    loading: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.tlqList = result.data;
                        $(".reply_area").css("display", 'none');
                        self.tlHf = '';
                        self.tlsl = result.page['rowCount'];
                        if (self.pageNo == 1) {
                            var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                            self.pagelit.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.get("/jxxt/api/admin/tlq/list", data, success);
            },
            getMyClass: function () {
                var self = this;
                var data = {
                    kcId: this.course.id,
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.bj = result.data;
                        self.getTlqList(1);
                    } else {
                        self.$modal.error(result.message);
                    }
                }
                Service.get('/jxxt/api/course/bj/myClass', data, success);
            },
            /**
             * 删除
             * @param tl
             */
            sctl: function (tl) {
                var self = this;
                self.$modal.confirm('确定要删除吗？', function () {
                    Service.get('/jxxt/api/admin/tlq/delete', {id: tl.id}, function (result) {
                        if (result.resultCode == 0) {
                            self.$modal.success('删除成功！');
                            self.getTlqList(self.pageNo);
                        } else {
                            self.$modal.error(result.message);
                        }
                    });
                });
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                this.pagelit = new Pagination({
                    container: $(".hot-group-page"),//必填
                    pageTotal: 0,//必填
                    callback: function (page) {//点击分页后的回调函数
                        self.getTlqList(page);
                    }
                });
            },
            /**
             * 隐藏/显示评论输入框
             */
            eidtPl: function (id) {
                if ($("#" + id).css('display') == 'block') {
                    $("#" + id).css('display', 'none');
                } else {
                    $(".reply_area").css("display", 'none');
                    $("#" + id).css('display', 'block');
                }
            },
            /**
             * 提交讨论回复
             * @param pid
             */
            submitTlHf: function (pl) {
                var self = this;
                var data = {
                    pid: pl.id,
                    nr: self.tlHf,
                    kcId: pl.kcId,
                    kcMc: pl.kcMc,
                    bjId: pl.bjId,
                    bjMc: pl.bjMc,
                    hfUserId: pl.userId,
                    hfUserName: pl.username,
                };
                if(!this.tlHf.trim()){
                    this.$modal.warn("请填写评论内容！")
                    return;
                }
                var success = function (result) {
                    if (result.success) {
                        self.getTlqList(self.pageNo);
                    }
                };
                Service.postBody("/jxxt/api/admin/tlq/update", data, success);
            },
            /**
             * 提交讨论
             * @param pid
             */
            submitTl: function () {
                var self = this;
                var data = self.tl;
                var success = function (result) {
                    self.result = result;
                    if (result.success) {
                        self.closeModal("creat_tlq");
                    }
                    self.showModal("message");
                    self.getTlqList();
                    self.tl = {};
                };
                Service.postBody("/jxxt/api/admin/tlq/update", data, success);
            },
            ChangeOrder: function (order) {
                if (this.orderBy == order) {
                    this.orderByDirection = (this.orderByDirection == 'asc') ? 'desc' : 'asc';
                } else {
                    this.orderBy = order;
                    this.orderByDirection = 'desc';
                }
                this.getTlqList(1);
            },
            showModal: function () {
                var self = this;
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/course/detail/modal/bjgl/cjtl.js'),//必填
                    //cancelcb: this.test,//点击关闭时的回调，如没有则不填
                    title: "创建讨论",//必填
                    width: "768",//必填
                    course: self.course,
                    bj: self.bj,
                    cb: self.getTlqList,
                });
            },
            closeModal: function (name) {
                if (name === 'all') {
                    $(".modal_wrap").hide();
                } else {
                    $("#modal_" + name).hide();
                }
            }
        },
        created: function () {
            var self = this;
            this.course = this.$store.getters.getCourse();
            this.learningStatus = this.$store.getters.getLearnStatus();
            if (this.course.id && this.learningStatus.id) {
                self.getMyClass();
            } else {
                var self = this;
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.learningStatus = data.learningStatus;
                    self.getMyClass();
                })
            }
        },
        mounted: function () {
            this.pagination();
        },
    });
    return bjtl;
});