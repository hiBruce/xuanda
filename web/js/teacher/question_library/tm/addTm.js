import page from "Pagination";
mod.addtm = Vue.component('addtm', {
    template: '<div><button class="btn"  @click="addInit()">新增试题</button></div>',
    data: function () {
        return {
        };
    },
    methods: {
        //新增试题
        addInit: function () {
            this.$modal.show(this, {
                templateURL: __uri('/web/js/build_course/tkgl/add_init.js?v'),
                kcid: this.kcid,
                callback: this.addChoose,
                width: 700,
                title: '新增试题'
            });
        },
        addChoose: function (tx, kcid) {
            var self = this;
            if (tx == 1) {
                //选择题
                self.addXz(kcid);
            } else if (tx == 2) {
                //判断题
                self.addPd(kcid);
            } else if (tx == 3) {
                //简答题
                self.addZg(kcid);
            }
        },
        //新增选择题
        addXz: function (kcid) {
            this.$modal.show(this, {
                templateURL: __uri('/web/js/build_course/tkgl/tm/add_xz.js?v'),
                kcid: kcid,
                sjid: this.sjid,
                sjtmFlag: this.sjtmFlag,
                callback: this.callback,
                title: '新增选择题'
            });
        },
        //新判断题
        addPd: function (kcid) {
            this.$modal.show(this, {
                templateURL: __uri('/web/js/build_course/tkgl/tm/add_pd.js?v'),
                kcid: kcid,
                sjid: this.sjid,
                callback: this.callback,
                title: '新增判断题'
            });
        },
        //新增主观题
        addZg: function (kcid) {
            this.$modal.show(this, {
                templateURL: __uri('/web/js/build_course/tkgl/tm/add_zg.js?v'),
                kcid: kcid,
                sjid: this.sjid,
                callback: this.callback,
                title: '新增主观题'
            });
        }
    },
    created: function () {
    },
    mounted: function () {
    },
    props: ['callback', 'sjid', 'kcid', 'sjtmFlag']
});
