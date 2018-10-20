module.exports = [{
    path: '/activity_manager',
    component: function (res, rej) {
        require(['/web/js/admin/activity_manager/activity_manager.js'], function (data) {
            res(data['activity_manager']);
        });
    },
    children: [
        {
            path: 'activity_mgr/activity_audit',
            component: function (res, rej) {
                require(['/web/js/admin/activity_manager/activity_manager.js'], function (data) {
                    res(data['activity_audit']);
                });
            }
        },
        {
            path: 'activity_mgr/activity_edit',
            component: function (res, rej) {
                require(['/web/js/admin/activity_manager/activity_manager.js'], function (data) {
                    res(data['activity_edit']);
                });
            }
        },
        {
            path: 'activity_mgr/activity_list',
            component: function (res, rej) {
                require(['/web/js/admin/activity_manager/activity_manager.js'], function (data) {
                    res(data['activity_list']);
                });
            }
        },
        {
            path: 'category_manager/category_edit',
            component: function (res, rej) {
                require(['/web/js/admin/activity_manager/activity_manager.js'], function (data) {
                    res(data['category_edit']);
                });
            }
        },
        {
            path: 'category_manager/category_list',
            component: function (res, rej) {
                require(['/web/js/admin/activity_manager/activity_manager.js'], function (data) {
                    res(data['category_list']);
                });
            }
        }
    ]
}, {
    path: '/activity_manager/*', redirect: '/404'
}];

