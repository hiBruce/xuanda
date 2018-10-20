
/**
 * 学生成绩
 */
define(['confirm'], function () {
     var xscj = Vue.component('xscj', {
        template: __inline('./xscj.html'),
        data: function () {
            return {
                xyKcList: [],
                bjList: [],
                kcList: [],
                xyMc: '',
                bjId: '',
                kcId: '',
                pageNo:1
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
                    bjId: self.bjId,
                    kcId: self.kcId
                };
                var success = function (result) {
                    self.xyKcList = result.data;
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
             * 加载我管理的课程
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
            restSearch: function (pageNo) {
                var pageNo = pageNo || this.pageNo;
                var self = this;
                Service.get("/jxxt/api/admin/xykctj/getCj",{
                    kcId:$("#courseId").val(),//课程ID，字符串，必填
                   pageNo:pageNo//当前页，可选参数，默认为1
                },function(res){
                    if(res.success){
                        self.xyKcList = res.data;
                    }
                })
            },
            /**
             * 重新统计
             */
            restStatistics: function () {
                var self = this;
                var data = {
                    name: self.xyMc,
                    bjId: self.bjId,
                    kcId: $("#courseId").val()
                };
                Service.get("/jxxt/api/admin/xykctj/tjKcCj", data,function(res){
                    if(res.success){
                         self.restSearch(1)
                    }
                   
                });
            }
        },
        created: function () {
            this.restStatistics()
        },
        mounted: function () {
        }

    });
     return xscj;
});