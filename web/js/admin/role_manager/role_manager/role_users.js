import page from "Pagination";

mod.role_users = Vue.component('role_users', {
    template: __inline("/web/html/admin/role_manager/role_list/role_users.html"),
    data: function () {
        return {
            role : {},
            userList : [],
            pageSize: 8,
            pageContro: '',
            pageNo: 1,
        };
    },
    methods: {
        //展示角色下的人员
        showRoleUsers: function () {
            $("#userList2").hide();
            $("#ztree2").hide();
            $("#userListTitle").html('[ ' + this.role.name + ' ] 角色下的用户');
            this.lookRoleId = this.role.id;
            this.getUserList();
        },

        //角色列表
        getUserList: function (page) {
            var self = this;
            if (page == null || page == '') {
                page = 1;
            }
            var data = {
                roleId: this.lookRoleId,
                pageNo: page,
                pageSize: 20
            };

            var success = function (result) {
                self.userList = result.data;
                $("#userList2").show();
                if (page == 1) {
                    self.pagination.upDate({
                        pageTotal: result.pageCount
                    });
                }
            };
            Service.get("/centro/api/user/getZhListByRoleId", data, success);
        },

        /**
         *解除角色和账号的关联
         */
        remove : function (user){
            var self = this;
            self.$modal.confirm("要从该角色中移除此用户吗？[ " + (user.name ? user.name : '') + " ]？", function () {
                var data = {
                    roleId: self.role.id,
                    userId: user.id
                };
                var success = function (result) {
                    if (result.success) {
                        self.$modal.tip("success", "删除成功！");
                        self.getUserList(self.pageNo);
                    } else {
                        self.$modal.tip("error", result.message);
                    }
                };
                Service.get("/centro/api/user/deleteUserRole", data, success);
            });
        },

        /**
         * 分页
         * @type {Pagination}
         */
        paginationinit: function () {
            var self = this;
            self.pagination = new Pagination({
                container: $(".hot-group-page"),//必填
                pageTotal: 0,//必填
                callback: function (page) {//点击分页后的回调函数
                    self.getUserList(page);
                }
            });
        },
    },
    created: function () {
        //window.loading()
    },
    mounted: function () {
        this.role = this.options.role;
        this.showRoleUsers();
        this.paginationinit();
    },
    props: ['options']
});
