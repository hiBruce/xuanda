define([ 'Pagination', 'fcup'], function () {
    var hwManage = Vue.component('hwManage', {
        template: __inline("./index.tpl"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                showComment:true,
                hasComment:true,
               /* ueoption:{
                    autoHeightEnabled:false,
                    initialFrameHeight:300
                },*/
                zyList:[],
                status:'',
                detailList:[],
                row:[],
                pageSize:10,
                pageNo:1,
                pageContro:'',
                zyMcList:[],
                zymc:'',
                searchNum:0,
                zyzt:2,
                
                serarchName:"",
                inputName:"",
                lx:3
            };
        },
        methods: {
        	searchFun:function(){
        		this.lx = this.zyzt;
        		this.serarchName = this.inputName;
        		this.getList(1)
        	},
            getList:function(page){
                var self = this;
                
                // if($('#zymc').attr('value')==null||$('#zymc').attr('value')==undefined){
                //     $('#zymc').attr('value','')
                // }
                if(isNull(page)) page = 1;
                self.pageNo = page;
                var search = {
                    name:this.serarchName,
                    pageNo:self.pageNo,
                    pageSize:self.pageSize,
                    lx:this.lx,
                    // pickName:$('#zymc').attr('value'),
                    role:'teacher',
                    kcid:this.course.id
                };
                var success = function (ret) {
                    if(ret.success){
                        self.zyList = ret.data;
                        if(self.searchNum==0){
                            self.initSelect()
                        }

                        if (page == 1) {
                            self.pageContro.upDate({
                                pageTotal:ret.pageCount
                            });
                        }
                    }
                }
                Service.postBody('/jxxt/api/course/homework/list',search ,success)
            },
            initSelect:function () {
                var self = this;
                var arr = [];
                for(i=0;i<self.zyList.length;i++){
                    arr.push(self.zyList[i].zymc)
                }
                self.zyMcList = self.unique(arr)
                self.searchNum++
            },
            unique :function(array){
                var n = []; //一个新的临时数组
                //遍历当前数组
                for(var i = 0; i < array.length; i++){
                    //如果当前数组的第i已经保存进了临时数组，那么跳过，
                    //否则把当前项push到临时数组里面
                    if (n.indexOf(array[i]) == -1) n.push(array[i]);
                }
                return n;
            },
            demoShow:function(row){
                this.$modal.show(this,{
                    templateURL:__uri('/web/v/ucenter/homework_management/modal/modal_homework_pj.js'),//必填
                    cancelcb:this.closeModal,//点击关闭时的回调，如没有则不填
                    method:this.getList,
                    row:row,
                    title:"作业评价",//必填
                })
            },
            //改变ul中的值
            changeValue:function (event,id) {
                var liobj = event.target;
                $('#'+id).html(liobj.innerText+'<span class="caret"></span>')
                $('#'+id).attr('value',$(liobj).attr('value'))

            },
            
            deleteConfirm:function (row) {
                var self = this;
                self.row = row
                self.$modal.confirm('确定删除该作业吗？',self.deleteZy,null)
            },
            deleteZy:function () {

                var self = this;
                var success = function (ret) {
                    if(ret.success){
                        self.getList()
                    }
                }
                Service.postBody('/jxxt/api/course/homework/delete',self.row.id,success)
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                self.pageContro = new Pagination({
                    container: $('.hwmanagement_page'),//必填
                    pageTotal: 0,//必填，此处默认为0
                    callback: function (page) {//点击分页后的回调函数
                        self.getList(page);
                    }
                });
            },
            /*showRegonize:function(cb){

            },*/
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
            // /*
            // * 展示编辑
            // * */
            // showEdit:function(){
            //     var self = this;
            //     var pj = '';
            //     if(self.row.pjzt>0){
            //         pj = self.row.lspj;
            //     }
            //     this.showComment = false;
            //     CKEDITOR.replace('edit_container', { height: '240px', width: '100%' });
            //     setTimeout(function(){
            //         CKEDITOR.instances['edit_container'].setData(pj);
            //     },0)
            //    /* var optionArr = [{
            //         dom:'edit_container',
            //         placeholder:pj,//此处请放入已有的老师点评，没有则为空
            //     }];
            //    setTimeout(function(){
            //        self.setProUeditor(optionArr)
            //    },0)*/
            //
            // },
            /**
                * 关闭弹框
                * */
            closeModal: function () {
                var self = this;
                self.showComment = true;
                self.hasComment = true;
                //this.$modal.hide(this)
            },
            checkValue:function(val,event){
                var obj = event.target
                if(val == null || val == undefined){
                    $(obj).html('')
                }else {
                    $(obj).html(val)
                }
            },
        },
        created: function () {
        	this.course = JSON.parse(this.$route.query.course);
            $('#zyzt').attr('value','3')
            this.getList()
        },
        mounted: function () {
            this.pagination()
        }
    });
	return hwManage;

});
