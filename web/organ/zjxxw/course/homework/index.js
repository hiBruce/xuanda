/**
 * 我的课程
 */
define(['fcup'], function () {
    var app = new Vue({
        el:".page",
        delimiters: ['{%', '%}'],
        data : function (){
            return {
                myCourses: {},
                zyid:$('#workid').attr('value'),
                zyXy:[],
                detailList:[],
                lx:'2',
                acceptTypeStr:"img",
                sourceArr:[
                    {id:'img',name:"图片"},
                    {id:'video',name:"视频"},
                    {id:'doc',name:"文本"}
                ],
                chapterName : ''
            }
        },
        watch:{
            acceptTypeStr:function(val){
                this.lx = (val==='img'?2:(val==='video'?1:3));
                this.uploadInit()
            }
        },
        methods : {
            //根据node端获取的参数 对作业详情进行查询
            getList:function () {
                var  self = this;
                var data = {zyid:self.zyXy.zyid,xyid:self.zyXy.xyid,zyxyid:self.zyXy.id};
                var success = function (ret) {
                    self.detailList = ret.data;
                    Vue.nextTick(function () {
                        window.setfootDet()
                    })
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
            uploadInit:function(){
                var self = this;
                if(self.acceptTypeStr){
                    $.fcup({
                        updom: '.upload_source_btn',//这个是页面里定义好的一个元素
                        upurl: '/upfile',
                        upstr: '上传资源',
                        upfinished: '上传资源',
                        acceptType:self.acceptTypeStr,
                        maxSize:'200',
                        errorcb:function(){
                            self.$modal.warn("请上传指定格式的资源")
                        },
                        upcallback: function (res) {
                            if (res.resultCode == 0) {
                                self.zyXy.wjlj = res.url;
                                $('#zylj').html(res.url)
                                self.zyXy.wjmc = res.filename;
                                $('#zymc').html(res.filename)
                                self.$modal.success("上传成功");
                                Vue.nextTick(function () {
                                    window.setfootDet()
                                })
                            } else {
                                self.$modal.error("上传失败")
                            }
                        }
                    });
                }
            },
            //提交作业
            submit:function () {
                var self = this;
                $('.confirm_btn').html('稍候...');
                var kcid = $("#kcid").val();
                var validationOptions = {
                    showIputTips: true,
                    showInputBorderRed: true,
                    showLabelRed: true
                };
                self.zyXy.xydaList = self.detailList;
                self.zyXy.homework = [];
                self.zyXy.kcnrid = $("#kcnrid").val();
                self.zyXy.loading=true;
                var success = function (result) {
                    if(result.success){
                       location.href='/course/detail/'+kcid+'#/courseMenu'
                    }else{
                        $('.confirm_btn').html('提交失败，重新提交')
                        self.$modal.tip("error",'系统发生未知错误')
                    }
                };
                // FormValidator.validate('zyForm', function (errors, validator) {
                Service.postBody('/jxxt/api/course/homework/submit',self.zyXy, success);
                // }, validationOptions);
            },
            clearErrors:function () {
                $('textarea').bind('oninput propertychange', function() {
                    FormValidator.clearErrorStatus($('#zyForm'));
                });
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
            var self = this;
            self.getZyXy();
        },
        mounted:function(){
            this.clearErrors();
            this.uploadInit()
            this.getChapterName();
        }

    });
});