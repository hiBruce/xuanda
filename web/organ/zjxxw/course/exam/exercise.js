/**
 * 考试--查看试题
 */
define([__uri('/web/v/ucenter/menu.js')], function (menu) {
    menu.init();
    var app = new Vue({
        el: ".page",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                danxRow : [],
                duoxRow : [],
                pandRow : [],
                zhugRow : [],
                wxtkRow : [],
                ydljRow : [],
                danxZf : 0,
                duoxZf : 0,
                pandZf : 0,
                zhugZf : 0,
                wxtkZf : 0,
                ydljZf : 0,
                sj : {},
                submitFlag : true,
                chapterName:''
            };
        },
        methods: {
            //根据试卷id和课程id获取试卷题目信息，包括分值
            sjTmList: function () {
                var self = this;
                var data = {
                    pageNo : -1,
                    sjid: $("#examId").val(),
                    kcid:$("#courseId").val(),
                    loading : true
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.danxRow = result.data.danxList;
                        self.duoxRow = result.data.duoxList;
                        self.pandRow = result.data.pandList;
                        self.zhugRow = result.data.zhugList;
                        self.wxtkRow = result.data.wxtkList;
                        self.ydljRow = result.data.ydljList;
                        self.danxZf = result.data.danxZf;
                        self.duoxZf = result.data.duoxZf;
                        self.pandZf = result.data.pandZf;
                        self.zhugZf = result.data.zhugZf;
                        self.wxtkZf = result.data.wxtkZf;
                        self.ydljZf = result.data.ydljZf;
                    }
                };
                Service.postBody('/tkksxt/api/admin/sjtm/list', data, success);
            },
            getSj : function () {
                var self = this;
                var data = {
                    id: $("#examId").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.sj = result.data;
                    }
                };
                Service.get('/tkksxt/api/admin/sj/get', data, success);
            },
            //关闭
            closeModel : function () {
                window.close();
            },
            submitForm : function () {
                var self = this;
                var formData = decodeURI($('#ksForm').serialize());
                formData = decodeURIComponent(formData.replace(/\+/g,"  "));
                var data = {
                    formData : formData,
                    sjid : $("#examId").val(),
                    kcid : $("#courseId").val(),
                    kcnrid : $("#chapterId").val(),
                    loading: true
                }

                var success = function (result) {
                   /* if (result.resultCode == "0") {

                        window.location.href = "/course/detail/"+$("#courseId").val();
                    }*/
                    if (result.resultCode == "0") {
                        self.$modal.confirm("提交成功",function(){
                            window.location.href = "/course/detail/"+$("#courseId").val()+"#/exercise";
                            //window.location.href = "/ucenter/exercise";
                        },1);
                    }else{
                        self.$modal.error("提交失败");
                        self.submitFlag = true;
                    }
                };

                if(this.submitFlag){
                    self.submitFlag = false;
                    Service.post('/tkksxt/api/student/submitExercise', data, success);
                }
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
        created: function () {
            this.sjTmList();
            this.getSj();
        },
        mounted: function () {
            this.getChapterName();
        }

    });
});