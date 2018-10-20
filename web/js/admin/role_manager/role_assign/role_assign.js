import page from "Pagination";

mod.role_assign = Vue.component('role_assign', {
    template: __inline("/web/html/admin/role_manager/role_assign/role_assign.html"),
    data: function () {
        return {
            pageSize: 10,
            pageCount: 10,
            list: [],
            pageContro: '',
            flag: '',
            isCheckAll: false,
            result: {},
            node: [],
            row: [],
            role: ''
        };
    },
    methods: {
        init: function () {
            this.getRoleList();
            this.getPermissionList();
        },
        getPermissionList: function () {
            var self = this;
            var success = function (result) {
                self.node = result.data;
                self.initZtree();
            };
            Service.get("/centro/admin/permission/tree", null, success);
        },
        initZtree: function () {
            var self = this;
            var setting = {
                check: {enable: true},
                data: {simpleData: {enable: true}}
            };
            var zNodes = this.node;
            $(document).ready(function () {
                $.fn.zTree.init($("#permissionZtree"), setting, zNodes);
            });
        },
        //添加角色
        addrole: function () {
            this.row = {};
            $('#myModal').modal('show');
        },
        //提交permission
        submitRolePermission: function () {
            var self = this;
            var nodes = $.fn.zTree.getZTreeObj('permissionZtree').getCheckedNodes(true);
            var arr = new Array();
            nodes.forEach(function (node, index) {
                arr.push(node.id);
            });
            var data = {
                roleId: self.role.id,
                permissionIds: arr.toString(),
            };
            var success = function (result) {
                self.result = result;
                $('#myModal2').modal('show');
                self.role = '';
            };

            //console.log(self.role);
            //console.log(data);
            Service.post("/centro/admin/rolepermission/save", data, success);
        },
        //提交role
        submitrole: function (row) {
            var self = this;
            var success = function (result) {
                if (result.resultCode == 0) {
                    $('#myModal').modal('hide');
                    self.getRoleList();
                } else {
                    $("#error_msg").css("display", "block");
                    $("#error_msg").html(result.message);
                }
            };
            //console.log(row);
            Service.postBody('/centro/api/role/update', row, success);
        },
        //获取角色列表
        getRoleList: function () {
            var self = this;
            var success = function (result) {
                self.list = result.data;
            };
            Service.get("/centro/api/role/list", null, success);
        },
        //选中
        selectA: function () {
            var tree = $.fn.zTree.getZTreeObj('permissionZtree');
            tree.checkAllNodes(false);
            var self = this;
            var data = {roleId: this.role.id};
            var success = function (result) {
                $("#ztree2").show();
                if (result.success) {
                    //遍历，根据id勾选节点;
                    result.data.forEach(function (permission) {
                        var node = tree.getNodeByParam("permissionKey", permission.permissionKey);
                        tree.checkNode(node, true);
                    });
                } else {
                    self.result = result;
                    $('#myModal2').modal('show');
                }
            };
            Service.get("/centro/admin/rolepermission/getRolePermissionList", data, success);
        },
        //重置
        reset: function () {
            var tree = $.fn.zTree.getZTreeObj('roleMenuTree2');
            tree.checkAllNodes(false);
        },
        //隐藏树
        hide: function () {
            $("#ztree2").hide();
            var tree = $.fn.zTree.getZTreeObj('roleMenuTree2');
            tree.checkAllNodes(false);
            this.item = '';
        }
    },
    created: function () {
        //window.loading()
    },
    mounted: function () {
        this.init();
    }
});
