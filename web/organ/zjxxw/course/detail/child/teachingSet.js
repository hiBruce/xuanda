define(function () {

    var teachingSet = Vue.component('teachingSet', {
        template: __inline('./teachingSet.html'),
        data: function () {
            return {
                course:{}
            }
        },
        methods: {
        	changeType:function(e,type){
                var self = this;
                var eve = e || window.event;
                var target = $(eve.target);
                if(!target.hasClass("animate_wrap")){
                    target = target.parents(".animate_wrap")
                };
                if(!target.attr("removing") || target.attr("removing") =='false'){
                    target.attr("removing",true)
                    if(target.hasClass("has_animate")){
                        console.log(111)
                        target.addClass("reverse_animate");
                        setTimeout(function(){
                            target.removeClass("reverse_animate");
                            target.removeClass("has_animate");
                            target.attr("removing",false);
                            if(type == 'type'){
                                self.course[type] = 3;
                            }else{
                             self.course[type] = 0;
                            }
                             self.submitCourseInfo()
                        },500);
                        
                    
                 }else{
                    target.addClass("has_animate");
                    setTimeout(function(){
                        // target.removeClass("reverse_animate");
                        target.attr("removing",false);
                        self.course[type] = 1;
                        if(type !='isNeedPwd'){
                            self.submitCourseInfo()
                        }
                    },500);
                    
                }
            }
        },
        setPassword:function(){
            if(this.course.coursePwd){
                this.submitCourseInfo()
            }
        },
         /**
             * 更新课程信息
             */
             submitCourseInfo: function () {
                var self = this;
                var success = function (result) {
                 self.$modal.success("设置成功")
                 self.getCourse()
             };
             Service.postBody('/jxxt/api/admin/course/update', this.course, success);
         },
             /**
             * 加载我管理的课程
             */
             getCourse: function () {
                var self = this;
                var success = function (result) {
                    if(result.resultCode == 0){
                        self.course = result.data;
                        self.$root.course =  result.data;
                        
                    };
                } 
                Service.get('/jxxt/api/admin/course/manageCourse/' + this.course.id, null, success);
            },

        },
        created: function () {
            this.course = JSON.parse(this.$route.query.course)
        },
        //dom ready后调用
        mounted: function () {

        }
    });

    return teachingSet;
})