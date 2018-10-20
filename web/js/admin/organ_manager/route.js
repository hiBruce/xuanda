module.exports = [{
    path: '/organ_manager',
    component: function (res, rej) {
        require(['/web/js/admin/organ_manager/organ_manager.js'], function (data) {
            res(data['organ_manager']);
        });
    },
    children: [
        // 机构信息维护
        {
            path: 'organ_settings',
            component: function (res, rej) {
                require(['/web/js/admin/organ_manager/organ_manager.js'], function (data) {
                    res(data['organ_settings']);
                });
            }
        },
        // 机构树维护
        {
            path: 'organ_tree_mgr',
            component: function (res, rej) {
                require(['/web/js/admin/organ_manager/organ_manager.js'], function (data) {
                    res(data['organ_tree_mgr']);
                });
            }
        }
    ]
}, {
    path: '/organ_manager/*', redirect: '/404'
}];

