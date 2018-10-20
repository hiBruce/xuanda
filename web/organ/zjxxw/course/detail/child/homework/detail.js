/**
 * 我的课程
 */
define( function () {
   var hwdetail = Vue.component('hwdetail', {
        template: __inline("./detail.html"),
        delimiters: ['{%', '%}'],
        data : function (){
            return {
                myCourses: {},
                zyid:'',
                zyXy:[],
                detailList:[],
                jspj:'',
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
                    }
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
                }
                Service.postBody('/jxxt/api/course/homework/getZyXy',self.zyid,success);
            },
        },
        created:function(){
        	this.zyid = this.$route.path.split("/")[2]
            this.zyXy.zymc = '';
            this.zyXy.kcmc= '';
            this.zyXy.tjsj= '';
            var self = this;
            self.getZyXy();
        },
        mounted:function(){
        }

    });
   return hwdetail
});