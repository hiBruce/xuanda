/**
 * 导入教师
 * @author 胡晓光
 */
mod.student_import = Vue.component('student_import', {
    template: __inline("/web/html/admin/account_manager/list_student/student_import.html"),
    data: function () {
        return {};
    },
    methods: {
        /**
         * 上传文件
         */
        upload: function () {
            var self = this;
            $.fcup({
                updom: '.upload2',//这个是页面里定义好的一个元素
                upurl: '/upfile',
                upstr: '导入学生',
                acceptType: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
                upfinished: '导入学生',
                upcallback: function (result) {
                    if (result.resultCode == 0) {
                        self.afterUpload(result);
                    }
                }
            });
        },

        afterUpload: function (result) {
            var self = this;
            var data = {
                excelUrl: result.url,
                drlx: 'xs',
                loading: true
            };
            var success = function (result) {
                if (result.success) {
                    if (result.data.fialedCount == 0) {
                        self.$modal.success("导入成功");
                        self.resultExcel = '';
                        self.options.callback(1);
                    } else {
                        self.$modal.warn("导入完成，其中成功" + result.data.successCount + "条，失败" + result.data.fialedCount + '条，请下载结果，修改后再次提交');
                        self.resultExcel = result.data.returnFile;
                        self.options.callback(1);
                    }
                } else {
                    self.$modal.error("导入失败");
                }
            };
            Service.get("/centro/api/dw/jxdImportUser", data, success);
        },

        callPraentCb: function () {
            this.cb(this.a)
        },
        closeModal: function () {
            this.$modal.hide(this);
        }
    },
    mounted: function () {
        this.upload();
    },
    props: ['options']
});