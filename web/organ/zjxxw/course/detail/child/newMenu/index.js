/**
 * 班级公告
 */
define([], function () {
    var newMenu = Vue.component('newMenu', {
        template: __inline("./index.html"),
        data: function () {
            return {
                ind : this.$route.params.index,
                menu:{
                    sfgk:0
                },
                sfgk:0,
                editNr:0,
                editMc:1
            };
        },
        methods: {
            editMcFun:function(){
                this.editMc = 0;
                this.xxmc = this.menu.xxmc;
            },
            updateMc:function(){
                if(this.xxmc == this.menu.xxmc){
                    this.editMc = 1;
                }else{
                    this.menu.xxmc =this.xxmc;
                    this.update('editMc')
                }
            },
            editFun:function(){
                this.editNr = 1;
            },
            initEdit:function(){
                CKEDITOR.inline('editNr');
                CKEDITOR.instances['editNr'].setData(this.menu.xxnr);
            },
            submitEdit:function(){
                var self = this;
                var text = CKEDITOR.instances['editNr'].getData();
                if(this.menu.xxnr !== text ){
                    self.menu.xxnr = text;
                    this.update('editNr');
                    CKEDITOR.instances['editNr'].destroy();
                 }else{
                    CKEDITOR.instances['editNr'].destroy();
                    self.editNr = 0;
                }
            },
            cancleEdit:function(){
                this.editNr = 0;
                CKEDITOR.instances['editNr'].destroy();
            },
            update:function(attr){
                var self = this;
                var success = function (result) {
                    if (result.resultCode == 0) {
                        if(attr){
                            self[attr] = !self[attr];
                        }
                        self.$modal.success("保存成功");
                        self.$root.getKcXx()

                    } else {
                        self.$modal.error("保存失败");
                    }
                };
                Service.postBody('/jxxt/api/admin/kcxx/update', this.menu, success);
            },
            init:function(){
                this.menu = JSON.parse(this.$route.query.newMenu)[this.$route.params.index];
            }
        },
        watch:{
            $route:{
                deep:true,
                handler:function(){
                      this.init()
                }
            }
        },
        created: function () {
            this.init()
        },
        mounted: function () {
        }
    });
    return newMenu;
});