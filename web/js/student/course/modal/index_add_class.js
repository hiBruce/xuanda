/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("/web/html/student/course/modal/index_add_class.html"),
        data: function () {
            return {
                chapter: {
                    templateType:"",
                    name: "",
                    // 课程默认封面图片Url
                    imgUrl: "http://dfs.zjlll.net/group1/M00/00/07/CmQXWlr1JR-AaHknAAAJVNfnvMM309.jpg"
                }
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
            },
            selectMB:function(e,num){
                 var eve = e || window.event;
                 var target = $(eve.target);
                 $(".mb_img").removeClass('bor-red');
                 target.addClass("bor-red");
                this.chapter.templateType = num;
            },
            /**
             * 提交章节名称
             */
            submitChapter: function () {
                var self = this;
                if(!this.chapter.name){
                    this.$modal.error("请输入课程名称", function () {
                        $(".chapter_name_input").focus()
                    });
                    return;
                }else if(this.chapter.templateType===''){
                    this.$modal.error("请选择模板");
                    return;
                }
                var success = function (result) {
                    if (result.resultCode == 0) {
                        self.options.cb(result.data['id']);
                    } else {
                        self.$modal.error("提交失败")
                    }
                };
                Service.postBody('/jxxt/api/admin/course/update', this.chapter, success);
            },
        },
        created: function () {

        },
        mounted: function () {

        },
        props: ['options']
    });
    return modal
});