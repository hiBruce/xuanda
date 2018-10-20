import page from "Pagination";
mod.category_edit = Vue.component('category_edit', {
    template: __inline("/web/html/admin/group_manager/category_edit.html"),
    data: function () {
        return {
            // groupClassId: URL.getParameter('groupClassId') || '',
            // 页面数据模型
            dataModel: {},
            temporaryStorage: {}
        };
    },

    methods: {
        /**
         * 获取标签信息
         */
        getGroupClassInfo: function () {
            var self = this;
            var groupClassId = self.getParamterFromUrl("groupClassId");
            if (!isNull(groupClassId) && !groupClassId.isEmpty()) {
                var success = function (result) {
                    self.dataModel = Utils.getDefault(result.data, self.dataModel);
                    self.temporaryStorage = JSON.parse(JSON.stringify(self.dataModel));
                    self.initPage();
                };
                Service.get('/zjxxw/api/admin/groupmgr/classify/' + groupClassId, null, success);
            } else {
                self.initPage();
            }
        },

        /**
         * 提交标签分类信息
         */
        submitGroupClassInfo: function (event) {
            var self = this;
            event.preventDefault();
            var success = function (result) {
                self.$modal.success('操作成功');
                self.$router.push('/jxzz/qzgl/flgl2');
            };
            Service.postBody('/zjxxw/api/admin/groupmgr/classify/update', this.dataModel, success);
        },
        back(){
            this.$router.push('/jxzz/qzgl/flgl2');
        },
        //重新填写，回到最初的datamodel
        reset: function () {
            this.dataModel = JSON.parse(JSON.stringify(this.temporaryStorage));
        },

        /**
         * 初始化页面
         */
        initPage: function () {
        },
        /**
         * 从URL获取参数
         * @param param
         * @returns {*}
         */
        getParamterFromUrl: function (key) {
            var url = location.href;
            var ind = url.indexOf("?");
            if (ind != -1) {
                var strs = url.substr(ind + 1);
                var params = url.indexOf("&") == -1 ? [strs] : strs.split("&");
                for (var i = 0; i < params.length; i++) {
                    if (params[i].indexOf("=") > 0) {
                        var param = params[i].split("=");
                        if (key == param[0]) {
                            return param[1];
                        }
                    }
                }
            }
            return '';
        }
    },

    created: function () {
        this.getGroupClassInfo();
    },

    mounted: function () {
    }
});
