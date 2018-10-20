/**
 * 我的课程
 */
define(['Pagination'], function () {
    var myHw = Vue.component('myHw', {
        template: __inline("./index.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                myCourses: {},
                pageNo: 1,
                pageSize: 10,
                homeWorkList: [],
                pageContro: '',
                kcList: [],
                keyword: ""
            }
        },
        methods: {
            getList: function (page) {
                var self = this;
                self.pageNo = page ? page : self.pageNo;
                var search = {
                    name: this.keyword,
                    pageNo: self.pageNo,
                    pageSize: self.pageSize,
                    kcid: this.course.id,
                    lx: 1,
                    role: 'student'
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.homeWorkList = result.data;
                        setTimeout(setfootDet,0)
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        if (self.pageNo == 1) {
                            self.pageContro.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                }
                Service.postBody('/jxxt/api/course/homework/list', search, success)
            },
            // getKcList:function(){
            //     var self = this;
            //     var success = function (ret) {
            //         if(ret.success){
            //             self.kcList = ret.data
            //         }
            //     }
            //     Service.postBody('/jxxt/api/course/homework/getKcByXyId',null,success)
            // },
            getChapterListByCourseId: function (id) {
                var self = this;
                var success = function (ret) {
                    if (ret.success) {
                        if (ret.data.length > 0) {
                            self.zjList = ret.data
                        }
                    }
                }
                Service.get('/jxxt/api/admin/chapter/getChapterListByCourseId/' + id, null, success);
            },
            //改变ul中的值
            changeValue: function (event, id) {
                var liobj = event.target;
                $('#' + id).html(liobj.innerText + '<span class="caret"></span>')
                $('#' + id).attr('value', $(liobj).attr('value'))
            },
            //回车搜索
            keyEnter: function (event) {
                var self = this;
                self.getList();
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                self.pageContro = new Pagination({
                    container: $('.hwmanagement_page'),//必填
                    pageTotal: 0,//必填，此处默认为0
                    callback: function (page) {//点击分页后的回调函数
                        self.getList(page);
                    }
                });
            },
        },
        created: function () {
            var self = this;
            this.course = this.$store.getters.getCourse();
            if (this.course.id) {
                this.getList()
            } else {
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.getList()
                })
            }
        },
        mounted: function () {
            this.pagination();
        }
    });
    return myHw;
});