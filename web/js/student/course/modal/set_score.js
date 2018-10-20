/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var pro= Vue.component('modal',{
        template:__inline("/web/html/student/course/modal/set_score.html"),
        data: function () {
            return {
                danxfz : 0,
                duoxfz : 0,
                pandfz : 0,
                zhugfz : 0
            }
        },
        methods: {
            callPraentCb:function(){
                this.cb(this.a)
            },
            closeModal:function(){
                this.$modal.hide(this)
            },
            saveFz:function(){
                var self = this;
                if(self.danxfz==0&&self.duoxfz==0&&self.pandfz==0&&self.zhugfz==0){
                    self.$modal.warn("请至少设置一项分值");
                }else{
                    var lx_fz = '1_'+self.danxfz+",2_"+self.duoxfz+",3_"+self.pandfz+",4_"+self.zhugfz;
                    var data = {
                        lx_fz : lx_fz,
                        sjid : self.options.sjid
                    };
                    var success = function (result) {
                         if (result.resultCode == "0") {
                             //回调主页面同时关闭自己
                             self.closeModal();
                             //调用回调函数传值
                             self.options.callback();
                         }
                    };
                    Service.get('/tkksxt/api/admin/sjtm/setScoreBatch', data, success);
                }

            }
        },
        created: function () {
        },
        mounted: function () {

        },
        props: ['options']
    });
    return pro
});