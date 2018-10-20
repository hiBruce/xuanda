import page from "Pagination";
mod.organ_settings = Vue.component('organ_settings', {
    template: __inline("/web/html/admin/organ_manager/organ_settings/organ_settings.html"),
    data: function () {
        return {
            editInfo: "",
            dwInfo: {}
        };
    },
    methods: {
        edit: function (id) {
            this.editInfo = this.dwInfo.jj;
            $(id).modal('show');
        },
        saveMc() {
            var self = this;
            var success = function (result) {
                if (result.success) {
                    self.$modal.tip('success', '保存成功！');
                } else {
                    self.$modal.tip('error', '系统异常请重试！');
                }
            };
            Service.postBody("/centro/api/dw/update", self.dwInfo, success);
        },
        saveJj() {
            this.dwInfo.jj = this.editInfo;
            this.saveMc();
            $("#edit").modal('hide');
        },
        getDwInfo: function () {
            var self = this;
            var success = function (result) {
                if (result.success) {
                    self.dwInfo = result.data;
                }
            };
            Service.get("/centro/api/dw/jxdInfo", null, success);
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
        this.getDwInfo();
    }
});
