import page from "Pagination";
mod.score_trace = Vue.component('score_trace', {
    template: __inline("/web/html/teacher/learning_trace/score_trace/score_trace.html"),
    data: function () {
        return {
            bjCjList: [],
            kcList: [],
            bjMc: '',
            kcId: '',
            pageNo: 1,
            course: {},
        };
    },
    methods: {
        /**
         * 获取班级成绩列表
         */
        getBjCjList: function (page) {
            var self = this;
            self.pageNo = page ? page : self.pageNo;
            var data = {
                bjMc: self.bjMc,
                kcId: self.kcId,
                pageNo: self.pageNo,
                pageSize: 10,
                loading: true
            };
            var success = function (result) {
                if (result.success) {
                    self.bjCjList = result.data;
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    if (self.pageNo == 1) {
                        self.pagelit.upDate({
                            pageTotal: pageTotal
                        });
                    }
                }
            };
            Service.get("/jxxt/api/admin/xykctj/kcBjCj", data, success);
        },
        ckxycj: function (bjcj, type) {
            if (!bjcj.tjsj) {
                this.$modal.warn("该课程尚未统计学生成绩，无法查看！")
                return;
            }
            if (!bjcj.bjrs) {
                this.$modal.warn("该班级下没有学员，无法查看！")
                return;
            }
            location.href = '/ucenter/score_class/score_search?bjId=' + bjcj.bjId + '&bjMc=' + bjcj.bjMc + '&kcId=' + bjcj.kcId + '&kcMc=' + bjcj.kcMc + '&type=' + type;
        },
        /**
         * 加载我管理的课程
         */
        loadMyManageCourseList: function () {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.kcList = result.data;
                    if (self.kcList.length > 0 && !self.kcId)
                        self.kcId = self.kcList[0].id;
                    self.getBjCjList(1);
                }
            };
            Service.get('/jxxt/api/admin/course/myManageCourseList', null, success);
        },
        selectKc: function () {
            this.bjId = '';
            this.getBjCjList(1);
        },
        /**
         * 重置搜索
         */
        restSearch: function () {
            this.xyMc = '';
            this.kcId = this.kcList[0].id;
            this.getBjCjList();
        },
        /**
         * 重新统计
         */
        restStatistics: function () {
            var self = this;
            if (self.kcId) {
                var data = {
                    name: self.xyMc,
                    kcId: self.kcId
                };
                Service.get("/jxxt/api/admin/xykctj/tjKcCj", data);
                self.$modal.success("正在统计中！统计可能需要些时间，请稍后查询统计结果");
            } else {
                self.$modal.error("请选择想要统计的课程，选择后再点击统计成绩按钮！");
            }
        },
        /**
         * 导出成绩
         */
        exportCj: function () {
            var self = this;
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/class/modal/export_file.js?v'),
                excelUrl: "",
                width: 400,
                height: 400,
                kcId: self.kcId,
                type: 0,
                title: '导出班级成绩'
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
                    self.getBjCjList(page);
                }
            });
        }
    },
    created: function () {
        window.loading();
        if (window.URL.getParameter('kcId'))
            this.kcId = window.URL.getParameter('kcId');
    },
    mounted: function () {
        this.pagination();
        this.loadMyManageCourseList();
    }
});
