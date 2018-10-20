/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(['fcup'], function () {
    var addSource = Vue.component('addSource', {
        template: __inline("./add_source.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                courseList: {},
                pageNo: 1,
                course:"",
                num: 1,
            }
        },
        methods: {
            getList: function (page) {
                var self = this;
                var pageNo = page ? page : self.pageNo;
                Service.get("/jxxt/api/admin/kczl/list", {courseId: this.course.id, pageNo: pageNo}, function (result) {
                    if (result.resultCode == 0) {
                        self.courseList = result.data;
                        self.num = result.page.currentPageIndex;
                        //拿到分页信息，将总页码传入分页组件，更新页码
                        var pageTotal = Math.ceil(result.page['rowCount'] / result.page['pageSize']);
                        if (pageNo == 1) {
                            self.pageCon.upDate({
                                pageTotal: pageTotal
                            })
                        }
                    }
                })
            },
            pageInit: function () {
                var self = this;
                this.pageCon = new Pagination({
                    container: $(".select_video_page"),
                    pageTotal: 0,
                    callback: function (page) {
                        self.getList(page)
                    }
                })
            },
            updateDownNum: function (kczl) {
                var self = this;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        kczl.xzcs += 1;
                    }
                }
                Service.get("/jxxt/api/admin/kczl/addZlXzcs/" + kczl.id, null, success);
            },
        },
        created: function () {
            var self = this;
            this.course = this.$store.getters.getCourse();
            if(this.course.id){
                this.getList()
            }else{
                this.$root.getCourse().then(function(data){
                    self.course = data.course;
                    self.getList()
                })
            }
        },
        mounted: function () {
            this.pageInit();
        },
    });
    return addSource;
});
