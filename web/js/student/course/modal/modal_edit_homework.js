define(function () {
    var pro = Vue.component('modal', {
        template: __inline("/web/html/student/course/modal/modal_edit_homework.html"),
        data: function () {
            return {
                orignList:[],
                orignZy:[],
                zyDetail: [],
                zy: [],
               /* ueoption:{
                    toolbars: [[
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat', 'formatmatch', 'blockquote', 'pasteplain', '|', 'forecolor', 'insertorderedlist', 'insertunorderedlist', 'cleardoc', '|',
                        , 'lineheight', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                        'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                        'simpleupload', 'insertimage',  'insertvideo', 'attachment', 'insertframe', 'insertcode', 'template', 'background', '|',
                        'horizontal',  'spechars', 'wordimage', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',

                    ]],
                    autoHeightEnabled:false,
                    initialFrameHeight:100
                },*/
                idNum:0,
            }
        },
        methods: {
            getZyQuestion: function () {
                var self = this;
                var data = {zyid: self.zy.id}
                var success = function (ret) {
                    if (ret.success) {
                        self.zyDetail = ret.data;
                        self.orignList = ret.data;
                        setTimeout(function(){
                        self.loadData(self.zyDetail)
                        },0)
                    }
                }
                Service.postBody('/jxxt/api/course/homework/getZyQuestion', data, success);
            },
            loadData: function (obj) {
                /*var optionArr =[];
                var self = this;
                for ( var i = 0, len = obj.length; i < len; i++) {
                    optionArr.push({
                        dom: obj[i].id,
                        placeholder: obj[i].wt,
                    });
                }
                self.setProUeditor(optionArr)*/
                for ( var i = 0, len = obj.length; i < len; i++) {
                        CKEDITOR.replace(obj[i].id, { height: '240px', width: '100%' });
                        CKEDITOR.instances[obj[i].id].setData(obj[i].wt);
                }
            },
           /* setProUeditor: function (optionArr) {
                var self = this;
                optionArr.forEach(function (ele, i) {
                    var sue = UE.getEditor(ele.dom, self.ueoption);
                    sue.ready(function () {
                        sue.setHeight(200);
                        ele.placeholder && ( sue.setContent(ele.placeholder));
                        ele.cb && ele.cb()
                    });
                })
            },*/
            addQuestion:function () {
              var self = this;
              var question={
                  id:'a'+self.idNum,
                  wt:'',
                  zyid:self.zy.id,
                  delFlag:0
              }
              self.zyDetail.push(question);
              /*var optionArr =[];
                optionArr.push({
                    dom: question.id,
                    placeholder: question.wt,
                });
                setTimeout(function(){
                    self.setProUeditor(optionArr)
                },0)*/

                setTimeout(function(){
                    CKEDITOR.replace(question.id, { height: '240px', width: '100%' });
                    CKEDITOR.instances[question.id].setData(question.wt);
                },0)
                self.idNum += 1;
            },
            removeData:function (id) {
              var self = this;
              if( id != undefined){
                  for(i=0;i<self.zyDetail.length;i++){
                      if(self.zyDetail[i].id == id){
                          self.zyDetail.splice(i,1);
                          self.reloadData();
                      }
                  }
              }
            },
            reloadData:function () {
                var self = this;
                for(i=0;i<self.zyDetail.length;i++){
                    /*var sue = UE.getEditor(self.zyDetail[i].id, self.ueoption)
                    sue.setContent(self.zyDetail[i].wt)*/
                    CKEDITOR.replace(self.zyDetail[i].id, { height: '240px', width: '100%' });
                    setTimeout(function(){
                        CKEDITOR.instances[self.zyDetail[i].id].setData(self.zyDetail[i].wt);
                    },0)
                }
            },
            closeModal: function () {
                this.$modal.hide(this)
                this.zy = this.cloneObj(this.orignZy)
                this.zyDetail = this.cloneObj(this.orignList)
            },
            cloneObj : function (obj) {
                var newObj = {};
                if (obj instanceof Array) {
                    newObj = [];
                }
                for (var key in obj) {
                    var val = obj[key];
                    //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
                    newObj[key] = typeof val === 'object' ? this.cloneObj(val): val;
                }
                return newObj;
            },
            submit:function () {
                var self = this;
                self.zy.wtList = []
                for(i=0;i<self.zyDetail.length;i++){
                    var obj = self.zyDetail[i];
                    obj.wt = CKEDITOR.instances[self.zyDetail[i].id].getData();
                }
                var data = {zy:self.zy,questionList:self.zyDetail,loading:true}
                $('.confirm_btn').html('稍候...')
                var success = function (ret) {
                    if(ret.success){
                        self.closeModal();
                        self.options.method()
                    }else{
                        $('.confirm_btn').html('提交失败，重新提交')
                        self.$modal.tip("error",'系统发生未知错误')
                    }
                }
                Service.postBody('/jxxt/api/course/homework/addHomework',data,success)
            }
        },
        created: function () {
            var self = this;
            self.zy = this.options.zy;
            self.orignZy = this.options.zy;
            self.getZyQuestion();
        },
        mounted: function () {

        },
        props: ['options']
    });
    return pro
});