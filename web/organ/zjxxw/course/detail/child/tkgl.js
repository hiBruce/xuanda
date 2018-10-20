define(function () {
       var tkgl = Vue.component('tkgl', {
         template: __inline("./tkgl.html"),
        data: function () {
            return {
                tabNum:0
            };
        },
        components: {
            'wdtk': function (res, rej) {
                require([__uri('/web/v/ucenter/tkgl/tk_wd.js?v')], res)
            },
            'ggtk': function (res, rej) {
                require([__uri('/web/v/ucenter/tkgl/tk_gg.js?v')], res)
            }
        },
        methods: {
            showModal: function (name) {
                $("#modal_" + name).show();
            },
            /*
            * tab切换
            * */
            showTabs:function(num){
                this.tabNum = num
            }
        },
        created: function () {

        },
        mounted: function(){

        }
    });
       return tkgl;
});
