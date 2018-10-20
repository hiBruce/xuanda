module.exports = [{
    path: '/role_manager',
    component: function (res, rej) {
        require(['/web/js/admin/role_manager/role_manager.js'], function (data) {
            res(data['role_manager']);
        });
    },
    children: [
        // 角色管理
        {
            path: 'role_list',
            component: function (res, rej) {
                require(['/web/js/admin/role_manager/role_manager.js'], function (data) {
                    res(data['role_list']);
                });
            }
        },
        // 角色授权
        {
            path: 'role_assign',
            component: function (res, rej) {
                require(['/web/js/admin/role_manager/role_manager.js'], function (data) {
                    res(data['role_assign']);
                });
            }
        }
    ]
}, {
    path: '/role_manager/*', redirect: '/404'
}];

