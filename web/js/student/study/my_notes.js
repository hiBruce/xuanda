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
                myNotes: [],
                myCourses: [],
                rows_ks: [],
                select_kc: "",//选中的课程
                select_ks: "",//选中的章节
                keyword: '',//搜索关键字
                pageNo: 1,
                pageCount: 10,
                orderBy: 'DCjsj',
                orderByDirection: 'desc',
                notesCount: 0,
                xykc: {}
            };
        },
        methods: {
            /**
             * 加载我的课程
             */
            loadMyCourses: function () {
                var self = this;
                var success = function (result) {
                    self.myCourses = result.data;
                };
                Service.get('/jxxt/api/admin/course/myCourseList', null, success);
            },
            loadMyNotes: function (pageNo, orderBy, orderByDirection) {
                var self = this;
                self.pageNo = pageNo ? pageNo : self.pageNo;
                var data = {
                    pageNo: self.pageNo,
                    pageCount: self.pageCount,
                    courseId: this.select_kc.ckcid,
                    chapterId: this.select_ks,
                    name: this.keyword,
                    orderBy: orderBy || this.orderBy,
                    orderByDirection: orderByDirection || this.orderByDirection,
                    loading: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.myNotes = result.data;
                        self.notesCount = result.page.rowCount;
                        //拿到分页信息，将总页码传入分页组件，更新页码
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        if (self.pageNo === 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.get('/jxxt/api/course/notes/myNotes', data, success);
            },
            loadKs: function (courseId) {
                var self = this;
                var success = function (result) {
                    self.rows_ks = result.data;
                };
                Service.get('/jxxt/api/admin/chapter/getChapterListByCourseId/' + courseId, null, success);
            },
            ChangeOrder: function (order) {
                if (this.orderBy === order) {
                    this.orderByDirection = (this.orderByDirection === 'asc') ? 'desc' : 'asc';
                } else {
                    this.orderBy = order;
                    this.orderByDirection = 'desc';
                }
                this.loadMyNotes(1, this.orderBy, this.orderByDirection);
            },
            scbj: function (note) {
                var self = this;
                self.$modal.confirm("确定要删除吗？", function () {
                    Service.get("/jxxt/api/course/notes/delNote", {noteid: note.id}, function (result) {
                        if (result.success) {
                            self.$modal.success("删除成功！");
                            self.loadMyNotes(1);
                        } else {
                            self.$modal.error(result.message);
                        }
                    });
                });
            },
            reset: function () {
                this.select_kc = '';
                this.select_ks = '';
                this.keyword = '';

            }
            ,
            /**
             * 分页
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".my-note-page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.loadMyNotes(page);
                    }
                });
            }

        },
        watch: {
            'select_kc':

                function (newVal) {
                    this.select_ks = '';
                    this.xykc = newVal;
                    this.loadKs(newVal.ckcid);
                    this.loadMyNotes(1);
                }
        },
        created: function () {
            // window.loading();
            this.loadMyNotes();
            this.loadMyCourses();
        },
        mounted: function () {
            this.pageInit();
        }
    });
    return classManage;
});