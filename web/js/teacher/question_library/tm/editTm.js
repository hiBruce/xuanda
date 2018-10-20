import page from "Pagination";
mod.edittm = Vue.component('edittm', {
    template: '<div><button class="btn del_btn" @click="editTm()">编辑</button></div>',
    data: function () {
        return {
        };
    },
    methods: {
        //编辑题目
        editTm: function () {
            var tm = this.tm;
            var self = this;
            if (tm.lx == 1 || tm.lx == 2) {
                //选择题
                //打开选择题的框传递对象tm过去
                self.editXz(tm);
            } else if (tm.lx == 3) {
                //判断题
                self.editPd(tm);
            } else if (tm.lx == 4) {
                //简答题
                self.editJd(tm);
            }
        },
        //编辑选择题
        editXz: function (tm) {
            this.$modal.show(this, {
                templateURL: __uri('/web/js/build_course/tkgl/tm/add_xz.js?v'),
                editTm: tm,
                sjtmFlag: this.sjtmFlag,
                sjid: this.sjid,
                callback: this.callback,
                title: '编辑选择题'
            });
        },
        //编辑判断题
        editPd: function (tm) {
            this.$modal.show(this, {
                templateURL: __uri('/web/js/build_course/tkgl/tm/add_pd.js?v'),
                editTm: tm,
                callback: this.callback,
                title: '编辑判断题'
            });
        },
        //编辑主观题
        editJd: function (tm) {
            this.$modal.show(this, {
                templateURL: __uri('/web/js/build_course/tkgl/tm/add_zg.js?v'),
                editTm: tm,
                callback: this.callback,
                title: '编辑主观题'
            });
        }
    },
    created: function () {
    },
    mounted: function () {
    },
    props: ['tm', 'callback', 'sjtmFlag', 'sjid']
});
