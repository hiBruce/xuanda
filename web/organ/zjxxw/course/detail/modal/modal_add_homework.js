define(['lib/WdatePicker/WdatePicker'], function () {
    var pro = Vue.component('modal', {
        template: __inline("./modal_add_homework.html"),
        data: function () {
            return {
                search: {
                    kcid: this.options.course.id,
                    name: '',
                    pageNo: 1
                },
                rows_homeWork: []
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
            },
            /**
             * 提交章节信息
             */
            submitChapter: function () {
                var self = this;
                self.options.thisChapter.workEndDate = new Date($('#workEndDate').val()).getTime();
                if (self.options.thisChapter.workId) {
                    if (self.options.thisChapter.workEndDate && self.options.thisChapter.workEndDate > new Date().getTime()) {
                        // type值为3时，为作业格式的章节
                        self.options.thisChapter.type = 3;
                        if (self.options.thisChapter.contentName) {
                            self.options.thisChapter.courseId = self.options.course.id;
                            var success = function (result) {
                                self.options.callback(result.data);
                                self.$modal.success("操作成功！");
                                self.closeModal();
                            };
                            Service.postBody('/jxxt/api/admin/chapter/update', this.options.thisChapter, success);
                        } else {
                            self.$modal.warn("请输入章节名称，再点击确定按钮!");
                        }
                    } else {

                        self.$modal.warn("请选择正确的截止时间，再点击确定按钮!");
                    }

                } else {
                    self.$modal.warn("请选择作业，再点击确定按钮!");
                }
            },

            /**
             * 获取课程下作业列表
             */
            getHomeWorkList: function (search, pageNo) {
                var self = this;
                if (search.name)
                    self.search = search;
                var pageNo = pageNo ? pageNo : self.search.pageNo;
                self.search.pageNo = pageNo;
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.rows_homeWork = result.data;
                        //拿到分页信息，将总页码传入分页组件，更新页码
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        if (pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                    }
                };
                Service.postBody('/jxxt/api/course/homework/getKcZy', self.search, success);
            },

            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".select_video_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getHomeWorkList(self.search, page)
                    }
                })
            },
        },
        created: function () {
            if (isNull(this.options.thisChapter)) {
                this.options.thisChapter = {
                    contentName: '',
                    contentParentId: this.options.parentChapter.id,
                    type: 3,
                    contentType: 1,
                };
            }
            this.getHomeWorkList(this.search);
        },
        mounted: function () {
            this.pageInit();
            if (this.options.thisChapter.workEndDate)
                document.getElementById('workEndDate').value = window.dateMinute(this.options.thisChapter.workEndDate);
        },
        props: ['options']
    });
    return pro
});