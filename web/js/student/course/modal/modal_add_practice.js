/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("/web/html/student/course/modal/modal_add_practice.html"),
        data: function () {
            return {
                sjRow: [],
                searchOptions: {
                    mc: '',
                    kcid: ''
                },
                selSjid: '',
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
            },
            examList: function (pageNo) {
                var self = this;
                var pageNo = pageNo || 1;
                var data = {
                    pageNo: pageNo,
                    sj: self.searchOptions
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        self.sjRow = result.data;

                        if (pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                        // setTimeout(setfootDet, 0)
                    }
                };
                Service.postBody('/tkksxt/api/admin/sj/list', data, success);
            },
            /**
             * 提交章节信息
             */
            submitChapter: function () {
                var self = this;
                if (this.selSjid == '') {
                    self.$modal.warn("请先选择试卷！");
                } else {
                    self.options.thisChapter.testId = self.selSjid;

                    // type值为6时，为练习格式的章节
                    self.options.thisChapter.type = 6;
                    if (self.options.thisChapter.contentName) {
                        self.options.thisChapter.courseId = self.options.course.id;
                        var success = function (result) {
                            self.options.callback(result.data);
                            self.$modal.success("操作成功！");
                            self.closeModal();
                        };
                        Service.postBody('/jxxt/api/admin/chapter/update', this.options.thisChapter, success);
                    } else {
                        self.$modal.warn("请输入练习名称!");
                    }
                }
            },
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".select_video_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.examList(page)
                    }
                })
            },
            selSj: function (sj) {
                this.selSjid = sj.id;
                this.selSjzf = sj.zfz;
            }
        },
        created: function () {
            if (isNull(this.options.thisChapter)) {
                this.options.thisChapter = {
                    contentName: '',
                    contentParentId: this.options.parentChapter.id,
                    type: 6,
                    practiceNum: 1,
                    testId: '',
                    contentType: 1,
                };
            } else {
                if (this.options.thisChapter.type == 6) {

                } else {
                    this.options.thisChapter['practiceNum'] = 1;
                    this.options.thisChapter['testId'] = '';
                }
            }
        },
        mounted: function () {
            this.searchOptions.kcid = this.options.course.id;
            this.selSjid = this.options.thisChapter.testId;
            this.pageInit();
            this.examList();
        },
        props: ['options']
    });
    return modal
});