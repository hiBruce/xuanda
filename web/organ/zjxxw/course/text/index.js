/**
 * 课程首页js
 */
define(function () {
    var course = new Vue({
        el: ".page",
        delimiters: ['{%', '%}'],
        data: function () {
            return {}
        },
        methods: {
            setContentHei: function () {
                var wh = window.innerHeight;
                $(".page-content").css("height", wh - 300)
            },
            finishText: function () {
                var self = this;
                var data = {
                    kcnrid: $("#kcnrid").val(),
                    xykcid: $("#xykcid").val(),
                };
                var success = function (result) {

                };
                Service.get("/jxxt/api/course/lps/textFinish", data, success);
            }
        },
        created: function () {
            window.setfootDet();
            this.setContentHei();
        },
        mounted: function () {
            window.setfootDet();
            this.finishText();
        },
    })
});