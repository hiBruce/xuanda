/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(['Pagination'], function () {
    var modal = Vue.component('modal', {
        template: __inline("./modal_exam_quote_tm.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                showlist : true,
                tmRow : [],
                kcRow : [],
                sjid : '',
                pageNo: 1,
                pageCon:"",
                searchOptions: {
                    sfgk: 2,
                    lx: 0,
                    mc: '',
                    kcid: '',
                    zsd : ''
                },
                checkboxModel:[],
                checked:false,
                currentTm : {}
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this);
            },
            //获取题库的题目
            tkTmList: function (pageNo) {
                var self = this;
                var pageNo = pageNo || 1;

                // 如果flag为true表明需要过滤试卷中已经存在的试题
                var data;
                if(self.options.flag){
                    data = {
                        pageNo: pageNo,
                        sjid : self.options.sjid,
                        tm: self.searchOptions
                    };
                }else{
                    data = {
                        pageNo: pageNo,
                        tm: self.searchOptions
                    };
                }

                var success = function (result) {
                    if (result.resultCode == "0") {
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        self.tmRow = result.data;
                        if (pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                        setTimeout(setfootDet, 0);
                        self.isAllChecked();
                    }
                };
                Service.postBody('/tkksxt/api/admin/tk/list_not_in_sj', data, success);
            },
            //获取我创建的课程列表
            wcjdkc: function () {
                var self = this;
                var data = {};
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.kcRow = result.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/myManageCourseList', data, success);
            },
            pageInit : function(){
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".selTk_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.tkTmList(page)
                    }
                })
            },
            selAllTm : function(){
                var self = this;

                if (this.checked) {//实现反选
                    if(self.tmRow.length>0){
                        for(var i=0;i<self.tmRow.length;i++){
                            if(self.checkboxModel.indexOf(self.tmRow[i].id)>-1){
                                self.checkboxModel.splice(self.checkboxModel.indexOf(self.tmRow[i].id),1);
                            }
                        }
                    }
                }else{//实现全选
                    if(self.tmRow.length>0){
                        for(var i=0;i<self.tmRow.length;i++){
                            if(self.checkboxModel.indexOf(self.tmRow[i].id)==-1){
                                self.checkboxModel.push(self.tmRow[i].id);
                            }
                        }
                    }
                }
            },
            selTm : function (tm) {
                var self = this;
                if(self.checkboxModel.indexOf(tm.id)>-1){
                    self.checkboxModel.splice(self.checkboxModel.indexOf(tm.id),1);
                }else{
                    self.checkboxModel.push(tm.id);
                }
                self.isAllChecked();
            },
            //判断全选状态
            isAllChecked : function(){
                var self = this;
                if(self.checked){
                    //当前是选中状态
                    if(self.tmRow.length>0){
                        for(var i=0;i<self.tmRow.length;i++){
                            if(self.checkboxModel.indexOf(self.tmRow[i].id)==-1){
                                //不包含
                                self.checked = false;
                                break;
                            }
                        }
                    }
                }else{
                    //当前是非选中状态
                    if(self.tmRow.length>0){
                        var flag = true;
                        for(var i=0;i<self.tmRow.length;i++){
                            if(self.checkboxModel.indexOf(self.tmRow[i].id)==-1){
                                //不包含
                                flag = false;
                                break;
                            }
                        }
                        if(flag){
                            self.checked = true;
                        }
                    }
                }
            },
            hideDetail : function(){
                this.showlist = true;
            },
            //查看题目
            viewTm : function(tm){
                var self = this;
                var data = {
                    id: tm.id
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.currentTm = result.data;
                        self.showlist = false;
                    }
                };
                Service.get('/tkksxt/api/admin/tk/getForEdit', data, success);

            },
            //保存选中的题目
            saveSelTm : function () {
                var self = this;
                if(self.checkboxModel.length>0){
                    var data = {
                        ids: self.checkboxModel.toString(),
                        sjid : self.options.sjid
                    };
                    var success = function (result) {
                        if (result.resultCode == "0") {
                            self.closeModal();
                            self.options.callback();
                        }
                    };
                    Service.post('/tkksxt/api/admin/sjtm/saveSelTms', data, success);
                }else{
                    this.$modal.warn("还未选择题目");
                }
            }
        },
        created: function () {

        },
        mounted: function () {
            this.pageInit();
            this.tkTmList();
            this.wcjdkc();
        },
        props: ['options']
    });
    return modal
});