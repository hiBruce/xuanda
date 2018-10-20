/**
 * 班级公告
 */
define([ 'confirm'], function () {
   var studentStatistic = Vue.component('studentStatistic', {
        template: __inline("./student_statistic.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                xyKcList: [],
                bjList: [],
                kcList: [],
                xyMc: '',
                bjId: '',
                kcId: ''
            };
        },
        methods: {
            /**
             * 获取学员课程列表
             */
            getXyKcList: function () {
                var self = this;
                var data = {
                    name: self.xyMc,
                    kcId: self.kcId
                };
                var success = function (result) {
                	if(result.resultCode==0){
                		 self.xyKcList = result.data ? result.data :[];
                	}
                };
                Service.get("/jxxt/api/admin/xykctj/search", data, success);
            },
            /**
             * 我管理的班级列表
             */
            getMyManagerBjList: function () {
                var self = this;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.bjList = result.data;
                    } else {

                    }
                };
                Service.get("/jwxt/admin/bj/myManagerClassList", null, success);
            },
            /**
             * 加载我管理的课程,此接口需要修改成根据课程查询，需传入课程id 
             */
            loadMyManageCourseList: function () {
                var self = this;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.kcList = result.data;
                    } else {

                    }
                };
               Service.get('/jxxt/api/admin/course/myManageCourseList', null, success);
            },
            /**
             * 重置搜索
             */
            restSearch: function () {
                this.xyMc = '';
                this.bjId = '';
                this.kcId = '';
                this.getXyKcList();
            },
            /**
             * 重新统计
             */
            restStatistics: function () {
                var self = this;
                var data = {
                    kcId: self.course.id
                };
                Service.get("/jxxt/api/admin/xykctj/tjKcJd", data,function(res){
                    if(res.success){
                        self.xyKcList = res.data;
                    }
                });
            }
        },
        created: function () {
             this.course = JSON.parse(this.$route.query.course);
             this.restStatistics()
             // this.getXyKcList();
             // this.getMyManagerBjList();
             // this.loadMyManageCourseList();
        },
        mounted: function () {
           
        }

    });
   return studentStatistic
});

