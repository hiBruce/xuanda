/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("/web/html/student/course/modal/modal_add_video.html"),
        data: function () {
            return {
                zymc: '',
                pageNo: 1,
                rows_zy: [],
                zyid: '',
                spsc: ''
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
                if (self.zyid) {
                    // type值为2时，为视频格式的章节
                    self.options.thisChapter.type = 2;
                    if (self.options.thisChapter.contentName) {
                        self.options.thisChapter.courseId = self.options.course.id;
                        self.options.thisChapter.videoId = self.zyid;
                        self.options.thisChapter.videoDuration = self.spsc;
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
                    self.$modal.warn("请选择视频资源，再点击确定按钮!");
                }
            },

            /**
             * 获取资源列表
             */
            getResourceList: function (zymc, pageNo) {
                var self = this;
                var pageNo = pageNo ? pageNo : self.pageNo;
                if (zymc != self.zymc) {
                    self.zymc = zymc;
                }
                var data = {
                    zymc: self.zymc === '' ? 'all' : self.zymc,
                    pageNo: pageNo
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.rows_zy = result.data;
                        //拿到分页信息，将总页码传入分页组件，更新页码
                        var pageTotal = Math.ceil(result.page.rowCount/result.page.pageSize);
                        if (pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                    }
                };
                Service.post('/zjxxw/api/admin/resource/list', data, success);
            },
            getVideoById: function () {
                var self = this;
                var success = function (result) {
                    self.spsc = result.data.mediaLength;
                    self.submitChapter();
                };
                Service.get('/zjxxw/api/admin/resource/' + this.zyid, null, success);
            },
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".select_video_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getResourceList(self.zymc, page)
                    }
                })
            },
        },
        created: function () {
            if (isNull(this.options.thisChapter)) {
                this.options.thisChapter = {
                    contentName: '',
                    contentParentId: this.options.parentChapter.id,
                    type: 2,
                    contentType: 1,
                };
            }
            if (this.options.thisChapter.videoId)
                this.zyid = this.options.thisChapter.videoId;
            this.getResourceList(this.zymc);
        },
        mounted: function () {
            this.pageInit();
        },
        props: ['options']
    });
    return modal
});