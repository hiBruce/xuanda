import page from "Pagination";

mod.role_permission = Vue.component('role_permission', {
    template: __inline("/web/html/admin/role_manager/role_list/role_permission.html"),
    data: function () {
        return {
            role : {},
            node: []
        };
    },
    methods: {
        //权限展示
        showPermission: function () {
            $("#ztree2").hide();
            $("#userList2").hide();
            $("#ztree2Name").html('[ ' + this.role.name + ' ] 拥有的权限');
            var self = this;
            var data = {roleId: self.role.id};
            var success = function (result) {
                self.node = result.data;
                self.initZtree();
                $("#ztree2").show();
            };
            Service.get("/centro/admin/permission/getPermissionTreeListByRoleId", data, success);
        },

        initZtree: function () {
            var self = this;
            var setting = {
                data: {simpleData: {enable: true}}
            };
            var zNodes = this.node;
            $(document).ready(function () {
                $.fn.zTree.init($("#roleMenuTree2"), setting, zNodes);
            });
        },
    },
    created: function () {
        //window.loading()
    },
    mounted: function () {
        this.role = this.options.role;
        this.showPermission();
    },
    props: ['options']
});
