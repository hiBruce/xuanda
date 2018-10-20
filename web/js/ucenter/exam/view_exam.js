/**
 * 我的课程
 */
define(["Pagination", 'fcup'], function () {
    var classManage = new Vue({
        el: ".page",
        delimiters: ["{%", "%}"],
        data: function () {
            return {
                danxRow: [],
                duoxRow: [],
                pandRow: [],
                zhugRow: [],
                wxtkRow: [],
                ydljRow: [],
                cj: {},
                sj: {},
                chapterName: "",
                xs: ''
            };
        },
        methods: {
            tmList: function () {
                var self = this;
                var data = {
                    pageNo: -1,
                    cjid: self.getParameter("cjid"),
                    loading: true
                };
                var success = function (result) {
                    console.log(result);
                    if (result.resultCode == "0") {
                        self.danxRow = result.data.danxList;
                        self.duoxRow = result.data.duoxList;
                        self.pandRow = result.data.pandList;
                        self.zhugRow = result.data.zhugList;
                        self.wxtkRow = result.data.wxtkList;
                        self.ydljRow = result.data.ydljList;
                        self.cj = result.data.cj;
                    }
                    setTimeout(window.setfootDet, 60);
                };
                Service.postBody('/tkksxt/api/admin/sjtm/list', data, success);
            },
            getSj: function () {
                var self = this;
                var data = {
                    id: $("#sjid").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.sj = result.data;
                    }
                    setTimeout(window.setfootDet, 60);
                };
                Service.get('/tkksxt/api/admin/sj/get', data, success);
            },
            //重新测试
            reTest: function () {
                //跳转到做试卷的页面
                window.location.href = '/ucenter/course/learning/' + $("#courseId").val() + '?chapterId=' + $("#chapterId").val() + "&reTest=1";
            },
            getChapterName: function () {
                var self = this;
                var data = {};
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.chapterName = result.data.contentName;
                    }
                };
                Service.get('/jxxt/api/admin/chapter/' + $("#chapterId").val(), data, success);
            },
            /**
             * 从URL获取参数
             * @param param
             * @returns {*}
             */
            getParameter: function (key) {
                var url = location.href;
                var ind = url.indexOf("?");
                if (ind != -1) {
                    var strs = url.substr(ind + 1);
                    var params = url.indexOf("&") == -1 ? [strs] : strs.split("&");
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i].split("=");
                        if (key == param[0]) {
                            return param[1];
                        }
                    }
                    return '';
                }
            }
        },
        created: function () {
            this.tmList();
            this.getSj();
        },
        mounted: function () {
            if ($("#xs").val()) {
                this.xs = $("#xs").val();
            }
            this.getChapterName();
        }

    });
    return classManage;
});