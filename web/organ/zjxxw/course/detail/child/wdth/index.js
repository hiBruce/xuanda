/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(['Pagination'], function () {
    var wdth = Vue.component('wdth', {
        template: __inline("./index.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                th: {
                    cnr: '',
                    ckcid: '',
                    ckcmc: '',
                    dwid: '',
                },
                thList: [],
                pageNo: 1,
                course: {},
                showTab:1,
                learningStatus: {},
                showText:false
            }
        },
        methods: {
            showTextArea:function(){
                this.showText = !this.showText;
            },
            /*
             * 切换tab
             * */
            changeTab: function (num) {
                this.showTab = num;
                this.getThList(1);
            },
            /**
             * 提交体会
             */
            createTh: function () {
                var self = this;
                if (!self.th.cnr.trim()) {
                    self.$modal.error("请输入体会内容，再点击提交按钮！");
                } else {
                    self.$modal.loading();
                    self.th.ckcid = self.course.id;
                    self.th.ckcmc = self.course.name;
                    self.th.dwid = self.learningStatus.dwId;
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.$modal.success("添加成功！");
                            self.th.cnr = '';
                            self.getThList();
                            self.showText = !self.showText;
                        }
                        self.$modal.removeLoad();
                        document.querySelector("#showLen").innerText = 0;
                    };
                    Service.postBody('/jxxt/api/course/notes/updateTh', self.th, success);
                }
            },
            /**
             * 获取学员课程体会列表
             * @param page
             */
            getThList: function (page) {
                var self = this;
                self.pageNo = page ? page : self.pageNo;
                var data = {
                    pageNo: self.pageNo,
                    courseId: self.course.id
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.thList = result.data;
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        if (self.pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                };
                if(this.showTab==1){
                    Service.get('/jxxt/api/course/notes/myThList', data, success)
                }else if(this.showTab==2){
                    Service.get('/jxxt/api/course/notes/courseBjThList', data, success)
                }else if(this.showTab==3){
                    Service.get('/jxxt/api/course/notes/courseThList', data, success)
                }
            },

            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".page-info"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getThList(page);
                    }
                })
            },
            /*
            * 编辑体会
            * */
            editTh: function (th) {
                this.$modal.show(this, {
                    templateURL: __uri('/web/v/course/detail/modal/edit_th/index.js?v'),
                    cb: this.getThList,
                    title: '编辑体会',
                    width: 800,
                    th: th,
                    course: this.course
                })
            },
            deletTh: function (th) {
                var self = this;
                this.$modal.confirm("确定要删除吗？", function () {
                    Service.get("/jxxt/api/course/notes/deleteTh", {thId: th.id}, function (res) {
                        if (res.success) {
                            self.$modal.success("删除成功");
                            self.getThList()
                        } else {
                            self.$modal.error("删除失败")
                        }
                    })
                })
            }
        },
        created: function () {
            var self = this;
            this.course = this.$store.getters.getCourse();
            this.learningStatus = this.$store.getters.getLearnStatus();
            if (this.course.id && this.learningStatus.id) {
                this.getThList();
            } else {
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.learningStatus = data.learningStatus;
                    self.getThList();
                })
            }
        },
        mounted: function () {
            this.pageInit();
        },
    });
    return wdth;
});
