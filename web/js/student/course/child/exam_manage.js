/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var eaxm_manage = Vue.component('eaxm_manage', {
        template: __inline("/web/html/student/course/child/exam_manage.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                pageNo: 1,
                sjRow: [],
                kcRow: [],
                searchOptions: {
                    mc: '',
                    kcid: ''
                }
            };
        },
        methods: {
            //获取我的试卷列表
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
            pageInit : function(){
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".exam_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.examList(page)
                    }
                })
            },
            zujuan : function(sj){
                this.$modal.show(this,{
                    templateURL:__uri('/web/v/ucenter/build_course/edit_course/modal/modal_assembly_paper.js?v'),
                    sj : sj,
                    title : sj.mc+'-组卷',
                    cb:this.examList
                })
            },
            addSj : function(){
                this.$modal.show(this,{
                    templateURL:__uri('/web/v/ucenter/build_course/edit_course/part/add_exam.js?v'),
                    kcid :this.course.id,
                    width:700,
                    callback: this.childCb,
                    title : '新增试卷'
                })
            },
            editSj : function(sj){
                this.$modal.show(this,{
                    templateURL:__uri('/web/v/ucenter/build_course/edit_course/part/add_exam.js?v'),
                    sj :sj,
                    width:700,
                    callback: this.childCb,
                    title : '编辑试卷'
                })
            },
            deleteSj : function(sj){
                var self = this;
                var data = {id: sj.id};

                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.$modal.success('删除成功');
                        self.examList();
                    }
                };
                self.$modal.confirm('确定要删除吗？', function (result) {
                    Service.get('/tkksxt/api/admin/sj/delete', data, success);
                });
            },
            childCb : function(){
                this.$modal.success("保存成功");
                this.examList();
            },
        },
        created: function () {
        	 this.course = JSON.parse(this.$route.query.course);
            this.searchOptions.kcid = this.course.id;
        },
        mounted: function () {
            this.pageInit();
            this.examList();
        },
    });
    return eaxm_manage;
});