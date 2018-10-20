module.exports = [{
    path: '/log_manager',
    component: function (res, rej) {
        require(['/web/js/admin/log_manager/log_manager.js'], function (data) {
            res(data['log_manager']);
        });
    },
    children: [
        {
            path: 'access_logs',
            component: function (res, rej) {
                require(['/web/js/admin/log_manager/log_manager.js'], function (data) {
                    res(data['access_logs']);
                });
            }
        }
    ]
}, {
    path: '/log_manager/*', redirect: '/404'
}];

