/**
 * 我的课程
 */
define(['Pagination'], function () {
   var ks = Vue.component('ks', {
        template: __inline("./index.html"),
        delimiters: ['{%', '%}'],
        data : function (){
            return {
                kcRow: [],
                cjList:[],
                course:{},
                searchOptions : {
                    zt : 2,//全部
                    kcid : '',
                    kcnrmc : '',
                    kcnrlx : 4
                }
            }
        },
        methods : {
            checkInput:function(e){
                this.searchOptions.kcnrmc=e.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z\d]/g,'');
            },
            getcjList:function(page){
                var self = this;
                var pageNo = pageNo || 1;
                var data = {
                    pageNo: pageNo,
                    cj: self.searchOptions,
                    zt : 0
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        self.cjList = result.data;
                        if (pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                        setTimeout(setfootDet, 0)
                    }
                };
                Service.postBody('/tkksxt/api/admin/cj/list',data ,success)
            },
            //获取我选择的课程列表
            wdkc: function () {
                var self = this;
                var data = {};
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.kcRow = result.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/myCourseList', data, success);
            },
            pijuan : function(cj){
              //批卷
                window.location.href = "/ucenter/perusal_exam?cjid="+cj.id+"&sjid="+cj.sjid;
            },
            chakan : function(cj){
                //查看试卷
                window.location.href = "/ucenter/view_exam?cjid="+cj.id+"&sjid="+cj.sjid + "&courseId=" + cj.kcid+ "&chapterId=" + cj.kcnrid+"&xs=1";
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit : function(){
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".cj-page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getcjList(page)
                    }
                })
            },
            initParams:function(){
                this.searchOptions.kcid  =  this.course.id;
                this.getcjList();
                this.wdkc();

            }
        },
        created:function(){
            var self = this;
            this.course = this.$store.getters.getCourse();
            if(this.course.id){
                this.initParams()
            }else{
                this.$root.getCourse().then(function(data){
                    self.course = data.course;
                    self.initParams()
                })
            }
        },
        mounted:function(){
            this.pageInit();
        }
    });
   return ks;
});