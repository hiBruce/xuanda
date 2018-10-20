/*
*   //收藏相关

* */
/**
 * 课程首页js
 */
define(function () {
    return Vue.component('sc', {
        template: '<div class="sc" :class="{hassc:isCollect}" @click="collect"' +
        '">\n' +
        '<i class="iconfont">&#xe611;</i>\n' +
        '<span>收藏</span>\n' +
        '</div>',
        data: function () {
            return {
                id: URL.getParameter(),
                isCollect: 0,
            };
        },
        methods: {
            judgeScfl: function () {
                if (!this.scfl) {
                    var url = location.href;
                    if (url.indexOf('course') >= 0) {
                        this.scfl = 1
                    } else if (url.indexOf('activity') >= 0) {
                        this.scfl = 2
                    } else if (url.indexOf('group') >= 0) {
                        this.scfl = 3
                    }
                }
            },
            collect: function () {
                if (loginStatus) {
                    if (!this.isCollect) {
                        var self = this;
                        Service.post('/zjxxw/api/collect/add', {
                            collectId: this.id,
                            scfl: this.scfl,
                            content: JSON.stringify(this.scparams)
                        }, function (res) {
                            if (res.resultCode == 0) {
                                self.isCollect = 1;
                                if (self.scfl == 4) {
                                    Service.post("/jxxt/api/course/notes/updateCollectNum", {
                                        id: self.id,
                                        num: 1
                                    }, function (res) {
                                        if (res.resultCode == 0)
                                            self.cb();
                                    })
                                }
                            }
                        })
                    } else {
                        this.cancelCollect()
                    }
                } else {
                    Dialog.openDialog("/web/v/login/login-dialog.html", "用户登录");
                }
            },
            cancelCollect: function () {
                var self = this;
                Service.post('/zjxxw/api/collect/cancel', {collectId: this.id}, function (res) {
                    if (res.resultCode == 0) {
                        self.isCollect = 0
                        if (self.scfl == 4) {
                            Service.post("/jxxt/api/course/notes/updateCollectNum", {
                                id: self.id,
                                num: -1
                            }, function (res) {
                                if (res.resultCode == 0)
                                    self.cb();
                            })
                        }
                    }
                })
            },
            judgeCollect: function () {
                if (loginStatus) {
                    var self = this;
                    Service.post('/zjxxw/api/collect/isCollect', {collectId: this.id}, function (res) {
                        if (res.resultCode == 0) {
                            self.isCollect = !!res.data;
                        }
                    })
                }
            },
        },
        created: function () {
            if (this.scfl === 4) {
                this.id = this.scparams.id;
            }
            this.judgeScfl()
            if (loginStatus) {
                this.judgeCollect();
            }
        },
        mounted: function () {
        },
        props: ['scparams', 'scfl', 'cb']
    });
});