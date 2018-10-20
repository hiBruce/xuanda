/**
 * 考试--查看试题
 */
define( function (menu) {
    //menu.init();
    var app = new Vue({
        el: ".page",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                danxRow : [],
                duoxRow : [],
                pandRow : [],
                zhugRow : [],
                cj : {},
                sj : {}
            };
        },
        methods: {
            tmList: function () {
                var self = this;
                var data = {
                    pageNo : -1,
                    cjid: $("#cjid").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.danxRow = result.data.danxList;
                        self.duoxRow = result.data.duoxList;
                        self.pandRow = result.data.pandList;
                        self.zhugRow = result.data.zhugList;
                        self.cj = result.data.cj;
                    }
                };
                Service.postBody('/tkksxt/api/admin/sjtm/list', data, success);
            },
            getSj : function () {
                var self = this;
                var data = {
                    id: $("#sjid").val()
                };
                var success = function (result) {
                    if (result.resultCode == "0") {
                        self.sj = result.data;
                    }
                };
                Service.get('/tkksxt/api/admin/sj/get', data, success);
            },
        },
        created: function () {
            this.tmList();
            this.getSj();
        },
        mounted: function () {
        }

    });
});