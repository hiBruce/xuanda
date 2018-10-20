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
                dyList: [],
                row: [],
                kcList: [],
                zjList: [],
                hfzt: '',
                pageNo: 1,
                select_kc: "",//选中的课程
                select_ks: "",//选中的章节
                xykc: {}
            };
        },
        methods: {
            getList: function (page) {
                var self = this;
                var pageNo = page ? page : self.pageNo;
                var data = {
                    kcId: self.select_kc.ckcid,
                    ksid: self.select_ks,
                    hfzt: self.hfzt,
                    role: 'student',
                    pageNo: pageNo,
                    loading: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.dyList = result.data;
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        if (pageNo ===1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.postBody('/jxxt/api/course/ksdy/list', data, success);
            },
            /**
             * 获取所学课程
             */
            getKcList: function () {
                var self = this;
                var success = function (ret) {
                    if (ret.success) {
                        self.kcList = ret.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/myCourseList', null, success);
            },
            /**
             * 获取课时
             * @param id
             */
            getChapterListByCourseId: function (id) {
                var self = this;
                var success = function (ret) {
                    if (ret.success) {
                        if (ret.data.length > 0) {
                            self.zjList = ret.data;
                        } else {
                            self.zjList = [];
                        }
                    }
                };
                Service.get('/jxxt/api/admin/chapter/getChapterListByCourseId/' + id, null, success);
            },
            /**
             * 删除答疑
             * @param dy
             */
            scdy: function (dy) {
                var self = this;
                self.$modal.confirm("确定要删除吗？", function () {
                    Service.get("/jxxt/api/course/ksdy/delete", {id: dy.id}, function (result) {
                        if (result.success) {
                            self.getList(1);
                            self.$modal.success("删除成功！");
                        } else {
                            self.$modal.error(result.message);
                        }
                    });
                });
            },
            /*
             * 展示回复弹框
             * 参数：不带modal_的页面名称
             * */
            showModal: function (row) {
                var self = this;
                self.row = row;
                this.$modal.show(this, {
                    templateURL: '/web/v/ucenter/question/modal_wddy.js',//必填
                    method: this.getList,
                    row: this.row,
                    title: "回复"//必填
                });
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".question_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getList(page);
                    }
                });
            }
        },
        watch: {
            'select_kc': function (newVal) {
                this.select_ks = '';
                this.xykc = newVal;
                this.getChapterListByCourseId(newVal.ckcid);
                // this.getList();
            },
            'hfzt': function () {
                this.getList(1);
            }
        },
        created: function () {
            // window.loading();
            var self = this;
            self.getList();
            self.getKcList();
        },
        mounted: function () {
            this.pageInit();
        }
    });
    return classManage;
});