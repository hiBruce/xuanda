module.exports = [{
    path: '/group_manager',
    component: function (res, rej) {
        require(['/web/js/admin/group_manager/group_manager.js'], function (data) {
            res(data['group_manager']);
        });
    },
    children: [
        {
            path: 'audit_list',
            component: function (res, rej) {
                require(['/web/js/admin/group_manager/group_manager.js'], function (data) {
                    res(data['audit_list']);
                });
            }
        },
        {
            path: 'category_list',
            component: function (res, rej) {
                require(['/web/js/admin/group_manager/group_manager.js'], function (data) {
                    res(data['category_list']);
                });
            }
        },
        {
            path: 'group_list',
            component: function (res, rej) {
                require(['/web/js/admin/group_manager/group_manager.js'], function (data) {
                    res(data['group_list']);
                });
            }
        },
        {
            path: 'tag_list',
            component: function (res, rej) {
                require(['/web/js/admin/group_manager/group_manager.js'], function (data) {
                    res(data['tag_list']);
                });
            }
        }

    ]
}, {
    path: '/group_manager/*', redirect: '/404'
}];

