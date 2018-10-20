import page from "Pagination";
mod.test_trace = Vue.component('test_trace', {
    template: __inline("/web/html/teacher/learning_trace/test_trace/test_trace.html"),
    data: function () {
        return {
            kcRow: [],
            cjList: [],
            searchOptions: {
                zt: 2,//全部
                kcid: '',
                kcnrmc: '',
                kcnrlx: 4
            },
            pageNo: 1
        };
    },
    methods: {
        getcjList: function (page) {
            var self = this;
            self.pageNo = page ? page : self.pageNo;
            var data = {
                pageNo: self.pageNo,
                cj: self.searchOptions,
                zt: 1,
                loading:'.nav-right-content2'
            };
            var success = function (result) {
                if (result.resultCode == "0") {
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    self.cjList = result.data;
                    if (self.pageNo == 1) {
                        self.pageCon.upDate({
                            pageTotal: pageTotal
                        })
                    }
                    setTimeout(setfootDet, 0)
                }
            };
            Service.postBody('/tkksxt/api/admin/cj/list', data, success)
        },
        //获取我管理的课程列表
        wcjdkc: function () {
            var self = this;
            var data = {};
            var success = function (result) {
                if (result.resultCode == "0") {
                    self.kcRow = result.data;
                }
            };
            Service.get('/jxxt/api/admin/course/myManageCourseList', data, success);
        },
        pijuan: function (cj) {
            //批卷
            window.location.href = "/ucenter/perusal_exam?cjid=" + cj.id + "&sjid=" + cj.sjid + "&courseId=" + cj.kcid+ "&chapterId=" + cj.kcnrid;
        },
        chakan: function (cj) {
            //查看试卷
            window.location.href = "/ucenter/view_exam?cjid=" + cj.id + "&sjid=" + cj.sjid + "&courseId=" + cj.kcid+ "&chapterId=" + cj.kcnrid;
        },
        /**
         * 分页
         * @type {Pagination}
         */
        pageInit: function () {
            var self = this;
            this.pageCon = new Pagination({
                container: $(".cj-page"),
                pageTotal: 0,
                callback: function (page) {
                    self.getcjList(page)
                }
            })
        }
    },
    created: function () {
        this.getcjList();
        this.wcjdkc();
    },
    mounted: function () {
        this.pageInit();
    }
});
