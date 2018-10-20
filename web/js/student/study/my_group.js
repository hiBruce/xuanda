/**
 * 我的课程
 */
define(['../menu.js',"Pagination", 'fcup'], function (menu) {
    menu.init();
    var classManage = new Vue({
        el: "#app",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                pageCon: {},
                groupList: [],
                tablistNum: 0,
                typList: [],//创建圈子时的标签列表
                classList: [],//创建圈子时的圈子分类
                showTypelist: [],//根据圈子分类筛选出来的标签
                selTypeList: [],//选中的圈子标签
                classSel: '',
                openType: 0,
                createGroupName: '',
                pictureUrl: "",
                synopsis: ''
            };
        },
        watch: {
            classSel: {
                handler: function (val) {
                    var self = this;
                    this.selTypeList = [];
                    this.showTypelist = this.typList.filter(function (ele) {
                        if (ele.groupClassId === self.classList[val].id) {
                            return ele;
                        }
                    });
                }
            }
        },
        methods: {
            getDataList: function (pageNum) {
                var self = this;
                let pageNo = pageNum ?pageNum : 1;
                var params = {
                    pageNo: pageNo,
                    role: this.tablistNum,
                    loading: true
                };
                Service.get('/zjxxw/api/groupmgr/group/myGroup', params, function (res) {
                    if (res.success) {
                        self.groupList = res.data;
                        if (pageNo <= 1) {
                            var pageTotal = Math.ceil(res.page.rowCount / res.page.pageSize);
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        }
                    }
                });
            },
            tabList: function (num) {
                this.tablistNum = num;
                if (num === 3) {
                    this.createGroup();
                } else {
                    this.getDataList(1);
                }
            },
            createGroup: function () {
                setTimeout(this.uploadAvatar, 10);
                // setTimeout(initCrop,10)
                this.getTypeList();
                this.getClassList();
            },
            getTypeList: function () {//标签
                if (this.typList.length < 1) {
                    var self = this;
                    Service.get('/zjxxw/api/groupmgr/group/loadTypeList', null, function (res) {
                        if (res.success) {
                            self.typList = res.data;
                        }
                    });
                }
            },
            getClassList: function () {//课程分类
                if (this.classList.length < 1) {
                    var self = this;
                    Service.get('/zjxxw/api/groupmgr/group/loadClassList', null, function (res) {
                        if (res.success) {
                            self.classList = res.data;
                        }
                    });
                }

            },
            seleType: function (ind) {
                var self = this;
                var hasThis = this.selTypeList.filter(function (ele) {
                    if (ele.id === self.showTypelist[ind].id) {
                        return ele;
                    }
                });
                if (hasThis.length < 1) {
                    this.selTypeList.push(this.showTypelist[ind]);
                }
            },
            deleSelType: function (ind) {
                this.selTypeList.splice(ind, 1);
            },
            setOpenType: function (num) {
                this.openType = parseInt(num);
            },
            createGroupSubmit: function () {
                var params;
                var self = this;
                try {
                    params = {
                        name: this.createGroupName,
                        openType: 0,
                        pictureUrl: this.pictureUrl,
                        classId: this.classList[this.classSel].id,
                        synopsis: this.synopsis,
                        typeIds: '',
                        type: ''
                    };
                    //selTypeList
                    var typeIdsArr = [];
                    var typeArr = [];
                    this.selTypeList.forEach(function (ele) {
                        typeIdsArr.push(ele.id);
                        typeArr.push(ele.name);
                    });
                    params.typeIds = typeIdsArr.join(',');
                    params.type = typeArr.join(',');
                    for (var ele in params) {
                        if (params.hasOwnProperty(ele)&&ele !== 'openType' && ele !== 'type' && ele !== 'typeIds' && !params[ele]) {
                            self.$modal.confirm('请填写完整信息');
                            return;
                        }
                    }
                    Service.postBody('/zjxxw/api/groupmgr/group/update', params, (res)=>{
                        if (res.success) {
                            this.tabList(1);
                            this.clearInput();
                        }
                    });

                } catch (e) {
                    self.$modal.confirm('请填写完整信息');
                }
            },
            clearInput(){
                this.createGroupName = '';
                this.pictureUrl = '';
                this.classList = [];
                this.synopsis = '';
                this.selTypeList = [];
            },
            uploadAvatar: function () {
                $("#result").on("click", function () {
                    $("#files").find('input').click();
                });
                var self = this;
                $.fcup({
                    updom: '#files',//这个是页面里定义好的一个元素
                    upurl: '/upfile',
                    upstr: self.pictureUrl ? '修改头像' : '上传头像',
                    upfinished: self.pictureUrl ? '修改头像' : '上传头像',
                    maxSize: 2,
                    acceptType: 'img',
                    upcallback: function (res) {
                        if (res.success) {
                            self.pictureUrl = res.url;
                        } else if (res.resultCode === '2001') {
                            self.$modal.error(res.message);
                        } else {
                            self.$modal.error('上传失败');
                        }
                    },
                    errorcb: function (message) {
                        self.$modal.error(message);
                    }
                });
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".page-info"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getcjList(page);
                    }
                });
            }

        },
        created: function () {
            window.loading();
            this.getDataList(1);
        },
        mounted: function () {
            if (this.tablistNum ===3) {
                this.createGroup();
            }
            this.pageInit();
        }

    });
    return classManage;
});