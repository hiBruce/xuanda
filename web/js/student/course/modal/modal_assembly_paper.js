/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("/web/html/student/course/modal/modal_assembly_paper.html"),
        data: function () {
            return {
                sjtmRow: [],
                sjid: '',
                kcRow: [],
                searchOptions: {
                    sfgk: 2,
                    lx: 0,
                    mc: '',
                    kcid: ''
                }
            }
        },
        components: {
            addTm: function (res, rej) {
                require([__uri('/web/v/ucenter/tkgl/tm/addTm.js?v')], res)
            },
            editTm: function (res, rej) {
                require([__uri('/web/v/ucenter/tkgl/tm/editTm.js?v')], res)
            }
        },
        methods: {
            //获取试卷的题目
            sjTmList: function (pageNo) {
                var self = this;
                var pageNo = pageNo || 1;
                var data = {
                    pageNo: pageNo,
                    sjid: self.sjid,
                    kcid: self.searchOptions.kcid,
                    tmmc: self.searchOptions.mc,
                    lx: self.searchOptions.lx,
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        self.sjtmRow = result.data;
                        self.options.cb && self.options.cb()
                        if (pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                        // // setTimeout(setfootDet, 0);
                        self.options.cb();
                    }
                };
                Service.postBody('/tkksxt/api/admin/sjtm/list', data, success);
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
            closeModal: function () {
                this.$modal.hide(this)
            },
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".tm_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.sjTmList(page)
                    }
                })
            },
            //引用题库
            quote: function () {
                //判断当前列表是否有数据如果有的话则表示引用题库的时候需要过滤掉这些题
                var flag = false;
                if (this.sjtmRow.length > 0) {
                    flag = true;
                }

                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/modal_exam_quote_tm.js?v'),
                    callback: this.childCb,
                    sjid: this.options.sj.id,
                    flag: flag,
                    title: '题库引用'
                })
            },
            childCb: function () {
                this.$modal.success("保存成功");
                this.sjTmList();
            },
            //移除
            removeTm: function (tm) {
                var self = this;
                var data = {
                    sjid: this.options.sj.id,
                    tmid: tm.id
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.$modal.success("操作成功");
                        self.sjTmList();
                    } else {
                        self.$modal.error("操作失败");
                    }
                };
                this.$modal.confirm('确定要从试卷中移除该题吗？', function (result) {
                    Service.get('/tkksxt/api/admin/sjtm/delete', data, success);
                });

            },
            //删除
            deleteTm: function (tm) {
                var self = this;
                var data = {
                    sjid: this.options.sj.id,
                    tmid: tm.id
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.$modal.success("操作成功");
                        self.sjTmList();
                    } else {
                        self.$modal.error("操作失败");
                    }
                };
                this.$modal.confirm('确定要将该题从试卷中移除并从题库中删除吗？', function (result) {
                    Service.get('/tkksxt/api/admin/sjtm/deleteAndRemove', data, success);
                });

            },
            //设置分值
            setScore: function (e, tm) {
                var self = this;
                var target = e.target || e.srcElement;
                var score = $(target).val();
                if (score.length > 0) {
                    //保存分值
                    var data = {
                        sjid: this.options.sj.id,
                        tmid: tm.id,
                        fz: score
                    };
                    var success = function (result) {
                        /* if (result.resultCode == "0") {
                             self.$modal.success("操作成功");
                             self.sjTmList();
                         }else{
                             self.$modal.error("操作失败");
                         }*/
                        if (result.resultCode == 0)
                            self.sjTmList();
                    };
                    Service.get('/tkksxt/api/admin/sjtm/setScore', data, success);
                }

            },
            //批量设置分值
            setScoreBatch: function () {
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/set_score.js?v'),
                    callback: this.setScoreBatchCallBack,
                    sjid: this.options.sj.id,
                    title: '批量设置分值'
                })
            },
            //设置分值回调
            setScoreBatchCallBack: function () {
                this.$modal.success("操作成功");
                this.sjTmList();
            },
            //查看题目
            detailTm: function (tm) {
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/detail_tm.js?v'),
                    tm: tm,
                    title: '题目详情'
                })
            }
        },
        created: function () {
            this.sjid = this.options.sj.id;
        },
        mounted: function () {
            this.pageInit();
            this.sjTmList();
            this.wcjdkc();
        },
        props: ['options']
    });
    return modal
});