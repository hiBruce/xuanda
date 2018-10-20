/**
 * 我的课程
 */
define(['../menu.js',"Pagination"], function (menu) {
    menu.init();
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                pagelit: '',
                ggList: [],
                bjList: [],
                kcList: [],
                result: {},
                gg: {},
                tabNum: 1,
                ggLx: 1,
                bjId: '',
                kcId: '',
                tempStaging: "", //暂存编辑内容
                pageNo: 1
            };
        },
        methods: {
            /**
             * 加载公告
             */
            getGgList: function (page) {
                var self = this;
                self.pageNo = page ? page : self.pageNo;
                var data = {
                    pageNo: self.pageNo,
                    pageSize: 20,
                    loading: true,
                    // bjId: self.ggLx == 2 ? self.bjId : '',
                    kcId: self.ggLx === 1 ? self.kcId : ''
                    // lx: self.ggLx
                };
                var success = function (result) {
                    if (result.success) {
                        self.ggList = result.data;
                        //拿到分页信息，将总页码传入分页组件，更新页码
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        if (self.pageNo === 1) {
                            self.pagelit.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.get('/jxxt/api/admin/gg/xsgg', data, success);
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
                        self.getGgList(page);
                    }
                });
            },
            /**
             * 获取我管理的班级列表
             */
            loadBjList: function () {
                var self = this;
                var success = function (result) {
                    if (result.success) {
                        self.bjList = result.data;
                    }
                };
                Service.get("/jwxt/admin/bj/myClassList", null, success);
            },
            /**
             * 获取我管理的课程列表
             */
            loadKcList: function () {
                var self = this;
                var success = function (result) {
                    if (result.success) {
                        self.kcList = result.data;
                    }
                };
                Service.get("/jxxt/api/admin/course/myCourseList", null, success);
            },
            /**
             * 切换班级
             * @param bjId
             */
            changeBj: function (bjId) {
                this.bjId = bjId;
                this.getGgList(1);
            },
            /**
             * 切换课程
             * @param bjId
             */
            changeKc: function (kcId) {
                this.kcId = kcId;
                this.getGgList(1);
            },
            /*
             * tab切换
             * */
            loadGgList: function (lx) {
                this.tabNum = lx;
                this.ggLx = lx;
                this.getGgList();
            }
        },
        created: function () {
            // window.loading();
            this.getGgList();
            this.loadBjList();
            this.loadKcList();

        },
        mounted: function () {
            this.pagination();

        }

    });

    return classManage;
});