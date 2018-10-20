module.exports = [{
    path: '/template_manager',
    component: function (res, rej) {
        require(['/web/js/admin/template_manager/template_manager.js'], function (data) {
            res(data['template_manager']);
        });
    },
    children: [
        // 页面头、尾配置
        {
            path: 'common_settings',
            component: function (res, rej) {
                require(['/web/js/admin/template_manager/template_manager.js'], function (data) {
                    res(data['common_settings']);
                });
            }
        },

        // 页面模板管理
        {
            path: 'pages_manager',
            component: function (res, rej) {
                require(['/web/js/admin/template_manager/template_manager.js'], function (data) {
                    res(data['pages_manager']);
                });
            }
        }
    ]
}, {
    path: '/template_manager/*', redirect: '/404'
}];

