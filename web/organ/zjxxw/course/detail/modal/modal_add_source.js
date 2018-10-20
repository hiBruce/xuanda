/*
*  新增资源
* */
define(function () {
    var modal = Vue.component('modal',{
        template: __inline("./modal_add_source.html"),
        data: function () {
            return {
                acceptTypeStr:"img",
                source:{
                    kcId:"",
                    zlmc:"",
                    zlUrl:"",
                    lx:"2"
                },
                sourceArr:[
                    {id:'img',name:"图片"},
                    {id:'video',name:"视频"},
                    {id:'doc',name:"文本"}
                ]
            }
        },
        watch:{
            acceptTypeStr:function(val){
               this.source.lx = (val==='img'?2:(val==='video'?1:3));
               this.uploadInit()
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
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
                                self.source.zlUrl = res.url;
                                self.$modal.success("上传成功")
                            } else {
                                self.$modal.error("上传失败")
                            }
                        }
                    });
                }
            },
            saveSource:function(){
                var self = this;
                var error="";
                for(key in this.source){
                    if(!self['source'][key]){
                        error =1;
                        break;
                    }
                }
                if(error){
                    this.$modal.error("请填写完整的信息");
                    return;
                }else{
                    ///jxxt/api/admin/kczl/update  kczl
                    Service.postBody('/jxxt/api/admin/kczl/update',this.source,function(result){
                        if(result.resultCode==0){
                            self.closeModal()
                            self.options.cb();
                        }else{
                            self.$modal.warn("保存失败")
                        }
                    })
                }

            }
        },
        created: function () {
        },
        mounted: function () {
            this.uploadInit();
            this.source.kcId= this.options.course.id;
        },
        props: ['options']
    });
    return modal
});