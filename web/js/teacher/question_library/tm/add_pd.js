import page from "Pagination";
mod.add_pd = Vue.component('add_pd', {
    template: __inline("/web/html/teacher/question_library/add_pd.html"),
    data: function () {
        return {
            tm: {
                mc: '',
                lx: 3,
                sfgk: 0,
                zsd: '',
                zqda: '',
                bz: '',
                id: '',
                kcid: ''
            },
            submitFlag: true
        };
    },
    methods: {
        setProUeditor: function (optionArr) {
            var self = this;
            Vue.nextTick(function () {
                optionArr.forEach(function (ele, i) {
                    CKEDITOR.replace(ele.dom, {height: '100px'});
                    CKEDITOR.instances[ele.dom].setData(ele.placeholder);
                    ele.cb && ele.cb();
                });
            });
        },
        /*
       * 关闭弹框
       * 参数：1、不带modal_的页面名称，2、all，代表关闭所有弹框
       * */
        closeModal: function () {
            this.$modal.hide(this);
        },
        //选择正确选项
        selOptioin: function (option) {
            option.isSelect = 1;
        },
        //保存判断题
        saveRegonize: function () {
            var self = this;
            if (this.submitFlag) {
                this.submitFlag = false;

                if (this.tm.zqda == "") {
                    self.$modal.warn('请设置正确答案');
                    this.submitFlag = true;
                } else if (!CKEDITOR.instances['regonize_container'].document.getBody().getText().trim()) {
                    self.$modal.warn('题目内容不能为空');
                    this.submitFlag = true;
                } else {
                    self.tm.mc = CKEDITOR.instances['regonize_container'].getData();
                    self.tm.bz = CKEDITOR.instances['regonize_answer_container'].getData();

                    var data = {
                        tm: self.tm,
                        sjid: self.options.sjid
                    };
                    var success = function (result) {
                        if (result.resultCode == "0") {
                            self.closeModal();
                            //回调主页面刷新列表
                            self.options.callback();
                        }
                    };
                    Service.postBody('/tkksxt/api/admin/tk/saveOrUpdatePdJd', data, success);
                }
            }
        },
        //初始化UE编辑器
        initUe: function () {
            var optionArr = [{
                dom: 'regonize_answer_container'
            }, {
                dom: 'regonize_container'
            }];
            this.setProUeditor(optionArr);
        },
        editUe: function () {
            var optionArr = [{
                dom: 'regonize_answer_container',
                placeholder: this.tm.bz || ''
            }, {
                dom: 'regonize_container',
                placeholder: this.tm.mc || ''
            }];
            this.setProUeditor(optionArr);
        }
    },
    created: function () {
        var self = this;
        if (self.options.editTm) {
            //编辑
            self.tm.id = self.options.editTm.id;
            self.tm.mc = self.options.editTm.mc;
            self.tm.lx = self.options.editTm.lx;
            self.tm.sfgk = self.options.editTm.sfgk;
            self.tm.zsd = self.options.editTm.zsd;
            self.tm.zqda = self.options.editTm.zqda;
            self.tm.bz = self.options.editTm.bz;
            self.tm.kcid = self.options.editTm.kcid;
            self.editUe();
        } else {
            this.tm.kcid = this.options.kcid;
            self.initUe();
        }
    },
    mounted: function () {
    },
    props: ['options']
});
