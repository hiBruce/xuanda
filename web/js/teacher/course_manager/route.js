module.exports = [{
    path: '/course_manager',
    component: function (res, rej) {
        require(['/web/js/teacher/course_manager/course_manager.js'], function (data) {
            res(data['course_manager']);
        });
    },
    children: [
        // 我管理的课程
        {
            path: 'course_mgr',
            component: function (res, rej) {
                require(['/web/js/teacher/course_manager/course_manager.js'], function (data) {
                    res(data['course_mgr']);
                });
            }
        }
    ]
}, {
    path: '/course_manager/*', redirect: '/404'
}];

