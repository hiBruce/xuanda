/**
 * 我的课程
 */
define( function () {
    var app = new Vue({
        el:".page",
        delimiters: ['{%', '%}'],
        data : function (){
            return {
                myCourses: {},
                zyid:$('#workid').attr('value'),
                zyXy:[],
                detailList:[],
                jspj:'',
                chapterName : ''
            }
        },
        methods : {
            //根据node端获取的参数 对作业详情进行查询
            getList:function () {
                var  self = this;
                var data = {zyid:self.zyXy.zyid,xyid:self.zyXy.xyid,zyxyid:self.zyXy.id};
                var success = function (ret) {
                    self.detailList = ret.data;
                    if(self.detailList.length>0){
                        self.jspj = self.detailList[0].jspj;
                        $('#jspj').html(self.jspj)
                    }
                    window.setfootDet()
                }
                Service.postBody('/jxxt/api/course/homework/detail',data,success);
            },
            //根据id获取学员作业
            getZyXy:function () {
                var self = this;
                var success = function (ret) {
                    if(ret.success){
                        self.zyXy = ret.data;
                        self.getList();
                    }
                    window.setfootDet()
                }
                Service.postBody('/jxxt/api/course/homework/getZyXy',self.zyid,success);
            },
            getTime:function(time){
                return window.dateMinute(time)
            },
            getChapterName : function () {
                var self = this;
                var data = {};
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.chapterName = result.data.contentName;
                    }
                };
                Service.get('/jxxt/api/admin/chapter/'+$("#chapterId").val(), data, success);
            }
        },
        created:function(){
            this.zyXy.zymc = '';
            this.zyXy.kcmc= '';
            this.zyXy.tjsj= '';
            var self = this;
            self.getZyXy();
        },
        mounted:function(){
            this.getChapterName();
        }

    });
});