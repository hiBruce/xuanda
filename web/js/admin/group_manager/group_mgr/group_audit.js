import page from "Pagination";
mod.group_audit = Vue.component('group_audit', {
    template: __inline("/web/html/admin/group_manager/group_audit.html"),
    data: function () {
        return {
            groupId: '',
            // 圈子分类
            row_group_class: [],
            // 页面数据模型
            dataModel: {},
            temporaryStorage: {}
        };
    },

    methods: {
        /**
         * 获取圈子信息
         */
        getGroupInfo: function () {
            var self = this;
            if (!isNull(this.groupId) && !this.groupId.isEmpty()) {
                var success = function (result) {
                    self.dataModel = Utils.getDefault(result.data, self.dataModel);
                    self.temporaryStorage = JSON.parse(JSON.stringify(self.dataModel));
                    self.initPage();
                };
                Service.get('/zjxxw/api/admin/group/' + this.groupId, null, success);
            } else {
                self.initPage();
            }
        },

        /**
         * 获取圈子分类信息
         */
        getGroupClassList: function () {
            var self = this;
            var data = {
                pageNo: self.pageNo
            };
            var success = function (result) {
                self.row_group_class = result.data;
            };
            Service.get('/zjxxw/api/admin/groupmgr/classify/list', data, success);
        },

        /**
         * 提交审核
         * @param id
         */
        reviewGroup: function (id, reviewStatus) {
            var self = this;
            var success = function (result) {
                if(result.success){
                    self.$modal.success('操作成功', function () {
                        self.$router.push('/jxzz/qzgl/qzsh');
                    });
                }else{
                    self.$modal.error("操作失败")
                }
            };
            Service.post('/zjxxw/api/admin/group/' + id + '/review/' + reviewStatus, null, success);

        },

        /**
         * 初始化页面
         */
        initPage: function () {
            setTimeout(setfootDet,0)
        }

    },

    created: function () {
        /**
         * 从URL获取参数
         * @param param
         * @returns {*}
         */
        function getParamterFromUrl(key) {
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

        this.groupId = getParamterFromUrl("groupId");
        this.getGroupInfo();
        this.getGroupClassList();
    },

    mounted: function () {

    }
});
