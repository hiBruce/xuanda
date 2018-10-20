module.exports = [{
    path: '/question_library',
    component: function (res, rej) {
        require(['/web/js/teacher/question_library/question_library.js'], function (data) {
            res(data['question_library']);
        });
    },
    children: [
        {
            path: 'question_list',
            component: function (res, rej) {
                require(['/web/js/teacher/question_library/question_library.js'], function (data) {
                    res(data['question_list']);
                });
            }
        }
    ]
}, {
    path: '/question_library/*', redirect: '/404'
}];

