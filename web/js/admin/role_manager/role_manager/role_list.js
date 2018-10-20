import page from "Pagination";

mod.role_list = Vue.component('role_list', {
    template: __inline("/web/html/admin/role_manager/role_list/role_list.html"),
    data: function () {
        return {
            pageSize: 8,
            list: [],
            pageContro: '',
            flag: '',
            row: [],
            isCheckAll: false,
            result: {},
            node: [],
            userList: [],
            treeNodes: [],
            ry_list: [],
            opt_list: [],
            allotRoleId: '',
            lookRoleId: '',
            dataPermissionList: [
                {name: '仅本人数据', value: 10},
                {name: '所在部门及以下数据', value: 20},
                {name: '本单位及以下数据', value: 30},
                {name: '全部数据（管理员）', value: 99}
            ]
        };
    },
    methods: {
        /**
         * 获取角色列表
         * @param page
         */
        loadRoles: function (page) {
            var self = this;
            $('.ace').each(function () {
                if (this.checked) {
                    this.checked = false;
                }
            });
            //alert("customerList");
            if (page == null || page == '') {
                page = 1;
            }
            var data = {
                pageNo: page,
                pageSize: this.pageSize,
                name: $('#searchName').val()
            };
            var self = this;
            var success = function (result) {
                self.list = result.data;
                if (page == 1) {
                    self.pageContro.upDate({
                        pageTotal: result.pageCount
                    });
                }
            };
            Service.get('/centro/api/role/search', data, success);
        },

        //添加角色
        add: function () {
            var self = this;
            var role = {
                name: '',
                sjqxLx: '',
                remarks: '',
            };
            self.$modal.show(self, {
                templateURL: mod.role_edit,
                title: "添加角色",
                width: 600,
                method: self.loadStudents,
                role: role,
                method: function (chapter) {
                    self.loadRoles(self.pageNo);
                }
            });
        },

        //更新
        edit: function (role) {
            var self = this;
            this.$modal.show(this, {
                templateURL: mod.role_edit,
                title: "修改角色【 " + (role.name ? role.name : '') + " 】 信息",
                width: 500,
                role: role,
                method: function (chapter) {
                    self.loadRoles(self.pageNo);
                }
            });
        },

        /**
         * 删除角色，
         * @param id
         */
        remove: function (role) {
            var self = this;
            self.$modal.confirm("删除角色[ " + (role.name ? role.name : '') + " ]？", function () {
                var data = {
                    idstr: role.id
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.tip("success", "删除成功！");
                        self.loadRoles(self.pageNo);
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.get('/centro/api/role/delete', data, success);
            });
        },

        /**
         * 分页
         * @type {Pagination}
         */
        paginationinit: function () {
            var self = this;
            self.pageContro = new Pagination({
                container: $(".hot-group-page"),//必填
                pageTotal: 0,//必填
                callback: function (page) {//点击分页后的回调函数
                    self.loadRoles(page);
                }
            });
        },

        //权限展示
        showRolePermission: function (role) {
            this.$modal.show(this, {
                templateURL: mod.role_permission,
                title: "角色【 " + (role.name ? role.name : '') + " 】 所包含的权限",
                width: 500,
                role: role,
                method: function (result) {
                }
            });
        },

        // 显示该角色所拥有的用户
        showRoleUsers: function (role) {
            this.$modal.show(this, {
                templateURL: mod.role_users,
                title: "角色【 " + (role.name ? role.name : '') + " 】 所包含的用户",
                width: 500,
                role: role,
                method: function (result) {
                }
            });
        }
    },
    created: function () {
        //window.loading()
    },
    mounted: function () {
        this.loadRoles();
        this.paginationinit();
    },
});
