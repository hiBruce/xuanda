import page from "Pagination";
mod.study_trace = Vue.component('study_trace', {
    template: __inline("/web/html/teacher/learning_trace/study_trace/study_trace.html"),
    data: function () {
        return {
            xyKcList: [],
            bjList: [],
            kcList: [],
            xyMc: '',
            bjId: '',
            kcId: '',
            pagelit: ''
        };
    },
    methods: {
        /**
         * 获取学员课程列表
         */
        getXyKcList: function (pageNo) {
            var self = this;
            var pageNo = pageNo || 1;
            var data = {
                name: self.xyMc,
                bjId: self.bjId,
                kcId: self.kcId,
                pageNo: pageNo,
                pageSize: 10,
                loading: true
            };
            var success = function (result) {
                if (result.success) {
                    self.xyKcList = result.data;
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    if (pageNo == 1) {
                        self.pagelit.upDate({
                            pageTotal: pageTotal
                        });
                    }
                }
            };
            Service.get("/jxxt/api/admin/xykctj/getJd", data, success);
        },
        /**
         * 我管理的班级列表
         */
        getMyManagerBjList: function () {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.bjList = result.data;
                }
            };
            Service.get("/jxxt/api/course/bj/bjList", {kcId: this.kcId}, success);
        },
        /**
         * 加载我管理的课程
         */
        loadMyManageCourseList: function () {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.kcList = result.data;
                    if (self.kcList.length > 0)
                        self.kcId = self.kcList[0].id;
                    self.getMyManagerBjList();
                    self.getXyKcList(1);
                } else {

                }
            };
            Service.get('/jxxt/api/admin/course/myManageCourseList', null, success);
        },
        selectKc: function () {
            this.bjId = '';
            this.getMyManagerBjList();
            this.getXyKcList(1);
        },
        /**
         * 重置搜索
         */
        restSearch: function () {
            this.xyMc = '';
            this.bjId = '';
            this.kcId = this.kcList[0].id;
            this.getXyKcList();
        },
        /**
         * 重新统计
         */
        restStatistics: function () {
            var self = this;
            var data = {
                name: self.xyMc,
                bjId: self.bjId,
                kcId: self.kcId
            };
            Service.get("/jxxt/api/admin/xykctj/tjKcJd", data);
            this.$modal.success("正在统计中！统计可能需要些时间，请稍后查询统计结果！");
        },
        /**
         * 导出进度
         */
        exportJd: function () {
            var self = this;
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/class/modal/export_file.js?v'),
                excelUrl: "",
                width: 400,
                height: 400,
                kcList: self.kcList,
                kcId: self.kcId,
                bjId: self.bjId,
                type: 2,
                title: '导出课程学习进度'
            })
        },
        downloadExcel: function (excelUrl) {
            //弹出导入框
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/class/modal/export_file.js?v'),
                excelUrl: excelUrl,
                width: 400,
                title: '下载导出文件'
            })
        },
        /**
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            this.pagelit = new Pagination({
                container: $(".xscj_page"),
                pageTotal: 0,//必填
                callback: function (page) {//点击分页后的回调函数
                    self.getXyKcList(page);
                }
            });
        }
    },
    created: function () {
        window.loading()
    },
    mounted: function () {
        this.pagination();
        this.loadMyManageCourseList();
    }
});
