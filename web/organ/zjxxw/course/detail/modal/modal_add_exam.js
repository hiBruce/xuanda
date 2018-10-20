/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("./modal_add_exam.html"),
        data: function () {
            return {
                sjRow: [],
                searchOptions: {
                    mc: '',
                    kcid: ''
                },
                selSjid: '',
                selSjzf: 0,
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
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        self.sjRow = result.data;
                        if (result.data.length > 0) {
                            var currentId = self.selSjid;
                            var obj = filterArray(self.sjRow, 'id', currentId);
                            if (obj.length == 1) {
                                self.selSjzf = obj[0].zfz;
                            }
                        }

                        if (pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                        setTimeout(setfootDet, 0)
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
                } else if (!self.options.thisChapter.testDuration && self.options.thisChapter.testDuration != 0) {
                    self.$modal.warn("请先设置测试时长！");
                } else if ((!self.options.thisChapter.passScore && self.options.thisChapter.passScore != 0) || parseInt(self.options.thisChapter.passScore) < 0 || parseInt(self.options.thisChapter.passScore) > parseInt(this.selSjzf)) {
                    self.$modal.warn("通过分不能小于零或超过试卷总分！");
                } else if (!self.options.thisChapter.testStartDate || !self.options.thisChapter.testEndDate || self.options.thisChapter.testEndDate < self.options.thisChapter.testStartDate || self.options.thisChapter.testEndDate < window.Date(new Date())) {
                    self.$modal.warn("请设置正确的测试起止时间！");
                } else {
                    self.options.thisChapter.testId = self.selSjid;

                    // type值为4时，为考试格式的章节
                    self.options.thisChapter.type = 4;
                    if (self.options.thisChapter.contentName) {
                        self.options.thisChapter.courseId = self.options.course.id;
                        var success = function (result) {
                            self.options.callback(result.data);
                            self.$modal.success("操作成功！");
                            self.closeModal();
                        };
                        Service.postBody('/jxxt/api/admin/chapter/update', this.options.thisChapter, success);
                    } else {
                        self.$modal.warn("请输入测试名称!");
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
                    type: 4,
                    testDuration: '0',
                    testStartDate: '',
                    testEndDate: '',
                    passScore: 0,
                    contentType: 1,
                    testId: ''
                };
            } else {
                if (this.options.thisChapter.type == 4) {

                } else {
                    this.options.thisChapter['testDuration'] = '0';
                    this.options.thisChapter['testStartDate'] = '';
                    this.options.thisChapter['testEndDate'] = '';
                    this.options.thisChapter['testId'] = '';
                    this.options.thisChapter['passScore'] = 0;
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