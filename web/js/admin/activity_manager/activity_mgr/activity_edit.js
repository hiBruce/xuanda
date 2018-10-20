import page from "Pagination";
mod.activity_edit = Vue.component('activity_edit', {
    template: __inline("/web/html/admin/activity_manager/activity_mgr/activity_edit.html"),
    data: function () {
        return {
            // activityId: URL.getParameter('activityId') || '',
            // rows_disciplines: [],
            rows_type: [],
            type: '请选择',
            // 页面数据模型
            dataModel: {
                typeId: '',
                topStatus: 0,
                title: '',
                sourceUrl: '',
                titlePic: '',
                pic1: '',
                picDesc1: '',
                pic2: '',
                picDesc2: '',
                pic3: '',
                picDesc3: '',
                description: '',
                content: '',
                style: 2,
                notice: '',
                startDate: '',
                endDate: '',
                sponsor: '',
                province: '',
                city: '',
                area: '',
                address: '',
                cost: 0,
                type: 0,
                activeStatus: 0,
                reviewStatus: 0,
                maxMemberCount: 100
            },
            temporaryStorage: {
                topStatus: 0,
                style: 2,
                cost: 0,
                type: 0,
                activeStatus: 0,
                reviewStatus: 0,
                maxMemberCount: 100
            },
            areaProvince: {},
            areaCity: {},
            areaDistrict: {},
            areas: [],
            cities: [],
            districts: []
        };
    },
    methods: {
        /**
         * 获取活动信息
         */
        getActivityInfo: function () {
            var self = this;
            var activityId = self.getParamterFromUrl("activityId");
            if (!isNull(activityId) && !activityId.isEmpty()) {
                var success = function (result) {
                    self.dataModel = Utils.getDefault(result.data, self.dataModel);
                    self.temporaryStorage = JSON.parse(JSON.stringify(self.dataModel));
                    if (self.dataModel.startDate)
                        document.getElementById('startDate').value = window.dateMinute(self.dataModel.startDate);
                    if (self.dataModel.endDate)
                        document.getElementById('endDate').value = window.dateMinute(self.dataModel.endDate);
                    self.getAreas().then(function () {
                        self.areaChecked();
                    });
                };
                Service.get('/zjxxw/api/admin/activity/' + activityId, null, success);
            }else{
                self.getAreas().then(function () {
                    self.areaChecked();
                });
            }
        },
        /**
         * 获取活动分类信息
         */
        getActivityTypeList: function () {
            var self = this;
            var success = function (result) {
                self.rows_type = result.data;
            };
            Service.get('/zjxxw/api/admin/activitytype/0/list', null, success);
        },
        /**
         * 提交活动信息
         */
        submitActivityInfo: function (event) {
            var self = this;
            self.dataModel.startDate = new Date($('#startDate').val()).getTime();
            self.dataModel.endDate = new Date($('#endDate').val()).getTime();
            self.dataModel.province = self.areaProvince.name;
            self.dataModel.areaProvince = self.areaProvince.code;
            self.dataModel.city = self.areaCity.name;
            self.dataModel.areaCity = self.areaCity.code;
            self.dataModel.area = self.areaDistrict.name;
            self.dataModel.areaDistrict = self.areaDistrict.code;
            event.preventDefault();
            if (self.dataModel.startDate && self.dataModel.endDate && self.dataModel.startDate < self.dataModel.endDate) {
                var success = function (result) {
                    self.$modal.success('操作成功',function(){
                        self.$router.push('/jxzz/hdgl/hdgl')
                    });
                };
                Service.postBody('/zjxxw/api/admin/activity/update', this.dataModel, success);
            } else {
                self.$modal.error("请选择正确的开始时间及结束时间！");
            }

        },
        returnList: function () {
            this.$router.push("/jxzz/hdgl/hdgl")
        },
        //重新填写，回到最初的datamodel
        reset: function () {
            this.dataModel = JSON.parse(JSON.stringify(this.temporaryStorage));
        },
        upload: function (imgId) {
            var self = this;
            $.fcup({
                updom: '#' + imgId,//这个是页面里定义好的一个元素
                upurl: '/upfile',
                upstr: '上传',
                upfinished: '上传',
                upcallback: function (res) {
                    if (res.resultCode == 0) {
                        self.dataModel[imgId] = res.url;
                    } else {
                        self.$modal.error('上传失败');
                    }
                }
            });
        },
        areaChecked: function () {
            var self = this;
            if (isNull(this.dataModel.areaProvince) || '' == this.dataModel.areaProvince) {
                self.dataModel.areaProvince = this.areas[0].code;
                self.dataModel.province = this.areas[0].name;
                self.areaProvince = this.areas[0];
            } else {
                var ind = 0;
                var cityind = 0;
                var distInd = 0;
                this.areas.forEach(function (ele, i) {
                    if (ele.code == self.dataModel.areaProvince) {
                        ind = i;
                    }
                });
                self.areaProvince = this.areas[ind];
            }
        },
        /**
         * 地区选择
         */
        getAreas: function () {
            var self = this;
            return new Promise(function (res, rej) {
                md.init(function () {
                    self.areas = metadata.getClassCodeCategory('area');
                    res();
                });
            });
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
    watch: {
        'areaProvince': {
            handler: function (newval, oldVal) {
                var self = this;
                this.areas.forEach(function (val) {
                    if (val.code === newval.code) {
                        self.cities = val.children;
                        var ind = 0;
                        self.cities.forEach(function (ele, i) {
                            if (ele.code == self.dataModel.areaCity) {
                                ind = i;
                                return;
                            }
                        });
                        self.areaCity = self.cities[ind];
                    }
                });
            },
            deep: true
        },
        'areaCity': {
            handler: function (newval, oldVal) {
                var self = this;
                self.districts = this.areaCity.children;
                var ind = 0;
                this.districts.forEach(function (val, i) {
                    if (val.code == self.dataModel.areaDistrict) {
                        ind = i;
                        return;
                    }
                });
                self.areaDistrict = self.districts[ind];
            },
            deep: true
        }
    },
    created: function () {
        var self = this;
        this.getActivityInfo();
        this.getActivityTypeList();


    },
    mounted: function () {
        this.upload('titlePic');
        this.upload('pic1');
        this.upload('pic2');
        this.upload('pic3');
        setTimeout(setfootDet,0)
    }
});
