define(function () {
    var courseId = location.href;
    var index = courseId.lastIndexOf("\/");
    courseId = courseId.substring(index + 1, courseId.length);
        var app = new Vue({
            $id: 'controller',
            courseId: URL.getParameter(),
            comment_list: [],
            courseComment: {
                courseId: '',
                score: '5',
                content: ''
            },

            /**
             * 获取评价信息
             *
             */
            getCourseEvaluateList: function () {
                var success = function (result) {
                    vm.comment_list = result.data;
                    result.data.forEach(function (courseComment) {
                        var id = courseComment.id;
                        vm.loadScore(id);
                    });
                }
                Service.get("/jxxt/api/course_comment/list/" + courseId, null, success);
            },
            /**
             * 评价分数
             */
            loadScore: function (id) {
                var success = function (result) {
                    var score = result.data;
                    $('#' + id).raty({
                        number: 5, //多少个星星设置
                        score: score, //初始值是设置
                        hints: ['差', '一般', '好', '非常好', '全五星'],
                        path: '/static/temp/grade',
                        starHalf: 'halfstar.png',
                        starOff: 'xin1.png',
                        starOn: 'xin.png',
                        width: '240px',
                        half: true,
                        readOnly: true,
                        click: function (score, evt) {
                            vm.courseComment.score = score;
                        }
                    });
                }
                Service.get("/jxxt/api/course_comment/score/" + id, null, success);
            },
            /**
             * 用户没有登录时提交评价
             */
            unsContent: function () {
                location.href = "/login?redirect_url=/course";
            },
            /**
             * 提交评价
             * @param event
             */
            submitContent: function () {
                vm.courseComment.content = $("#content").val();
                vm.courseComment.courseId = courseId;
                var success = function (result) {
                    vm.getCourseEvaluateList();
                    $("#content").val('');
                    if (result.resultCode != 0) {
                        Dialog.confirm(result.message);
                    }
                };
                Service.postBody("/jxxt/api/course_comment/add", vm.courseComment, success);
            },

        });

        $('#halfstar').raty({
            number: 5, //多少个星星设置
            score: 5, //初始值是设置
            hints: ['差', '一般', '好', '非常好', '全五星'],
            path: '/static/temp/grade',
            starHalf: 'halfstar.png',
            starOff: 'xin1.png',
            starOn: 'xin.png',
            width: '240px',
            half: true,
            click: function (score, evt) {
                vm.courseComment.score = score;
            }
        });


        avalon.scan(document.body);
        vm.getCourseEvaluateList();


});