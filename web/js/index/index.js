/**
 * @Ttitle 首页
 * @Author 席青
 */
define(function (require) {
    var Swiper = require('Swiper');
    var app = new Vue({
        el: "#app",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                loopImg: [{
                    createDate:
                        "2018-04-26 11:07:18",
                    delFlag: 0,
                    id: "ae54e837cc98414f8a3be7581e3b0c0b",
                    linkUrl: "javascript:void(0)",
                    name: "入学无障碍",
                    orderNum: 1,
                    path: "http://dfs.zjlll.net/group1/M00/00/07/CmQXWlrilt-AORU_AACmpV3jt4g853.jpg",
                    remarks: "83b7df",
                    searchFromPage: false,
                    slideId: "135b7652586c407ca2168ace1a2d26ab",
                    updateDate: "2018-04-27 05:30:46"
                }],//轮播图
                user: []
            };
        },
        methods: {
            get: function () {

            },
            getLoginUser: function () {
                var self = this;
                $.ajax({
                    url: '/getOpenId',
                    type: 'GET',
                    dataType: "json",
                    success: function (userdata) {
                        Service.get('/centro/api/user/getUserByOpenid?openid=' + userdata.openid, null, function (result) {
                            if (result.success) {
                                self.user = result.data;
                                console.log(self.user);
                            }
                        });
                    }
                });
            },
            getLoopImg: function () {
                var self = this;
                Request.get('/getLoopImg', {mark: 'home'}, function (res) {
                    if (res.resultCode == 0) {
                        self.loopImg = res.data;
                        setTimeout(function () {
                            new Swiper('.swiper-container', {
                                loop: true,
                                autoplayDisableOnInteraction: false,
                                autoplay: 3000,
                                spaceBetween: 30,
                                effect: 'fade',
                                pagination: '.swiper-pagination',
                                paginationClickable: true
                            });
                        }, 10);
                    }
                }, null);
            },
            initLoopImg: function () {
                new Swiper('.swiper-container', {
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    autoplay: 3000,
                    spaceBetween: 30,
                    effect: 'fade',
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });
            }
        },
        created: function () {
        },
        mounted: function () {
            var self = this;
            self.getLoginUser();
            self.initLoopImg();
        }
    });
});