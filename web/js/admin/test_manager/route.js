module.exports = [{
    path: '/test_manager',
    component: function (res, rej) {
        require(['/web/js/admin/test_manager/test_manager.js'], function (data) {
            res(data['test_manager']);
        });
    },
    children: [
    		
    ]
}, {
    path: '/test_manager/*', redirect: '/404'
}];

