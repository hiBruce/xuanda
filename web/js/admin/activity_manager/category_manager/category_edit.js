import page from "Pagination";
mod.category_edit = Vue.component('category_edit', {
    template: __inline("/web/html/admin/activity_manager/category_manager/category_edit.html"),
    data: function () {
        return {
            // id: URL.getParameter('id') || '',
            // 页面数据模型
            dataModel: {
                parentId: '0',
                name: '',
                sort: '',
                creatorId: '',
                creatorName: '',
                createDate: '',
                remarks: '',
                delStatus: ''
            },
            temporaryStorage: {
                parentId: '0'
            }
        };
    },
    methods: {
        /**
         * 获取活动分类信息
         */
        getActivityTypeInfo: function () {
            var self = this;
            var id = self.getParamterFromUrl("id");
            if (!isNull(id) && !id.isEmpty()) {
                var success = function (result) {
                    self.dataModel = Utils.getDefault(result.data, self.dataModel);
                    self.temporaryStorage = JSON.parse(JSON.stringify(self.dataModel));
                    self.initPage();
                };
                Service.get('/zjxxw/api/admin/activitytype/' + id, null, success);
            } else {
                self.initPage();
            }
        },

        /**
         * 提交课程信息
         */
        submitActivityTypeInfo: function (event) {
            event.preventDefault();
            var self = this;
            var success = function (result) {
                self.$modal.success('操作成功', function () {
                    self.$router.push('/jxzz/hdgl/flgl');
                });
            };
            Service.postBody('/zjxxw/api/admin/activitytype/update', this.dataModel, success);
        },

        returnList: function () {
            this.$router.push('/jxzz/hdgl/flgl');
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
        initWpicker: function () {
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
                    var param = params[i].split("=");
                    if (key == param[0]) {
                        return param[1];
                    }
                }
                return '';
            }
        }
    },
    created: function () {
        this.getActivityTypeInfo();
    },
    mounted: function () {
    }
});
