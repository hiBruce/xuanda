define(['./menu.js', 'Pagination'], function (menu) {
    menu.init();
    var app = new Vue({
        el: "#app",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                pageNo: 1,
                index: 0,
                // 页面数据模型
                rows: [],
                dtxxRows: [],
                visitRows: [],
                appmsgRows: [],
                showAppmsgLoadMore: false,
                appMsgPageNo: 1,
                signDay: 0,
                signed: true,
                getBack:false
            }
        },
        methods: {
            /**
             * 获取列表
             */
            list: function () {
                var self = this;
                var data = {
                    pageNo: self.pageNo
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.rows = result.data;
                    }
                };
                Service.get('/zjxxw/api/archives/classify/listAndChecked', data, success);
            },
            /**
             * 动态信息列表
             */
            dtxxList: function (type, page) {
                var self = this;
                self.index = type;
                self.pageNo = page ? page : self.pageNo;
                var data = {
                    pageNo: self.pageNo,
                    type: type
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.dtxxRows = result.data;
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        if (self.pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                    }
                };
                Service.get('/zjxxw/api/dynamicInfo/getAllDynamicInfos', data, success);
            },
            /**
             * 访问记录
             */
            visitList: function () {
                var self = this;
                var data = {
                    pageNo: 1,
                    type: 5
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.visitRows = result.data;
                    }
                };
                Service.get('/zjxxw/api/dynamicInfo/getAllDynamicInfos', data, success);
            },
            getSignIn: function () {
                //签到
                var self = this;
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.getBack = true
                        if (result.message == "already") {
                            self.signed = false;
                        }
                        self.signDay = result.data
                    }
                };
                Service.get('/zjxxw/api/admin/study/getSignIn', null, success);
            },
            signIn: function () {
                if (this.signed) {
                    //签到
                    var self = this;
                    var success = function (result) {
                        if (result.resultCode == "0") {
                            if (result.message == "already") {
                                self.signDay = result.data;
                                Dialog.confirm("今日已经签到！");
                                self.signed = false;
                            } else {
                                self.signDay = result.data;
                                self.signed = false;
                                // Dialog.confirm("签到成功！");
                            }
                        } else {
                            Dialog.confirm("签到失败！");
                        }
                    };
                    Service.get('/zjxxw/api/admin/study/signIn', null, success);
                }
            },
            /**
             * 应用消息
             */
            appmsgList: function (pageNo) {
                var self = this;
                var data = {
                    pageNo: this.appMsgPageNo,
                    type: 6
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.appmsgRows = result.data;
                        var pageTotal = Math.ceil(result.page.rowCount / result.page.pageSize);
                        if (pageTotal > self.appMsgPageNo) {
                            self.showAppmsgLoadMore = true
                        } else {
                            self.showAppmsgLoadMore = false
                        }
                    }
                };
                Service.get('/zjxxw/api/dynamicInfo/getAllDynamicInfos', data, success);
            },
            getMoreAppMsg: function () {
                this.appmsgList(++this.appMsgPageNo)
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".dtxx_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.dtxxList(self.index, page);
                    }
                })
            },
        },
        created: function () {
            // this.list();
            this.dtxxList(0);
            this.visitList();
            this.getSignIn();
            this.appmsgList();
        },
        mounted: function () {
            this.pageInit();
        }
    });
});