/*
* 答疑
* */
define(function () {
    return Vue.component('answer', {
        template: __inline("/web/html/index/course/part/part_answer.html"),
        data: function () {
            return {
                dyList:[],
                zjList:[],
                zjId:[],
                row:[],
            };
        },
        methods: {
            getList:function () {
                var self = this;
                var data = {kcId:self.course.id,ksid:self.zjId};
                var success = function (ret) {
                    if(ret.success){
                        self.dyList = ret.data;
                    }
                }
                Service.postBody('/jxxt/api/course/ksdy/list',data,success)
            },
            getChapterListByCourseId:function () {
                var self = this;
                //var data = {courseId:self.row.id}
                var success = function (ret) {
                    if(ret.success){
                        if(ret.data.length>0){
                            self.zjList = ret.data
                        }else{
                            self.zjList.push({id:'',name:'请选择一个章节'})
                        }

                    }else{
                        self.$modal.tip('error','内容加载出现错误，请关闭后重新打开！',null,3000)
                    }
                }
                Service.get('/jxxt/api/admin/chapter/getChapterListByCourseId/'+self.course.id,null,success);
            },
            pickZj:function (zj) {
                var self = this;
                self.getList()
            },
            createAns:function(){
                this.$modal.show(this,{
                    templateURL:__uri('/web/v/course/modal/modal_create_answer.js'),//必填
                    title:"新建答疑",//必填
                    row:this.course,
                    method:this.getList,
                })
            },
            showModal:function (row) {
                var self = this;
                self.$modal.show(self,{
                    templateURL:__uri('/web/v/course/modal/modal_answer_reply.js'),
                    title:"回复",//必填
                    method:self.getList,
                    row:row,
                })
            }
        },
        created: function () {
            var self = this;
            self.getList()
            self.getChapterListByCourseId()
        },
        mounted: function () {
        },
        props: ['course']
    });
});