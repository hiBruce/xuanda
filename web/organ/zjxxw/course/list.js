/**
 * 课程首页js
 */
define(['Pagination'], function () {
    var course = new Vue({
        el: ".page",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                'pageNo': 1,
                'categoryId': 'all',
                'keyword': '',
                'categories': [],
                'courses': [],
                'activeIndex': 0,
                'vestIn': URL.getParameter('vestIn') ? parseInt(URL.getParameter('vestIn')) : '',
                'leftBarTime': null,
                'leftBarHideTime': null,
                'leftbarInd': 100,
                'hasmoremenu': 1,
                'ind1active': 0, // 用于判断当前目录是否被选中
                'ind2active': 0,
                'ind3active': 0,
                'ind4active': 0,
                'ind5active': 0,
                'ind6active': 0,
                'ind2fold': 0,//用于判断当前收起是否折叠
                'ind3fold': 0,
                'ind4fold': 0,
                'ind5fold': 0,
                'ind6fold': 0,
                'ind2menu': [],//用于判断当前的下级目录的内容
                'ind3menu': [],
                'ind4menu': [],
                'ind5menu': [],
                'ind6menu': [],
                'setDefaultSel': URL.getParameter('from'),
                categoryNum: 1
            }
        },
        methods: {
            /**
             * 加载课程分类
             */
            loadCourseCategory: function () {
                var self = this;
                var success = function (result) {
                    self.categories = result.data;
                    if (self.setDefaultSel == 'baseCourse') {//基础教育
                        self.loadCourseByCategory(1, self.categories[0], 1, 1)
                    } else if ('informal' == self.setDefaultSel) {//非学历教育
                        self.loadCourseByCategory(1, self.categories[2], 1, 3)
                    } else if (self.setDefaultSel == 'formal') {//学历教育
                        self.loadCourseByCategory(1, self.categories[1], 1, 2)
                    } else {//目前进入课程默认是学历教育
                        self.loadCourseByCategory(1, self.categories[1], 1, 2)
                    }
                };
                var params = {
                    pageNo: 0
                };
                Service.get('/jxxt/api/admin/courseCategory/getAllCategory', params, success);
            },
            searchKeyword: function () {
                // if (this.keyword) {
                    var self = this;
                    var success = function (result) {
                        if (result.resultCode == 0) {
                            self.ind1active = 0;
                            self.categoryId = 'all';
                            self.ind2menu = [];
                            var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize'])
                            self.courses = result.data;
                            pageCon.upDate({
                                pageTotal: pageTotal
                            })
                            setTimeout(setfootDet, 0)
                        }
                    };
                    var params = {
                        pageNo: 1,
                        keyword: this.keyword,
                        pageSize: 20
                    };

                    Service.get('/jxxt/api/admin/course/category/all', params, success, null);
                // }
            },
            /**
             * 加载课程根据课程分类
             */
            loadCourseByCategory: function (pageNo, cat, selLine, ind) {
                if (selLine == 1) {
                    //第一行分类
                    this.categoryNum = ind;
                }

                var self = this;
                if (cat) {
                    var categoryId = cat.id
                } else if (selLine) {
                    if (selLine > 1) {
                        var categoryId = this['ind' + selLine + 'menu'][0].parentId
                    } else {
                        var categoryId = 'all'
                    }

                } else {
                    var categoryId = this.categoryId;
                }
                ;
                if (selLine) {
                    this['ind' + selLine + 'active'] = ind ? ind : 0;
                    for (var i = 1; i < 7; i++) {
                        if (i > selLine) {
                            self['ind' + i + 'active'] = 0;
                            self['ind' + i + 'menu'] = [];
                            self['ind' + i + 'fold'] = 0;
                        }
                    }
                    ;
                    this.hasmoremenu = selLine + 1;
                    this['ind' + (parseInt(selLine) + 1) + 'menu'] = cat && cat.subCateogries ? cat.subCateogries : [];
                }
                var pageNo = pageNo || 1;
                if (isNull(categoryId)) {
                    categoryId = 'all';
                }
                ;
                this.categoryId = categoryId;

                var success = function (result) {
                    var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize'])
                    self.courses = result.data;
                    if (pageNo == 1) {
                        pageCon.upDate({
                            pageTotal: pageTotal
                        })
                    }
                    ;
                    setTimeout(setfootDet, 0)
                };
                var params = {
                    pageNo: pageNo,
                    keyword: this.keyword,
                    pageSize: 20
                };
                Service.get('/jxxt/api/admin/course/category/' + categoryId, params, success, null);
            },
            showMore: function (num) {
                this['ind' + num + 'fold'] = !this['ind' + num + 'fold']
            },
            getUrl: function (items) {
                return (items.isPackage == 1) ? '/course/coverPage/' + items.id : (((items.sourceType != 1) ? '/course/coverPage/' + items.id : '/join_front?target_url=' + encodeURIComponent(items.sourceUrl) + '&app_key=' + APP_LNPT_KEY))
            },
            getUrl1: function (items) {
                //浙开
                return (items.isPackage == 1) ? '/course/coverPage/' + items.id : (((items.sourceType != 1) ? '/course/coverPage/' + items.id : '/join_front?target_url=' + encodeURIComponent(items.sourceUrl) + '&app_key=' + APP_ZK_KEY))
            }
        },
        created: function () {
            this.loadCourseCategory();
            //this.loadCourseByCategory();
        },
        mounted: function () {
        },
    })
    var pageCon = new Pagination({
        container: $(".pageinfo"),
        pageTotal: 0,
        callback: function (page) {
            course.loadCourseByCategory(page)
        }
    })
});