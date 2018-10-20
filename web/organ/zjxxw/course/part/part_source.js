/*
* 资料
* */
define(function () {
    return Vue.component('course_source', {
        template: __inline("./part_source.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                kczl_List: [],
            };
        },
        methods: {
            getList: function (page) {
                var pageNo = page || 1;
                var self = this;
                Service.get("/jxxt/api/admin/kczl/list", {courseId: this.course.id, pageNo: pageNo}, function (result) {
                    if (result.resultCode == 0) {
                        self.kczl_List = result.data;
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
            this.getList()
        },
        mounted: function () {
        },
        props: ['course']
    });
});