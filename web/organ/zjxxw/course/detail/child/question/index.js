/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(['fcup'], function () {
    var question = Vue.component('question', {
        template: __inline("./index.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                search: {
                    kcId: '',
                    ksid: '',
                    pageNo: 1
                },
                course: {},
                learningStatus: {},
                pageNo: 1,
                rows_dylb: [],
                rows_ks: [],
            }
        },
        methods: {
            createAns: function () {
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/course/modal/modal_create_answer.js'),//必填
                    title: "新建答疑",//必填
                    row: this.course,
                    learningStatus: this.learningStatus,
                    method: this.getCourseDyInfo,
                })
            },
            /**
             * 获取课程答疑区信息
             */
            getCourseDyInfo: function (page) {
                var self = this;
                self.pageNo = page ? page : self.pageNo;
                self.search.pageNo = self.pageNo;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.rows_dylb = result.data;
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        if (self.pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                    }
                };
                Service.postBody('/jxxt/api/course/ksdy/list', this.search, success);
            },
            /**
             * 获取课程章节信息
             */
            getKsList: function () {
                var self = this;
                var success = function (result) {
                    self.rows_ks = result.data;
                };
                Service.get('/jxxt/api/admin/chapter/getChapterListByCourseId/' + this.course.id, null, success);
            },
            /**
             * 删除答疑
             *
             * @param row
             */
            scdy: function (row) {
                var self = this;
                self.$modal.confirm('确认要删除此条答疑吗？', function () {
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.$modal.success('删除成功!');
                            self.getCourseDyInfo(self.pageNo);
                        }
                    };
                    Service.get('/jxxt/api/course/ksdy/delete', {id: row.id}, success);
                });
            },
            // pickZj: function (zj) {
            //     var self = this;
            //     self.getCourseDyInfo()
            // },
            /*
         * 展示回复弹框
         * 参数：不带modal_的页面名称
         * */
            showModal: function (row) {
                var self = this;
                self.row = row;
                this.$modal.show(self, {
                    templateURL: __uri('/web/v/ucenter/build_course/edit_course/modal/modal_question_hf.js'),//必填
                    method: this.getCourseDyInfo,
                    row: this.row,
                    title: "回复",//必填
                })
            },
            /*
           * 关闭弹框
           * */
            closeModal: function () {
                UE.getEditor('container') && UE.getEditor('container').destroy();
            },
            initParams: function () {
                this.search['kcId'] = this.course.id;
                this.getCourseDyInfo();
                this.getKsList();
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                self.pageCon = new Pagination({
                    container: $('.question_page'),//必填
                    pageTotal: 0,//必填，此处默认为0
                    callback: function (page) {//点击分页后的回调函数
                        self.getCourseDyInfo(page);
                    }
                });
            },
        },
        created: function () {
            this.course = this.$store.getters.getCourse();
            this.learningStatus = this.$store.getters.getLearnStatus();
            if (this.course.id && this.learningStatus.id) {
                this.initParams()
            } else {
                var self = this;
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.learningStatus = data.learningStatus;
                    self.initParams()
                })
            }
        },
        mounted: function () {
            this.pagination();
        },
    });
    return question;
});