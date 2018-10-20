/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define([ '/static/lib/js/jquery.raty.min.js'], function () {

    var kcpj = Vue.component('kcpj', {
        template: __inline("./index.html"),
        data: function () {
            return {
                courseComment: {},
                courseComments: [],
                reviewCon: $("#reviewCon").val(),
            }
        },
        methods: {
            set:function(val){
                this.courseComment.content = val
            },
            getRaty: function () {
                var self = this;
                $('#halfstar').raty({
                    number: 5, //多少个星星设置
                    score: 5, //初始值是设置
                    hints: ['差', '一般', '好', '非常好', '全五星'],
                    path: '/static/temp/grade',
                    starHalf: 'halfstar.png',
                    starOff: 'xin1.png',
                    starOn: 'xin.png',
                    width: '240px',
                    half: true,
                    click: function (score, evt) {
                        self.courseComment.score = score;
                    }
                });
            },
            submitContent: function () {
                if (loginStatus) {
                    var self = this;
                    if(!this.courseComment.score){
                        this.$modal.warn("请选择星级")
                        return;
                    }
                    if (this.courseComment.content) {
                        var submitFun =function(){
                            self.courseComment.courseId = self.course.id;
                            var success = function (result) {
                                if (result.resultCode != 0) {
                                    self.$modal.error(result.message);
                                } else {
                                    self.getComment();
                                    self.courseComment.content = '';
                                }
                            };
                            Service.postBody("/jxxt/api/course_comment/add", self.courseComment, success);
                        };
                        this.$modal.senWordTest(this.courseComment.content,submitFun)
                    } else {
                        self.$modal.confirm('请填写评论信息', null, 1)
                    }
                } else {
                    Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
                }
            },
            //获取评价
            getComment: function (pageNo) {
                this.loadScore('halfstar', true)
                var self = this;
                var pageNo = pageNo || 1;
                Service.get('/jxxt/api/admin/course/' + this.course.id + '/comment', {
                    pageNo: pageNo,
                    commentScore: 0
                }, function (res) {
                    if (res.resultCode == 0) {
                        self.courseComments = res.data;
                        res.data.forEach(function (courseComment) {
                            var id = courseComment.id;
                            self.loadScore(id);
                        });
                        if (res.page && pageNo == 1) {
                            var pageTotal = Math.ceil(res.page.rowCount / res.page.pageSize);
                            self.pageContro.upDate({
                                pageTotal: pageTotal
                            })
                        }
                    }
                })
            },
            loadScore: function (id, readonly) {
                var self = this;
                var readonly = readonly ? false : true;
                var success = function (result) {
                    var score = result.data;
                    $('#' + id).raty({
                        number: 5, //多少个星星设置
                        score: score, //初始值是设置
                        hints: ['差', '一般', '好', '非常好', '全五星'],
                        path: '/static/temp/grade',
                        starHalf: 'halfstar.png',
                        starOff: 'xin1.png',
                        starOn: 'xin.png',
                        width: '240px',
                        half: true,
                        readOnly: readonly,
                        click: function (score, evt) {
                            self.courseComment.score = score;
                        }
                    });
                }
                Service.get("/jxxt/api/course_comment/score/" + id, null, success);
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                self.pageContro = new Pagination({
                    container: $('.comment-page'),//必填
                    pageTotal: 0,//必填，此处默认为0
                    callback: function (page) {//点击分页后的回调函数
                        self.getComment(page);
                    }
                });
            },
        },
        created: function () {
            var self = this;
            this.course = this.$store.getters.getCourse();
            if(this.course.id){
                this.getComment()
            }else{
                this.$root.getCourse().then(function(data){
                    self.course = data.course;
                    self.getComment()
                })
            }

        },
        mounted: function () {
            this.getRaty();
            this.pagination();
        },
    });
    return kcpj;
});
