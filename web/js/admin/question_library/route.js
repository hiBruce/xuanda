module.exports = [{
    path: '/question_library',
    component: function (res, rej) {
        require(['/web/js/admin/question_library/question_library.js'], function (data) {
            res(data['question_library']);
        });
    },
    children: [
    		
    ]
}, {
    path: '/question_library/*', redirect: '/404'
}];

