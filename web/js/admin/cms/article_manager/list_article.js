import page from "Pagination";
mod.list_article = Vue.component('list_article', {
    template: __inline("/web/html/admin/cms/article_manager/list_article.html"),
    data: function () {
        return {
            node : null,
            keyword : '',
            articles : [],
            pageContro: '',
            auditStatus : 0,
            delFlag : 0
        };
    },
    methods: {
        /**
         * 获取栏目tree
         */
        loadChannels: function () {
            var self = this;
            var success = function (result) {
                self.node = result.data;
                self.initZtree();
            };
            var data = {
                _source_: 'aCms',
                loading: true
            };
            Service.get("/api/channel/tree", data, success);
        },
        initZtree: function () {
            var self = this;

            var leftClick = function (event, treeId, treeNode) {
                self.loadArticles(page);
            };

            var setting = {
                data: {simpleData: {enable: true}},
                callback: {
                    onClick: leftClick,
                }
            };
            var zNodes = this.node;
            $(document).ready(function () {
                $.fn.zTree.init($("#ztree"), setting, zNodes);
            });
        },

        /**
         * 获取文章信息
         * @param page
         */
        loadArticles: function (page) {
            var self = this;

            // 取得当前所选择的栏目id
            var tobj = $.fn.zTree.getZTreeObj("ztree");
            var nodes = tobj.getSelectedNodes();
            if (nodes.length == 0) {
                return;
            }
            var currentChannelId = nodes[0].id;

            if (isNull(page)) page = 1;
            self.pageNo = page;
            var param = {
                _source_: 'aCms',
                pageNo: self.pageNo,
                pageSize: self.pageSize,
                auditStatus : self.auditStatus,
                delFlag : self.delFlag,
                name: $("#searchName").val(),
                channelId: currentChannelId,
                loading: true
            };
            var success = function (result) {
                if (result.success) {
                    self.articles = result.data;
                    Vue.nextTick(function () {
                        window.setfootDet();
                    });
                    if (page == 1) {
                        self.pageContro.upDate({
                            pageTotal: result.pageCount
                        });
                    }
                }
            };
            Service.get("/api/content/list", param, success);
        },

        /**
         * 删除文章
         * @param user
         */
        moveToTrash: function (user) {
            var self = this;
            self.$modal.confirm("删除教师[ " + (user.name ? user.name : '') + " ]？", function () {
                var params = {
                    dwId: user.id,
                    userId: user.id,
                    realDelete: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.tip("success", "教师删除成功！");
                        self.getTeachers(self.pageNo);
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.get("/centro/api/user/deleteAccount", params, success);
            });
        },

        /**
         * 从垃圾箱中彻底删除文章
         * @param user
         */
        removeFromTrash: function (user) {
            var self = this;
            self.$modal.confirm("删除教师[ " + (user.name ? user.name : '') + " ]？", function () {
                var params = {
                    dwId: user.id,
                    userId: user.id,
                    realDelete: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.tip("success", "教师删除成功！");
                        self.getTeachers(self.pageNo);
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.get("/centro/api/user/deleteAccount", params, success);
            });
        },

        /**
         * 从垃圾箱中恢复已经删除的文章
         * @param user
         */
        restoreFromTrash: function (user) {
            var self = this;
            self.$modal.confirm("删除教师[ " + (user.name ? user.name : '') + " ]？", function () {
                var params = {
                    dwId: user.id,
                    userId: user.id,
                    realDelete: true
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.tip("success", "教师删除成功！");
                        self.getTeachers(self.pageNo);
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.get("/centro/api/user/deleteAccount", params, success);
            });
        },
        /**
         * 撤销发布文章
         */
        redrawPublish : function (){

        },

        /**
         * 审核不通过
         */
        auditReject : function (){

        },
        /**
         * 审核通过
         */
        auditSuccess : function (){

        },

        /**
         * 提交审核
         */
        submitAudit : function (){

        },

        /**
         * 教师详情
         * @param row
         */
        editArticle: function (user) {
            if (user.name) {
                this.$modal.show(this, {
                    templateURL: mod.js_detail,
                    title: "教师【 " + (user.name ? user.name : '') + " 】 详细信息",
                    width: 500,
                    userInfo: user
                });
            } else {
                this.$modal.warn("这条数据不完整")
            }
        },

        /**
         * 编辑教师信息
         */
        viewArticle: function (user) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.js_edit,
                title: "教师【 " + (user.name ? user.name : '') + " 】 详细信息",
                width: 500,
                userInfo: user,
                method: function (chapter) {
                    self.getTeachers(self.pageNo);
                }
            });
        },

        /**
         * 编辑教师信息
         */
        addArticle: function () {
            // 取得当前选中的栏目
            var tobj = $.fn.zTree.getZTreeObj("ztree");
            var nodes = tobj.getSelectedNodes();
            if (nodes.length == 0) {
                self.$modal.tip("error", "请先选中栏目");
                return;
            }
            var self = this;
            var article = {
                name: '',
                content: '',
                channelId : nodes[0].id,
                auditStatus : 0,
                delFlag : 0
            };
            this.$modal.show(this, {
                templateURL: mod.edit_article,
                title: "添加文章",
                width: 700,
                article: article,
                method: function (chapter) {
                    self.loadArticles(self.pageNo);
                }
            });
        },

        /**
         * 分页
         * @type {Pagination}
         */
        pagination: function () {
            var self = this;
            self.pageContro = new Pagination({
                container: $(".hwmanagement_page"),//必填
                pageTotal: 0,//必填，此处默认为0
                callback: function (page) {//点击分页后的回调函数
                    self.loadArticles(page);
                }
            });
        }
    },
    created: function () {
        window.loading()
    },
    mounted: function () {
        this.pagination();
        this.loadChannels();
    },
    watch: {
        '$route' (to, from) {
            var paramId = this.$route.params;
            // 这样就可以获取到变化的参数了，然后执行参数变化后相应的逻辑就行了
            if (paramId.id == 'draft') {
                this.auditStatus = 0;
            } else  if (paramId.id == 'audit') {
                this.auditStatus = 1;
            } else  if (paramId.id == 'publish') {
                this.auditStatus = 2;
            } else  if (paramId.id == 'trash') {
                this.delFlag = 1;
            }
            this.loadArticles(1);
        }
    }
});
