module.exports = [{
    path: '/account_manager',
    component: function (res, rej) {
        require(['/web/js/admin/account_manager/account_manager.js'], function (data) {
            res(data['account_manager']);
        });
    },
    children: [
        // 教师列表
        {
            path: 'list_teacher',
            component: function (res, rej) {
                require(['/web/js/admin/account_manager/account_manager.js'], function (data) {
                    res(data['list_teacher']);
                });
            }
        },
        // 学生列表
        {
            path: 'list_student',
            component: function (res, rej) {
                require(['/web/js/admin/account_manager/account_manager.js'], function (data) {
                    res(data['list_student']);
                });
            }
        },
        // 管理员列表
        {
            path: 'list_admin',
            component: function (res, rej) {
                require(['/web/js/admin/account_manager/account_manager.js'], function (data) {
                    res(data['list_admin']);
                });
            }
        },
        // 搜索
        {
            path: 'account_search',
            component: function (res, rej) {
                require(['/web/js/admin/account_manager/account_manager.js'], function (data) {
                    res(data['account_search']);
                });
            }
        },
    ]
}, {
    path: '/account_manager/*', redirect: '/404'
}];

