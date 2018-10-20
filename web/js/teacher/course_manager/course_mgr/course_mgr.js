import page from "Pagination";
mod.course_mgr = Vue.component('course_mgr', {
    template: __inline("/web/html/teacher/course_manager/course_mgr/course_mgr.html"),
    data: function () {
        return {
            pageNo: 1,
            myManageCourses: [],
            showTab: false,
            errMessage: [],
            kcmc: ''
        };
    },
    methods: {
        /**
         * 加载我管理的课程
         */
        loadMyManageCourses: function (page) {
            var self = this;
            var pageNo = page ? page : self.pageNo;
            var data = {
                pageNo: pageNo,
                pageSize: 20,
                isPackage: self.showTab ? 1 : 0,
                loading: true,
                kcmc: self.kcmc
            };
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.myManageCourses = result.data;
                    //拿到分页信息，将总页码传入分页组件，更新页码
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    if (pageNo == 1) {
                        self.pageCon.upDate({
                            pageTotal: pageTotal
                        });
                    }
                }
            };
            Service.get('/jxxt/api/admin/course/myManageCourses', data, success);
        },
        pageInit: function () {
            var self = this;
            this.pageCon = new Pagination({
                container: $(".manage_course_page"),
                pageTotal: 0,
                callback: function (page) {
                    self.loadMyManageCourses(page);
                }
            });
        },
    },
    created: function () {
        this.loadMyManageCourses();
    },
    mounted: function () {
        this.pageInit();
    },
});
