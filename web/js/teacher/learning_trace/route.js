module.exports = [{
    path: '/learning_trace',
    component: function (res, rej) {
        require(['/web/js/teacher/learning_trace/learning_trace.js'], function (data) {
            res(data['learning_trace']);
        });
    },
    children: [
        {
            path: 'score_trace',
            component: function (res, rej) {
                require(['/web/js/teacher/learning_trace/learning_trace.js'], function (data) {
                    res(data['score_trace']);
                });
            }
        },
        {
            path: 'test_trace',
            component: function (res, rej) {
                require(['/web/js/teacher/learning_trace/learning_trace.js'], function (data) {
                    res(data['test_trace']);
                });
            }
        },
        {
            path: 'exercise_trace',
            component: function (res, rej) {
                require(['/web/js/teacher/learning_trace/learning_trace.js'], function (data) {
                    res(data['exercise_trace']);
                });
            }
        },
        {
            path: 'homework_trace',
            component: function (res, rej) {
                require(['/web/js/teacher/learning_trace/learning_trace.js'], function (data) {
                    res(data['homework_trace']);
                });
            }
        },
        {
            path: 'study_trace',
            component: function (res, rej) {
                require(['/web/js/teacher/learning_trace/learning_trace.js'], function (data) {
                    res(data['study_trace']);
                });
            }
        },
        {
            path: 'classes_discuss',
            component: function (res, rej) {
                require(['/web/js/teacher/learning_trace/learning_trace.js'], function (data) {
                    res(data['classes_discuss']);
                });
            }
        }
    ]
}, {
    path: '/learning_trace/*', redirect: '/404'
}];

