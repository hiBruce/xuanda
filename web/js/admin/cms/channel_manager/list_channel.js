import contextMenu from "jqueryContextMenu";

mod.list_channel = Vue.component('list_channel', {
    template: __inline("/web/html/admin/cms/channel_manager/list_channel.html"),
    data: function () {
        return {
            node: [],
            channel: {}
        };
    },
    methods: {
        /***
         * 添加一个子节点
         * @param parentId
         * @param subNode
         */
        addSubNode: function (parentId, subNode) {
            var treeObj = $.fn.zTree.getZTreeObj("ztree");
            var parentNodes = treeObj.getNodesByParam("id", parentId, null);
            treeObj.addNodes(parentNodes[0], subNode);
        },

        /**
         * 取得父节点
         * @param id
         * @returns {*}
         */
        getNode: function (id) {
            var treeObj = $.fn.zTree.getZTreeObj("ztree");
            var nownode = treeObj.getNodesByParam("id", id, null);
            return nownode[0];
        },

        /**
         * 取得父节点
         * @param id
         * @returns {*}
         */
        getParentNode: function (id) {
            var treeObj = $.fn.zTree.getZTreeObj("ztree");
            var nownode = treeObj.getNodesByParam("id", id, null);
            var parent = nownode[0].getParentNode();
            return parent;
        },

        fetchDescription : function (nodes){
            var self = this;
            for (var v in nodes) {
                nodes[v].description = nodes[v].id + ":" + nodes[v].name;
                if (nodes[v].children && nodes[v].children.length > 0) {
                    self.fetchDescription(nodes[v].children);
                }
            }
        },

        /**
         * 获取栏目tree
         */
        loadChannels: function () {
            $("#ztree").hide();
            var self = this;
            var success = function (result) {
                self.node = result.data;
                self.fetchDescription(self.node);
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
            var beforeRightClick = function (treeId, treeNode) {
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                treeObj.selectNode(treeNode);
                if (null == treeNode) {
                    return;
                }
                self.createTreeContextMenu(treeId, treeNode);
                return false;
            };

            var setting = {
                data: {
                    simpleData: {enable: true},
                    key : {
                        name : 'description'
                    }
                },
                callback: {
                    beforeRightClick: beforeRightClick
                }
            };
            var zNodes = this.node;
            $(document).ready(function () {
                $.fn.zTree.init($("#ztree"), setting, zNodes);
            });
        },

        /**
         * 单位右键菜单
         */
        createTreeContextMenu: function (treeId, treeNode) {
            var self = this;
            $.contextMenu({
                selector: '#' + treeNode.tId + "_a",
                className: 'css-title',
                build: function ($trigger, e) {
                    return {
                        callback: function (idKey, options) {
                            var tobj = $.fn.zTree.getZTreeObj(treeId);
                            var nodes = tobj.getSelectedNodes();

                            if (idKey == 'addChannel') {
                                self.addChannel(nodes[0]);
                            } else if (idKey == 'editChannel') {
                                self.editChannel(nodes[0]);
                            } else if (idKey == 'removeChannel') {
                                self.removeChannel(nodes[0]);
                            }

                        },
                        items: {
                            "addChannel": {
                                name: "添加下级栏目"
                            },
                            "editChannel": {
                                name: "编辑栏目"
                            },
                            "removeChannel": {
                                name: "删除栏目"
                            }
                        }
                    };
                }
            });
        },

        // 添加栏目
        addChannel: function (parent) {
            var self = this;
            var channel = {
                name: '',
                mark: '',
                type: 0,
                parentId: (parent == undefined) ? 0 :  parent.id ,
                canPublish: 1,
            };

            this.$modal.show(this, {
                templateURL: mod.edit_channel,
                title: "栏目信息",
                width: 500,
                channel: channel,
                method: function (channel) {
                    if (channel.parentId == 0) {
                        // 添加根节点
                        var treeObj = $.fn.zTree.getZTreeObj("ztree");
                        treeObj.addNodes(null, channel);
                    } else {
                        // 添加子节点
                        if (!parent.children) {
                            self.addSubNode(parent.id, channel)
                        }
                    }
                }
            });
        },

        // 添加栏目
        editChannel: function (parent) {
            var self = this;
            var channel = window.copyObjectProperty(parent);
            this.$modal.show(this, {
                templateURL: mod.edit_channel,
                title: "栏目信息",
                width: 500,
                channel: channel,
                method: function (channel) {
                    var node = self.getNode(parent.id);
                    if(node != null) {
                        $.extend(node, channel);
                        $.fn.zTree.getZTreeObj("ztree").updateNode(node);
                    }
                }
            });
        },

        // 删除栏目
        removeChannel: function (node) {
            var self = this;

            // 如果一个栏目包含了子栏目，则不允许删除此栏目
            if (node.children != undefined && node.children != null && node.children.length > 0) {
                self.$modal.tip("error", "该栏目包含下级栏目，请先删除下级栏目再删除此栏目");
                return;
            }
            self.$modal.confirm("删除栏目[ " + (node.name ? node.name : '') + " ]？", function () {
                var success = function (result) {
                    if (result.success) {
                        var treeObj = $.fn.zTree.getZTreeObj("ztree")
                        var treeNode = treeObj.getNodesByParam("id", node.id, null);
                        treeObj.removeNode(treeNode[0]);

                        self.$modal.tip("success", "删除成功！");
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };

                var params = {
                    _source_: 'aCms',
                };
                Service.get("/api/channel/delete/" + node.id, params, success);
            });
        }
    },
    created: function () {
        this.loadChannels();
    },
    mounted: function () {
    },
});
