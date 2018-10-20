/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("./modal_baseinfo.tpl"),
        data: function () {
            return {
                rows_courseCategory: [],
                course: {},
                temp_data: {},
                temp_sel_arr: [],//暂存选中数据的数组
                temp_sel_ind: 0
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
            },
            /**
             * 获取课程分类信息
             */
            getCourseClassifyList: function () {
                var self = this;
                var data = {
                    pageNo: self.pageNo
                };
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.rows_courseCategory = result.data;
                        if (!self.course.classifyId)
                            self.course.classifyId = self.rows_courseCategory[0].id;
                        self.computeData();
                    }
                };
                Service.get('/jxxt/api/admin/courseCategory/getAllCategory', data, success);
            },
            /**
             * 提交课程信息
             */
            submitCourseInfo: function () {
                var self = this;
                if (this.course.type == 2 && this.course.sfsk == 0 && !this.course.sksj) {
                    self.$modal.error("设置课程为收费课程并且可以试看，请输入试看时间！");
                } else {
                    var success = function (result) {
                        self.$modal.success("操作成功!");
                        location.reload()
                        self.closeModal();

                    };
                    Service.postBody('/jxxt/api/admin/course/update', this.course, success);
                }
            },
            computeData: function () {
                var self = this;
                self['temp_data'] = getEleFun(this.rows_courseCategory, self.course.classifyId)

                function getEleFun(paramsArr, comPareId) {
                    if (comPareId) {
                        var getEle = [];
                        var canReturn = false;
                        getEle = paramsArr.filter(function (ele, i) {
                            return ele.id == comPareId;
                        });
                        ;
                        if (getEle && getEle.length <= 0) {
                            for (var i = 0, j = paramsArr.length; i < j; i++) {
                                if (paramsArr[i]) {
                                    getEle = getEleFun(paramsArr[i].subCateogries, comPareId);
                                    if (getEle && getEle.length > 0) {
                                        return getEle;
                                    }
                                }
                            }
                        }
                        return getEle;
                    } else {
                        return []
                    }
                    ;
                }

                self['temp_data'] = self['temp_data'][0];
                if (self['temp_data']) {
                    self['temp_data']['ind'] = 0;
                    self.temp_sel_arr.push(self['temp_data']);
                    getDefaultData(self['temp_data'])

                    function getDefaultData(data) {
                        if (data.parentId) {
                            var parent = getEleFun(self.rows_courseCategory, data.parentId);
                            if (parent.length > 0) {
                                self.temp_sel_arr.unshift(parent[0]);
                                getDefaultData(parent[0])
                            }
                        }
                        ;
                    }

                    this.temp_sel_ind = self.temp_sel_arr.length;
                    self.temp_sel_arr.forEach(function (ele, i) {
                        ele.ind = i;
                    })
                    console.log(self.temp_sel_arr)
                }


            },
            setInd: function (ind) {
                this.temp_sel_ind = ind;
                // var  e = e || window.event;
                // var target  = e.target || e.srcElement;
                // this.temp_data = $(target).val();
            }
        },
        watch: {
            'temp_sel_arr': {
                handler: function (val, oldval) {
                    if (val[this.temp_sel_ind]) {
                        this.temp_data = val[this.temp_sel_ind];
                        this.temp_data['ind'] = this.temp_sel_ind;
                    }
                },
                deep: true
            },
            'temp_data': function (val) {
                if (val) {
                    this.course.classifyId = val.id;
                    if (val.ind >= this.temp_sel_arr.length - 1) {
                        if (val.subCateogries) {
                            this.temp_sel_arr.length = this.temp_sel_arr.length + 1;
                        }
                    } else {
                        this.temp_sel_arr.splice(val.ind + 1, (this.temp_sel_arr.length - val.ind - 1))
                        this.temp_sel_ind = this.temp_sel_arr.length - 1;
                        this.temp_sel_arr.length = this.temp_sel_arr.length + 1;
                    }
                }
            }
        },
        created: function () {
            this.getCourseClassifyList()
        },
        mounted: function () {
            if (this.options.course) {
                this.course = JSON.parse(JSON.stringify(this.options.course));
                if (!this.course.sourceType)
                    this.course.sourceType = 0;
                if (!this.course.sfsk)
                    this.course.sfsk = 0;
                if (!this.course.type)
                    this.course.type = 1;
                if (!this.course.studyStyle)
                    this.course.studyStyle = 0;
            }
        },
        props: ['options']
    });
    return modal
});