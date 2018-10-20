import page from "Pagination";
import fcup from 'fcup';

mod.common_settings = Vue.component('common_settings', {
    template: __inline("/web/html/admin/template_manager/common_settings/common_settings.html"),
    data: function () {
        return {
            editInfo: "",
            dwInfo: {}
        };
    },
    methods: {
        saveDwXx() {
            var self = this;
            var success = function (result) {
                if (result.success) {
                    self.$modal.tip('success', '保存成功！');
                } else {
                    self.$modal.tip('error', '系统异常请重试！');
                }
            };
            Service.postBody("/centro/api/dwxx/update", self.dwInfo, success);
        },
        getDwXx: function () {
            var self = this;
            var success = function (result) {
                console.log(result);
                if (result.success) {
                    self.dwInfo = result.data;
                }
            };
            Service.get("/centro/api/dwxx/getDwXx", null, success);
        },
        //重置
        clear: function () {
            this.dwInfo.logoUrl = '';
        },
        /**
         * 上传文件
         */
        upload: function () {
            var self = this;
            $.fcup({
                updom: '.upload2',//这个是页面里定义好的一个元素
                upurl: '/upfile',
                upstr: '上传LOGO文件',
                acceptType: self.fileType,
                upfinished: '上传完成',
                upcallback: function (result) {
                    if (result.resultCode == 0) {
                        self.dwInfo.logoUrl = result.url;
                    } else {
                        self.$modal.error("文件上传失败");
                    }
                }
            });
        }
    },
    computed: {
        // 计算属性的 getter
        reversedMessage: function () {
            // `this` 指向 vm 实例
            return this.message.split('').reverse().join('');
        }
    },
    created: function () {
    },
    mounted: function () {
        this.upload();
        this.getDwXx();
    }
});
