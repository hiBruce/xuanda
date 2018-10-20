/**
 * 课程包首页js
 */
define(['Pagination'], function () {
    var course = new Vue({
            el: ".page",
            delimiters: ['{%', '%}'],
            data: function () {
                return {
                    kcbId: URL.getParameter(),
                    kcbDuration: '',
                    course: {},
                    learningStatus: {},
                    rows_course: [],
                    pageNo: 1,
                    pageSize: 5,
                    courseCount: 0
                }
            },
            methods: {
                /**
                 * 获取课程包详情
                 * @param page
                 */
                getDetail: function (page) {
                    var self = this;
                    self.pageNo = page ? page : self.pageNo;
                    var param = {
                        kcbId: self.kcbId,
                        pageNo: self.pageNo,
                        pageSize: self.pageSize,
                        loading: true,
                    };
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.course = result.data.course;
                            self.learningStatus = result.data.learningStatus;
                            if (self.course.children) {
                                self.rows_course = self.course.children;
                            }
                            self.courseCount = result.page['rowCount'];
                            var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                            if (self.pageNo == 1) {
                                self.pageCon.upDate({
                                    pageTotal: pageTotal
                                })
                            }
                        }
                    };
                    Service.get('/jxxt/api/course/kcb/detail', param, success);
                },
                /**
                 * 获取课程包视频总时长
                 * @param kcbId
                 */
                getKcbDuration: function (kcbId) {
                    var self = this;
                    var param = {kcbId: kcbId ? kcbId : self.kcbId};
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.kcbDuration = result.data;
                        }
                    };
                    Service.get('/jxxt/api/course/kcb/kcbZsc', param, success);
                },
                /**
                 * 加入课程包
                 */
                joinKcb: function () {
                    var self = this;
                    var param = {
                        kcbId: self.kcbId,
                        loading: true,
                    };
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            // 成功后进入到课程中进行学习
                            self.$modal.success('加入成功！');
                            self.getDetail(1);
                        } else {
                            self.$modal.error(result.message);
                        }
                    };
                    Service.get('/jxxt/api/course/kcb/studyKcb', param, success);
                },
                goStudy: function (url) {
                    this.$modal.loading();
                    location.href = url;
                },
                /**
                 * 初始化分页
                 */
                pageInit: function () {
                    var self = this;
                    this.pageCon = new Pagination({
                        container: $(".course_package_page"),
                        pageTotal: 0,
                        callback: function (page) {
                            self.getDetail(page);
                        }
                    })
                },
                goLogin: function () {
                    Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
                },
            },
            created: function () {
                this.getKcbDuration(this.kcbId);
                this.getDetail();
            },
            mounted: function () {
                this.pageInit();
            },
        })
    ;
});