/**
 * 我的课程
 */
define(['../menu.js',"Pagination", 'fcup'], function (menu) {
    menu.init();
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                //我的活动数据
                myactivity: [],
                tablistNum: 0,
                pageCon: {}
            };
        },
        methods: {
            /**
             * 我的活动的详细信息
             */
            loadMyActivieies: function (page) {
                var pageNo = page ? page : 1;
                var self = this;
                var success = function (result) {
                    if (result.success) {
                        self.myactivity = result.data;
                        if (pageNo === 1) {
                            var pageTotal = Math.ceil(result.page.rowCount / result.page.pageSize);
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.get('/zjxxw/api/activityuser/activitylist/' + this.tablistNum, {
                    pageNo: pageNo,
                    loading: true
                }, success);
            },
            /**
             * 点击增加点击量
             */
            clickC: function (id) {
                Service.get("/zjxxw/api/activity/" + id + "/clickCount");
            },
            tabList: function (num) {
                this.tablistNum = num;
                this.loadMyActivieies();
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".page-control"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getcjList(page);
                    }
                });
            }

        },
        created: function () {
            window.loading();
            this.loadMyActivieies();
        },
        mounted: function () {
            this.pageInit();
        }

    });
    return classManage;
});