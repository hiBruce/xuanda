define(['ckeditor'], function () {
    var pro = Vue.component('modal', {
        template: __inline("/web/html/ucenter/homework/modal_comment_pj.html"),
        data: function () {
            return {
                showComment: true,
                hasComment: true,
                /*     ueoption:{
                         autoHeightEnabled:false,
                         initialFrameHeight:300
                     },*/
                zyList: [],
                status: '',
                detailList: [],
                row: []
            };
        },
        methods: {
            //根据node端获取的参数 对作业详情进行查询
            showModal: function () {
                var self = this;
                var data = {zyid: self.row.zyid, xyid: self.row.xyid, zyxyid: self.row.id};
                var success = function (ret) {
                    if (ret.success) {
                        self.detailList = ret.data;
                        self.row.xydaList = ret.data;
                        if (self.row.pjzt == 0) {
                            self.showEdit2();
                        }
                    }
                };
                Service.postBody('/jxxt/api/course/homework/detail', data, success);
            },
            /* setProUeditor:function(optionArr){
                 var self = this;
                 optionArr.forEach(function(ele,i){
                     sue = UE.getEditor(ele.dom,self.ueoption);
                     sue.ready(function () {
                         ele.placeholder&& ( sue.setContent(ele.placeholder))
                         ele.cb && ele.cb()
                     });
                 })
             },*/
            /*
            * 展示编辑
            * */
            showEdit2: function () {
                var self = this;
                var pj = '';
                if (self.row.pjzt > 0) {
                    pj = self.row.lspj;
                }
                this.showComment = false;
                /* var optionArr = [{
                     dom:'edit_container',
                     placeholder:pj,//此处请放入已有的老师点评，没有则为空
                 }];
                 setTimeout(function(){
                     self.setProUeditor(optionArr)
                 },0)*/

                Vue.nextTick(function () {
                    CKEDITOR.replace('edit_container', {height: '240px', width: '100%'});
                    CKEDITOR.instances['edit_container'].setData(pj);
                });
            },
            closeEdit: function () {
                this.showComment = true;
            },
            checkData: function () {
                var self = this;
                var realText = CKEDITOR.instances['edit_container'].document.getBody().getText().trim();
                realText.replace(/\&nbsp;/g, " ");
                if (!realText) {
                    self.$modal.tip('error', '请输入评价');
                    return;
                } else if (realText.length > 500) {
                    this.$modal.warn("点评内容不能超过500字，当前字数:" + realText.length);
                    return;
                } else {
                    self.row.lspj = CKEDITOR.instances['edit_container'].getData();
                }
                self.submit();
            },
            submit: function () {
                this.$modal.loading();
                var self = this;
                //console.log(UE.getEditor('edit_container').getContent())
                /*if(UE.getEditor('edit_container').getContent().isEmpty()){
                    alert('请输入评价！')
                    return;
                }else{

                    self.row.lspj = UE.getEditor('edit_container').getContent();
                }*/
                var success = function (ret) {
                    self.$modal.removeLoad();
                    if (ret.success) {
                        self.$modal.success("保存成功");
                        self.$modal.hide(self);
                        self.options.method();
                    } else {
                        self.$modal.error('提交失败，重新提交');
                    }

                };
                Service.postBody('/jxxt/api/course/homework/submit', self.row, success);
            }
            /*   /!*
              * 关闭弹框
              * *!/
               closeModal: function () {
                   var self = this;
                   if(self.showComment==false){

                       UE.getEditor('edit_container',self.ueoption) && UE.getEditor('edit_container',self.ueoption).destroy();
                   }
               }*/
        },
        created: function () {
            var self = this;
            self.row = this.options.row;
            self.row.homework = [];
            self.showModal();
        },
        mounted: function () {
        },
        props: ['options']
    });
    return pro;
});