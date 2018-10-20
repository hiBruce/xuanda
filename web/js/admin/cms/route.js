module.exports = [{
    path: '/cms',
    component: function (res, rej) {
        require(['/web/js/admin/cms/cms.js'], function (data) {
            res(data['cms']);
        });
    },
    children: [
        // 栏目列表
        {
            path: 'list_channel',
            component: function (res, rej) {
                require(['/web/js/admin/cms/cms.js'], function (data) {
                    res(data['list_channel']);
                });
            }
        },
        // 文章列表
        {
            path: 'list_article/:id',
            component: function (res, rej) {
                require(['/web/js/admin/cms/cms.js'], function (data) {
                    res(data['list_article']);
                });
            }
        },
        // 全局设置
        {
            path: 'settings',
            component: function (res, rej) {
                require(['/web/js/admin/cms/cms.js'], function (data) {
                    res(data['settings']);
                });
            }
        }
    ]
}, {
    path: '/cms/*', redirect: '/404'
}];

