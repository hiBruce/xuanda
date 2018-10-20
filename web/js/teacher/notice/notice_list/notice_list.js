import page from "Pagination";
mod.notice_list = Vue.component('notice_list', {
    template: __inline("/web/html/teacher/notice/notice_list.html"),
    data: function () {
        return {
            pagelit: '',
            ggList: [],
            bjList: [],
            kcList: [],
            result: {},
            gg: {},
            tabNum: 1,
            ggLx: 1,
            type: 2,
            pageNo: 1,
            bjId: '',
            kcId: '',
            tempStaging: '',//暂存编辑内容
            test: {
                test2: {
                    tempStaging: ''
                }
            }
        };
    },
    methods: {
        /**
         * 加载公告
         */
        getGgList: function (page) {
            var self = this;
            self.pageNo = page ? page : self.pageNo;
            if (self.kcId) {
                self.type = 1;
            } else {
                self.type = 2;
            }
            var data = {
                pageNo: page,
                pageSize: 10,
                bjId: self.ggLx == 2 && self.type == 1 ? self.bjId : '',
                kcId: self.ggLx == 1 && self.type == 1 ? self.kcId : '',
                lx: self.ggLx,
                type: self.type,
                loading: true
            };
            var success = function (result) {
                if (result.resultCode == 0) {
                    self.ggList = result.data;
                    //拿到分页信息，将总页码传入分页组件，更新页码
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    if (self.pageNo == 1) {
                        self.pagelit.upDate({
                            pageTotal: pageTotal
                        });
                    }
                }
            };
            Service.get('/jxxt/api/admin/gg/gglist', data, success);
        },
        /**
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            this.pagelit = new Pagination({
                container: $('.hot-group-page'),//必填
                pageTotal: 0,//必填
                callback: function (page) {//点击分页后的回调函数
                    self.getGgList(page);
                }
            });
        },
        /**
         * 获取我管理的班级列表
         */
        loadBjList: function () {
            var self = this;
            var success = function (result) {
                if (result.success) {
                    self.bjList = result.data;
                } else {
                }
            };
            Service.get('/jwxt/admin/bj/myManagerClassList', null, success);
        },
        /**
         * 获取我管理的课程列表
         */
        loadKcList: function () {
            var self = this;
            var success = function (result) {
                self.kcList = result.data;
            };
            Service.get('/jxxt/api/admin/course/myManageCourseList', null, success);
        },
        /**
         * 切换班级
         * @param bjId
         */
        changeBj: function (bjId) {
            this.bjId = bjId;
            this.getGgList();
        },
        /**
         * 切换课程
         * @param bjId
         */
        changeKc: function (kcId) {
            this.kcId = kcId;
            this.getGgList();
        },
        /*
         * 编辑班级公告
         * */
        editNr: function (ind) {
            this.tempStaging = this.ggList[ind]['nr'];
            Vue.set(this.ggList[ind], 'canEdit', true);
        },
        /*
         * 取消编辑
         * */
        cancelEdit: function (ind) {
            Vue.set(this.ggList[ind], 'canEdit', false);
            this.tempStaging = '';
        },
        /*
         * 保存编辑
         * */
        saveEdit: function (ind) {
            if (this.tempStaging.length > 500) {
                this.$modal.warn("公告内容最多500字，已输入字数：" + this.tempStaging.length);
                return;
            }
            var gg = this.ggList[ind];
            gg.nr = this.tempStaging;
            this.submitGg(gg, ind);
            // 数据请求完成后执行
            // Vue.set(this.ggList[ind],"canEdit",false);
            // this.tempStaging = ""
        },
        //提交保存
        submitGg: function (gg, ind) {
            var self = this;
            var data = gg;
            var success = function (result) {
                console.log(result);
                if (result.resultCode == 0) {
                    Vue.set(self.ggList[ind], 'canEdit', false);
                    self.tempStaging = '';
                    self.$modal.success("保存成功！");
                } else {
                    self.$modal.error('保存失败');
                }
            };
            Service.postBody('/jxxt/api/admin/gg/update', data, success);
        },
        /**
         * 删除班级公告
         */
        deleteGg: function (id) {
            var self = this;
            this.$modal.confirm('确认要删除该公告吗？', function () {
                var data = {id: id};
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.result = result;
                        self.getGgList(1);
                        self.$modal.success("删除成功！");
                    } else {
                        self.$modal.error("删除失败");
                    }
                };
                Service.get('/jxxt/api/admin/gg/delete', data, success);
            });
        },
        /*
         * 添加根目录按钮的显示弹框
         * 参数：不带modal_的页面名称
         * */
        showModal: function (lx) {
            var self = this;
            this.$modal.show(this, {
                templateURL: __uri('/web/js/build_course/edit_course/modal/modal_create_notice_kc.js'),//必填
                getGgList: self.getGgList,//点击关闭时的回调，如没有则不填
                title: '创建课程公告',//必填
                width: 600,
                gglx: lx,
                bjList: self.bjList,
                kcList: self.kcList
            });
        },
        /*
         * tab切换
         * */
        loadGgList: function (lx) {
            this.tabNum = lx;
            this.ggLx = lx;
            this.getGgList();
        }
    },
    created: function () {
        // window.loading();
        this.getGgList();
        this.loadBjList();
        this.loadKcList();
    },
    mounted: function () {
        this.pagination();
    }
});
