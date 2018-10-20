/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(['fcup', 'Pagination'], function () {
    var notes = Vue.component('notes', {
        template: __inline("./index.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                orderBy: 'DCjsj',
                orderByDirection: 'desc',
                notes: [],
                addNote: 0,
                courseChapters: [],
                pageNo: 1
            }
        },
        components: {
            'addnote': function (res, rej) {
                require([__uri('/web/v/course/createNote.js?v')], res);
            },
            'sc': function (res, rej) {
                require(['/web/html/_layout_/sc/sc.js'], res);
            }
        },
        methods: {
            ChangeOrder: function (order) {
                if (this.orderBy == order) {
                    this.orderByDirection = (this.orderByDirection == 'asc') ? 'desc' : 'asc';
                } else {
                    this.orderBy = order;
                    this.orderByDirection = 'desc';
                }
                ;
                this.notes = [];
                this.getNotes(1, this.orderBy, this.orderByDirection);
            },
            addNotesBtn: function () {
                //Dialog.openDialog("/course/notes/create_notes","新增笔记");
                this.addNote = 1;
            },
            getNotes: function (pageNo, orderBy, orderByDirection) {
                var self = this;
                this.notes = [];
                self.pageNo = pageNo ? pageNo : self.pageNo;
                var params = {
                    pageNo: self.pageNo,
                    orderBy: orderBy || this.orderBy,
                    orderByDirection: orderByDirection || this.orderByDirection,
                    loading: true
                }
                Service.get('/jxxt/api/admin/course/' + this.course.id + '/notes', params, function (result) {
                    if (result.resultCode == 0) {
                        self.notes = result.data;
                        setTimeout(setfootDet, 0)
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        if (self.pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                    }
                })
            },
            //获取目录
            getOutline: function () {
                var self = this;
                Service.get('/jxxt/api/admin/course/' + this.course.id + '/outline', null, function (res) {
                    if (res.resultCode == '0') {
                        self.courseChapters = res.data;
                    }
                })
            },
            closeNotes: function () {
                this.addNote = 0;
            },
            addNoteCb: function () {
                this.addNote = 0;
                this.getNotes();
            },
            scbj: function (note) {
                var self = this;
                self.$modal.confirm("确定要删除吗？", function () {
                    Service.get("/jxxt/api/course/notes/delNote", {noteid: note.id}, function (result) {
                        if (result.resultCode == 0) {
                            self.$modal.success("删除成功！");
                            self.getNotes(self.pageNo);
                        } else {
                            self.$modal.error(result.message);
                        }
                    })
                })
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".page-info"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getNotes(page);
                    }
                })
            },
        },
        created: function () {
            var self = this;
            this.course = this.$store.getters.getCourse();
            if (this.course.id) {
                this.getNotes();
            } else {
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.getNotes();
                })
            }
        },
        mounted: function () {
            this.pageInit();
        },
    });
    return notes;
});
