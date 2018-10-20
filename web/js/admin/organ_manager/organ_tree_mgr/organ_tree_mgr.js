import page from "Pagination";
mod.organ_tree_mgr = Vue.component('organ_tree_mgr', {
    template: __inline("/web/html/admin/organ_manager/organ_tree_mgr/organ_tree_mgr.html"),
    data: function () {
        return {
            treeNodes : [],
            kc_list : [],
            dwId: '',
            selDwId : '',
            selDwName : '',
            pageSize: 10,
            pageNo: 1,
            fpFlag : false
        };
    },
    methods: {
        getJxdList: function (page) {
            var self = this;
            var success = function (result) {
                if (result.success) {
                    self.dwId = result.data[0].id;
                    self.init(self.dwId);
                } else {
                    self.$modal.tip('error', result.message);
                }
            };
            Service.get('/centro/api/dw/jxdList', null, success);
        },

        init: function (dwId) {
            var self = this;
            var data = {
                dwId : dwId
            };
            this.setSty()
            var success = function (result) {
                self.treeNodes = result.data;
                self.treeNodes.forEach(function(ele){
                    ele.open = false
                })
                self.initZtree();
            };
            Service.get("/centro/api/dw/children_tree", data, success);
        },
        setSty:function(){
            var wh = window.innerHeight;
            var headWh = $(".header-1").height();
            var  maxWh = wh - headWh - 20;
            $(".table_wrap").css("height",maxWh)
            $("#tree").css("height",maxWh-40);
            $("#simple-table").css("minHeight",maxWh-40);
        },
        /**
         * 初始化树
         */
        initZtree: function () {
            var self = this;
            var leftClick = function (event, treeId, treeNode) {
                //左键点击查看当前  单位 或者 部门下的已发布课程
                if(self.dwId==treeNode.id){
                    self.fpFlag = false;
                }else{
                    self.fpFlag = true;
                }
                self.selDwId = treeNode.id;
                self.selDwName = treeNode.name;
                self.list();
            };

            var setting = {
                data: {simpleData: {enable: true}},
                callback: {
                    onClick: leftClick
                }
            };

            var zNodes = this.treeNodes;
            $.fn.zTree.init($("#tree"), setting, zNodes);
            setTimeout(setfootDet, 60);
        },
        /**
         * 取得父节点
         * @param id
         * @returns {*}
         */
        getParentNode: function (id) {
            var treeObj = $.fn.zTree.getZTreeObj("xxTree");
            var nownode = treeObj.getNodesByParam("id", id, null);
            var parent = nownode[0].getParentNode();
            return parent;
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
                    self.list(page);
                }
            });
        },
        //分配课程
        fpkc : function(){
            //弹出选择课程页面
            var self = this;
            this.$modal.show(this, {
                templateURL: __uri('/web/v/ucenter/glzx/jxdfk/jxdfk.js'),
                title: "分配课程",
                dwId : self.dwId,
                selDwId: self.selDwId,
                selDwName : self.selDwName,
                callback : self.list
            });
        },
        //课程list
        list: function (page) {
            var self = this;
            if (page == null || page == '') {
                page = 1;
            }
            self.pageNo = page ? page : self.pageNo;
            var param = {
                dwId: self.selDwId,
                pageNo: self.pageNo,
                pageSize: 10,
                loading: true
            };

            var success = function (result) {
                self.kc_list = result.data;
                if (self.pageNo == 1) {
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                    self.pageContro.upDate({
                        pageTotal: pageTotal
                    });
                }
            };
            Service.get("/jxxt/api/admin/dwkc/dwKcXx", param, success);
        },
    },
    created: function () {
        this.getJxdList()
    },
    mounted: function () {
        var self = this;
        //this.init();
        this.pagination();
    }
});
