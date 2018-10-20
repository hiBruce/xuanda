import page from "Pagination";
mod.homework_trace = Vue.component('homework_trace', {
    template: __inline("/web/html/teacher/learning_trace/homework_trace/homework_trace.html"),
    data: function () {
        return {
            showComment: true,
            hasComment: true,
            /* ueoption:{
                 autoHeightEnabled:false,
                 initialFrameHeight:300
             },*/
            zyList: [],
            status: '',
            detailList: [],
            row: [],
            pageSize: 10,
            pageNo: 1,
            pageContro: '',
            zyMcList: [],
            zymc: '',
            searchNum: 0,
            pageNo: 1,
            zyzt: 2,
            select_kc: '',
            kc_list: [],
            select_zy: '',
            kcZyList: []
        };
    },
    methods: {
        /**
         * 获取作业列表
         * @param page
         */
        getList: function (page) {
            var self = this;
            self.pageNo = page ? page : self.pageNo;
            var search = {
                kcid: self.select_kc,
                zyid: self.select_zy,
                pageNo: self.pageNo,
                pageSize: self.pageSize,
                lx: self.zyzt,
                // pickName: self.zymc,
                role: 'teacher',
                loading:true
            };
            var success = function (ret) {
                if (ret.success) {
                    self.zyList = ret.data;
                    // if (self.searchNum == 0) {
                    //     self.initSelect()
                    // }
                    var pageTotal = Math.ceil(ret.page['rowCount'] / ret.page['pageSize']);
                    if (self.pageNo == 1) {
                        self.pageContro.upDate({
                            pageTotal: pageTotal
                        });
                    }
                }
            }
            Service.postBody('/jxxt/api/course/homework/list', search, success)
        },
        /**
         * 获取我管理的课程列表
         */
        getCourseList: function () {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.kc_list = result.data;
                }
            };
            Service.get('/jxxt/api/admin/course/myManageCourseList', null, success);
        },
        /**
         * 获取课程下作业列表
         */
        getKcZyLb: function () {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.kcZyList = result.data;
                }
            };
            Service.get('/jxxt/api/course/homework/getKcZyLb', {kcId: self.select_kc}, success);
        },
        // initSelect: function () {
        //     var self = this;
        //     var arr = [];
        //     for (i = 0; i < self.zyList.length; i++) {
        //         arr.push(self.zyList[i].zymc)
        //     }
        //     self.zyMcList = self.unique(arr)
        //     self.searchNum++
        // },
        // unique: function (array) {
        //     var n = []; //一个新的临时数组
        //     //遍历当前数组
        //     for (var i = 0; i < array.length; i++) {
        //         //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //         //否则把当前项push到临时数组里面
        //         if (n.indexOf(array[i]) == -1) n.push(array[i]);
        //     }
        //     return n;
        // },
        demoShow: function (row) {
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/homework_management/modal/modal_homework_pj.js'),//必填
                cancelcb: this.closeModal,//点击关闭时的回调，如没有则不填
                method: this.getList,
                row: row,
                title: "作业评价",//必填
            })
        },
        deleteConfirm: function (row) {
            var self = this;
            self.row = row
            self.$modal.confirm('确定删除该作业吗？', self.deleteZy, null)
        },
        deleteZy: function () {
            var self = this;
            var success = function (ret) {
                if (ret.success) {
                    self.getList()
                }
            }
            Service.postBody('/jxxt/api/course/homework/delete', self.row.id, success)
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
        /**
         * 关闭弹框
         * */
        closeModal: function () {
            var self = this;
            self.showComment = true;
            self.hasComment = true;
            //this.$modal.hide(this)
        },
        checkValue: function (val, event) {
            var obj = event.target
            if (val == null || val == undefined) {
                $(obj).html('')
            } else {
                $(obj).html(val)
            }
        },
    },
    watch: {
        'select_kc': function () {
            this.select_zy = '';
            this.getList(1);
            this.getKcZyLb();
        }
    },
    created: function () {
        window.loading()
        this.getList();
        this.getCourseList();
    },
    mounted: function () {
        this.pagination()
    }
});
