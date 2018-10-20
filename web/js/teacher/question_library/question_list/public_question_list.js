import page from "Pagination";
mod.public_question_list = Vue.component('public_question_list', {
    template: __inline("/web/html/teacher/question_library/public_question_list.html"),
    data: function () {
        return {
            tabNum: 0,
            kcRow: [],
            ggtkRow: [],
            pageNo: 1,
            pageCon: "",
            searchOptions: {
                sfgk: 1,
                lx: 0,
                mc: '',
                kcid: ''

            }
        };
    },
    methods: {
        /*
         * tab切换
         * */
        showTabs: function (num) {
            this.tabNum = num;
        },
        //获取公共题库列表
        ggtkList: function (pageNo) {
            var self = this;
            var pageNo = pageNo || 1;
            var data = {
                pageNo: pageNo,
                tm: self.searchOptions
            };
            var success = function (result) {
                if (result.resultCode == "0") {
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    self.ggtkRow = result.data;
                    if (pageNo == 1) {
                        self.pageCon.upDate({
                            pageTotal: pageTotal
                        });
                    }
                    //setTimeout(setfootDet, 0);
                }
            };
            Service.postBody('/tkksxt/api/admin/tk/gglist', data, success);
        },
        //获取我创建的课程列表
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
        //编辑题目
        editTm: function (tm) {
            var self = this;
            if (tm.lx == 1 || tm.lx == 2) {
                //选择题

            } else if (tm.lx == 3) {
                //判断题
            } else if (tm.lx == 4) {
                //简答题
            }
        },
        //删除题目
        deleteTm: function (tm) {
            var self = this;
            var data = {id: tm.id};

            var success = function (result) {
                if (result.resultCode == "0") {
                    self.$modal.tip('删除成功');
                    self.wdtkList();
                }
            };
            Dialog.confirm('确定要删除吗？', function (result) {
                Service.get('/tkksxt/api/admin/tk/delete', data, success);
            });
        },
        pageInit: function () {
            var slef = this;
            this.pageCon = new Pagination({
                container: $(".ggtk_page"),
                pageTotal: 0,
                callback: function (page) {
                    slef.ggtkList(page);
                }
            });
        }
    },
    created: function () {
    },
    mounted: function () {
        this.pageInit();
        this.ggtkList();
        this.wcjdkc();
    }
});
