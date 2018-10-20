import page from "Pagination";
mod.my_question_list = Vue.component('my_question_list', {
    template: __inline("/web/html/teacher/question_library/my_question_list.html"),
    data: function () {
        return {
            tabNum: 0,
            wdtkRow: [],
            kcRow: [],
            ggtkRow: [],
            pageNo: 1,
            pageCon: "",
            searchOptions: {
                sfgk: 2,
                lx: 0,
                mc: '',
                kcid: ''
            }
        };
    },
    components: {
        'addtm': mod.addtm,
        'edittm': mod.edittm
    },
    methods: {
        childCb: function () {
            this.$modal.success("保存成功");
            this.wdtkList();
        },
        /*
        * tab切换
        * */
        showTabs: function (num) {
            this.tabNum = num;
        },
        //获取我的题库列表
        wdtkList: function (pageNo) {
            var self = this;
            var pageNo = pageNo || 1;
            var data = {
                pageNo: pageNo,
                tm: self.searchOptions,
                loading: true
            };
            var success = function (result) {
                if (result.resultCode == "0") {
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    self.wdtkRow = result.data;
                    if (pageNo == 1) {
                        self.pageCon.upDate({
                            pageTotal: pageTotal
                        });
                    }
                    // setTimeout(setfootDet, 0);
                }
            };
            Service.postBody('/tkksxt/api/admin/tk/list', data, success);
        },
        //获取我的课程列表
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
        //删除题目
        deleteTm: function (tm) {
            var self = this;
            var data = {id: tm.id};

            var success = function (result) {
                if (result.resultCode == "0") {
                    self.$modal.success('删除成功');
                    self.wdtkList();
                }
            };
            self.$modal.confirm('确定要删除吗？', function (result) {
                Service.get('/tkksxt/api/admin/tk/delete', data, success);
            });
        },
        pageInit: function () {
            var self = this;
            this.pageCon = new Pagination({
                container: $(".wdtk_page"),
                pageTotal: 0,
                callback: function (page) {
                    self.wdtkList(page);
                }
            });
        }
    },
    created: function () {
    },
    mounted: function () {
        this.pageInit();
        this.wdtkList();
        this.wcjdkc();
    }
});
