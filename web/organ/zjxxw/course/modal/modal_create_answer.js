/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("./modal_create_answer.html"),
        data: function () {
            return {
                row: [],
                zjList: [],
                zj: [],
                zjId: [],
                content: '',
                learningStatus: {},
            }
        },
        methods: {
            set: function (val) {
                this.content = val;
            },
            getChapterListByCourseId: function () {
                var self = this;
                //var data = {courseId:self.row.id}
                var success = function (ret) {
                    if (ret.success) {
                        if (ret.data.length > 0) {
                            self.zjList = ret.data
                        }

                    } else {
                        self.$modal.tip('error', '内容加载出现错误，请关闭后重新打开！', null, 3000)
                    }
                }
                Service.get('/jxxt/api/admin/chapter/getChapterListByCourseId/' + self.row.id, null, success);
            },
            closeModal: function () {
                this.$modal.hide(this)
            },
            pickZj: function (zj) {
                var self = this;
                for (i = 0; i < self.zjList.length; i++) {
                    if (self.zjList[i].id == self.zjId) {
                        self.zj = self.zjList[i]
                        return
                    }
                }
            },
            submit: function () {
                var self = this;
                var row = self.row;
                if (self.zj.length == 0) {
                    self.$modal.tip('error', '请选择章节！', null, 3000)
                    return
                }
                if (!this.content.trim()) {
                    self.$modal.tip('error', '请输入答疑内容！', null, 3000)
                    return
                }
                var addZy = {
                    id: null,
                    mc: this.content,
                    kcid: row.id,
                    kcmc: row.name,
                    ksid: self.zj.id,
                    ksmc: self.zj.name ? self.zj.name : self.zj.contentName,
                    xyid: '',
                    xymc: '',
                    xybj: '',
                    bjmc: '',
                    hfrid: '',
                    hfrmc: '',
                    bhfrid: '',
                    bhfrmc: '',
                    txurl: '',
                    cjsj: null,
                    parentId: null,
                    hfzt: 0,
                    delFlag: 0,
                    jxdid: self.learningStatus.dwId,
                    children: []
                }
                var success = function (ret) {
                    if (ret.success) {
                        self.$modal.hide(self)
                        self.options.method();
                    } else {
                        self.$modal.tip('error', '系统异常请重试！', null, 3000)
                        $('.btnSubmit').html('重新提交')
                    }
                }
                Service.postBody('/jxxt/api/course/ksdy/add', addZy, success)
            },
        },
        created: function () {
            var self = this;
            self.row = self.options.row;
            self.learningStatus = self.options.learningStatus;
            self.getChapterListByCourseId()
        },
        mounted: function () {

        },
        props: ['options']
    });
    return modal
});