module.exports = [{
    path: '/notice',
    component: function (res, rej) {
        require(['/web/js/teacher/notice/notice.js'], function (data) {
            res(data['notice']);
        });
    },
    children: [
        {
            path: 'notice_list',
            component: function (res, rej) {
                require(['/web/js/teacher/notice/notice.js'], function (data) {
                    res(data['notice_list']);
                });
            }
        }
    ]
}, {
    path: '/notice/*', redirect: '/404'
}];

