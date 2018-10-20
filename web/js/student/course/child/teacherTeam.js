define(function () {
    var teacherTeam = Vue.component('teacherTeam', {
        template: __inline('/web/html/student/course/child/teacherTeam.html'),
        data: function () {
            return {
                course:{},
                dataList:[]
            }
        },
        methods: {
            getList:function(){
                var self = this;
                Service.get("/jxxt/api/kcjs/kcJsLb",{kcId:this.course.id,pageNo:1},function(res){
                    if(res.success){
                        self.dataList = res.data;
                    }
                })
            }
        },
        created: function () {
            this.course = JSON.parse(this.$route.query.course) ;
            this.getList()
        },
        //dom ready后调用
        mounted: function () {

        }
    });


    return teacherTeam;
})