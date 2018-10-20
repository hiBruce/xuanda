module.exports = [{
    path: '/create_course',
    component: function (res, rej) {
        require(['/web/js/teacher/create_course/create_course.js'], function (data) {
            res(data['create_course']);
        });
    },
    children: [
        // 课程列表
        {
            path: 'course_list',
            component: function (res, rej) {
                require(['/web/js/teacher/create_course/create_course.js'], function (data) {
                    res(data['course_list']);
                });
            }
        }
    ]
}, {
    path: '/create_course/*', redirect: '/404'
}];
