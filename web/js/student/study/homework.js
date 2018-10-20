/**
 * 我的课程
 */
define( ['../menu.js','Pagination'], function (menu) {
    menu.init();
    new Vue({
        el: ".page",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                myCourses: {},
                pageNo: 1,
                pageSize: 10,
                homeWorkList: [],
                pageContro: '',
                kcList: [],
                kcid: ''
            };
        },
        methods: {
            getList: function (page) {
                var self = this;
                self.pageNo = page ? page : self.pageNo;
                var search = {
                    name: $('#searchName').val(),
                    pageNo: self.pageNo,
                    pageSize: self.pageSize,
                    kcid: this.kcid,
                    lx: 1,
                    role: 'student',
                    loading:true
                };
                var success = function (result) {
                    if (result.success) {
                        self.homeWorkList = result.data;
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        if (self.pageNo ===1) {
                            self.pageContro.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                Service.postBody('/jxxt/api/course/homework/list', search, success);
            },
            getKcList: function () {
                var self = this;
                var success = function (ret) {
                    if (ret.success) {
                        self.kcList = ret.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/myCourseList', null, success);
            },
            getChapterListByCourseId: function (id) {
                var self = this;
                var success = function (ret) {
                    if (ret.success) {
                        if (ret.data.length > 0) {
                            self.zjList = ret.data;
                        }
                    }
                };
                Service.get('/jxxt/api/admin/chapter/getChapterListByCourseId/' + id, null, success);
            },
            //改变ul中的值
            changeValue: function (event, id) {
                var liobj = event.target;
                $('#' + id).html(liobj.innerText + '<span class="caret"></span>');
                $('#' + id).attr('value', $(liobj).attr('value'));
            },
            //回车搜索
            keyEnter: function (event) {
                var self = this;
                //console.log(event.keyCode)
                if (event.keyCode === 13) {
                    self.getList();
                }
                if (event.keyCode === 8) {
                    if ($('#searchName').val().length === 1) {
                        $('#searchName').val('');
                        self.getList();
                    }
                }
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                self.pageContro = new Pagination({
                    container: $(".hwmanagement_page"),//必填
                    pageTotal: 0,//必填，此处默认为0
                    callback: function (page) {//点击分页后的回调函数
                        self.getList(page);
                    }
                });
            },
        },
        created: function () {
            window.loading();
            this.getList();
            this.getKcList();
        },
        mounted: function () {
            this.pagination();
        }
    });
});