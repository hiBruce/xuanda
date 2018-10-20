import page from "Pagination";
mod.add_xz = Vue.component('add_xz', {
    template: __inline("/web/html/teacher/question_library/add_xz.html"),
    data: function () {
        return {
            letterArray:['A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
            selectOptionsArr:[],
            tm :{
                mc:'',
                lx : 1,
                sfgk : 0,
                zsd : '',
                zqda : '',
                bz:'',
                id:'',
                kcid:''
            },
            submitFlag : true,
            sjtmFlag : ''//如果这个值为1表示是在试卷题目那里进行的编辑，则需要获取sjtmxx而不是tmxx
        };
    },
    methods: {
        setProUeditor:function(optionArr){
            var self = this;
            Vue.nextTick(function(){
                optionArr.forEach(function(ele,i){
                    CKEDITOR.replace(ele.dom, { height: '60px' });
                    CKEDITOR.instances[ele.dom].setData(ele.placeholder);
                    ele.cb && ele.cb()
                })
            })
        },
        /*
        * 添加选项
        * */
        addNewOption:function(){
            if(this.selectOptionsArr.length<this.letterArray.length){
                var self = this;
                this.selectOptionsArr.push({id:self.letterArray[self.selectOptionsArr.length],content:''});
                self.setProUeditor([{
                    dom:'select_option_'+(self.letterArray[self.selectOptionsArr.length-1]),
                }])
            }
        },
        /*
        * 删除选项
        * */
        delOption:function(option,ind){
            var self = this;
            Dialog.confirm('确定要删除此选项吗？',function(){
                self.selectOptionsArr.forEach(function(ele,i){
                    ele.content = CKEDITOR.instances['select_option_'+self.letterArray[i]].getData()
                })
                self.selectOptionsArr.splice(ind,1);
                self.selectOptionsArr.forEach(function(ele,i){
                    ele.id = self.letterArray[i];
                    CKEDITOR.instances['select_option_'+ele.id].setData(ele.content);
                })

            })
        },
        /*
       * 关闭弹框
       * 参数：1、不带modal_的页面名称，2、all，代表关闭所有弹框
       * */
        closeModal: function () {
            this.$modal.hide(this);
        },
        //选择正确选项
        selOptioin : function(option){
            var self = this;
            //判断当前题目类型
            if(this.tm.lx==1){
                //单选题
                //先去除其他选择项
                //获取所有选项
                if(self.selectOptionsArr.length>0){
                    for(var i=0;i<self.selectOptionsArr.length;i++){
                        self.selectOptionsArr[i].isSelect = 0;
                    }
                }
            }
            option.isSelect =1 ;
        },
        //保存选择题
        saveSelect : function(){
            var self = this;

            if(this.submitFlag){
                this.submitFlag = false;

                //获取所有选项
                var selOptions = self.selectOptionsArr;

                if(selOptions.length==0){
                    self.$modal.warn('还没有选项');
                    this.submitFlag = true;
                }else if(!CKEDITOR.instances['select_container'].document.getBody().getText().trim()){
                    self.$modal.warn('题目内容不能为空');
                    this.submitFlag = true;
                }else{
                    var selXx = "";
                    var zqda = "";//正确选项
                    var kflag = false;
                    for(var i=0;i<selOptions.length;i++){
                        if(CKEDITOR.instances['select_option_'+selOptions[i].id].document.getBody().getText().trim()){
                            //拼接选项
                            //A--1--content----B--1--content----C--0--content
                            if(!selOptions[i].isSelect){
                                selOptions[i].isSelect = 0;
                            }

                            selXx += self.letterArray[i]+"--"+selOptions[i].isSelect+"--"+ CKEDITOR.instances['select_option_'+selOptions[i].id].getData();
                            if(i<(selOptions.length-1)){
                                selXx += "----";
                            }
                            //正确答案
                            if(selOptions[i].isSelect==1){
                                zqda += self.letterArray[i]+",";
                            }
                        }else{
                            //选项为空了
                            kflag = true;
                            break;
                        }
                    }

                    if(kflag){
                        self.$modal.warn(self.letterArray[i]+'选项还没填写');
                        this.submitFlag = true;
                    }else{
                        //判断是否选择了正确选项
                        if(zqda==""){
                            self.$modal.warn('未设置正确答案');
                            this.submitFlag = true;
                        }else{
                            self.tm.mc = CKEDITOR.instances['select_container'].getData();
                            self.tm.bz = CKEDITOR.instances['select_answer_container'].getData();
                            self.tm.zqda = zqda.substring(0,zqda.length-1);
                            var data = {
                                tm : self.tm,
                                tmxxInfo : selXx,
                                sjid : self.options.sjid,
                                sjtmFlag:self.sjtmFlag
                            };
                            var success = function (result) {
                                if (result.resultCode == "0") {
                                    self.closeModal();
                                    //回调主页面刷新列表
                                    self.options.callback();
                                }
                            };
                            Service.postBody('/tkksxt/api/admin/tk/saveOrUpdateXz', data, success);
                        }
                    }
                }

            }

        },

        //初始化编辑器
        initUe:function(){
            var optionArr = [{
                dom:'select_answer_container',
            },{
                dom:'select_container',
            }]
            this.selectOptionsArr.forEach(function(ele,ind){
                optionArr.push({
                    dom:'select_option_'+ele.id,
                })
            })
            this.setProUeditor(optionArr)
        },
        editUe:function(){
            var optionArr = [{
                dom:'select_answer_container',
                placeholder:this.tm.bz||''
            },{
                dom:'select_container',
                placeholder:this.tm.mc||''
            }]
            this.selectOptionsArr.forEach(function(ele,ind){
                optionArr.push({
                    dom:'select_option_'+ele.id,
                    placeholder:ele.content||''
                })
            })
            this.setProUeditor(optionArr)
        },
    },
    created: function () {
        var self = this;
        if(self.options.editTm){
            //编辑
            self.tm.id = self.options.editTm.id;
            self.tm.mc = self.options.editTm.mc;
            self.tm.lx = self.options.editTm.lx;
            self.tm.sfgk = self.options.editTm.sfgk;
            self.tm.zsd = self.options.editTm.zsd;
            self.tm.zqda = self.options.editTm.zqda;
            self.tm.bz = self.options.editTm.bz;
            self.tm.kcid = self.options.editTm.kcid;

            if(self.options.sjtmFlag=='1'){
                //从试卷那边过来的
                self.sjtmFlag = self.options.sjtmFlag;

                //获取当前题目的所有选项
                var data = {tmid:self.tm.id};
                var success = function (result) {
                    if (result.resultCode == "0") {
                        //初始化selectOptionsArr
                        self.selectOptionsArr = [];
                        if(result.data.length>0){
                            for(var i=0;i<result.data.length;i++){
                                var tmxx = {
                                    content:result.data[i].xxnr,
                                    isSelect:result.data[i].sfzq,
                                    id:result.data[i].xx
                                }
                                self.selectOptionsArr.push(tmxx);
                            }
                        }
                        self.editUe();
                    }
                };
                Service.get('/tkksxt/api/admin/sjtmxx/getSjTmXxByTm', data, success);
            }else{
                //获取当前题目的所有选项
                var data = {tmid:self.tm.id};
                var success = function (result) {
                    if (result.resultCode == "0") {
                        //初始化selectOptionsArr
                        self.selectOptionsArr = [];
                        if(result.data.length>0){
                            for(var i=0;i<result.data.length;i++){
                                var tmxx = {
                                    content:result.data[i].xxnr,
                                    isSelect:result.data[i].sfzq,
                                    id:result.data[i].xx
                                }
                                self.selectOptionsArr.push(tmxx);
                            }
                        }
                        self.editUe();
                    }
                };
                Service.get('/tkksxt/api/admin/tmxx/getTmXxByTm', data, success);
            }

        }else{
            //在试卷中新增题目
            if(self.options.sjtmFlag=='1'){
                self.sjtmFlag = self.options.sjtmFlag;
            }
            self.tm.kcid = this.options.kcid;
            self.initUe();
        }
    },
    created: function () {
    },
    mounted: function () {
    },
    props: ['options']
});
