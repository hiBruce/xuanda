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
                pageNo: 1,
                pageCon: {},
                // 页面数据模型
                rows: [],
                message: '操作成功',
                //classify : ['课程收藏','活动收藏','圈子收藏','笔记收藏'],
                classTypeNum: 0,
                keyword: '',
                hasChecked: 0,
                checkArr: []
            };
        },
        methods: {
            checkedAll: function () {
                if (!this.hasChecked) {
                    var _this = this;
                    _this.checkArr = [];
                    this.rows.forEach(function (ele) {
                        _this.checkArr.push(ele.id);
                    });
                } else {
                    this.checkArr = [];
                }
            },
            delStore: function (id) {
                var self = this;
                this.$modal.confirm("确定要删除吗？", function () {
                    Service.post('/zjxxw/api/collect/cancel', {collectId: id}, function (res) {
                        if (res.success) {
                            var data = {
                                scfl: self.classTypeNum + 1,
                                pageNo: 1
                            };
                            if (data.scfl === 4) {
                                Service.post("/jxxt/api/course/notes/updateCollectNum", {
                                    id: id,
                                    num: -1
                                });
                            }
                            self.getDataList(data);
                            self.$modal.success('删除成功！');
                        } else {
                            self.$modal.error(res.message);
                        }
                    });
                });
            },
            myClassify: function () {
                var self = this;
                var success = function (result) {
                    self.classify = result.data;
                };
                Service.postBody('/zjxxw/api/userapps/myClassify', null, success);
            },
            /**
             *  根据分类标签查询
             */
            searchClassify: function (ind) {
                if (!ind) {
                    ind = 0;
                }
                this.hasChecked = 0;
                this.classTypeNum = parseInt(ind);
                var data = {
                    scfl: this.classTypeNum + 1,
                    pageNo: 1
                };
                this.getDataList(data);
            },
            getDataList: function (data) {
                var self = this;
                data.loading = true;
                Vue.set(this, 'rows', []);
                var success = function (result) {
                    if (result.success) {
                        result.data.forEach(function (ele) {
                            if (ele.content) {
                                self.rows.push(JSON.parse(ele.content));
                            }
                        });
                        if (result.page && data.pageNo === 1) {
                            var pageTotal = Math.ceil(result.page.rowCount / result.page.pageSize);
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            });
                        } else if (!result.page && data.pageNo === 1) {
                            self.pageCon.upDate({
                                pageTotal: 0
                            });
                        }
                    }
                    setTimeout(setfootDet, 0);
                };
                Service.get('/zjxxw/api/collect/myList', data, success);
            },
            searchKeyWord: function () {
                var data = {
                    scfl: this.classTypeNum + 1,
                    pageNo: 1,
                    conditions: this.keyword
                };
                Service.get('/zjxxw/api/collect/search', data);
            },
            showInput: function () {
                $("#addclassify").css("display", "");
            },
            closeInput: function () {
                $("#addclassify").css("display", "none");
            },
            addClassify: function () {
                var self = this;
                var addval = $("#classifyInput").val();
                if (isNull(addval) || addval.isEmpty()) {
                    FormValidator.showInputTips($("#classifyInput"), '分类名称不能为空！');
                    return;
                }
                var data = {
                    "collectClassify": $("#classifyInput").val()
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.confirm(self.message);
                        self.myClassify();
                    } else {
                        self.$modal.confirm(result.message);
                    }
                };
                Service.postBody('/zjxxw/api/userapps/addClassify', data, success);
            },
            removeClass: function () {
                var self = this;
                var checkedids = '';
                var checklist = $('ul input[type=checkbox]:checked');
                for (var i = 0; i < checklist.length; i++) {
                    checkedids = checkedids + $(checklist[i]).attr("name") + ',';
                }
                if (checkedids.length === 0){
                    self.$modal.confirm('请选择要删除的内容！');
                } else{
                    checkedids = checkedids.substring(0, checkedids.length - 1);
                }
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".page-warp"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getcjList(page);
                    }
                });
            }

        },
        created: function () {
            window.loading();
            this.searchClassify();
            this.pageInit();
        },
        mounted: function () {
        }

    });
    return classManage;
});