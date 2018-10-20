/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var modal = Vue.component('modal', {
        template: __inline("/web/html/student/course/modal/modal_upload.html"),
        data: function () {
            return {
                upload_img: ""
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this)
            },
            /*
           * 选择系统推荐封面
           * */
            selectImg: function (e) {
                var target = e.target;
                if (target.nodeName.toLocaleLowerCase() != 'li') {
                    target = $(target).parents(".img_li");
                }
                ;
                if ($(target).length > 0) {
                    $(".select_span_selected").removeClass("select_span_selected");
                    $(target).find('.select_span').addClass('select_span_selected');
                    this.upload_img = $(target).find('img').attr('src')
                }

            },
            saveImg: function () {
                this.options.cb(this.upload_img);
                this.$modal.hide(this);
            },
            upload: function () {
                var self = this;
                $.fcup({
                    updom: '.upload_btn',//这个是页面里定义好的一个元素
                    upurl: '/upfile',
                    upstr: '上传封面',
                    upfinished: '上传封面',
                    maxSize:1,
                    acceptType:'img',
                    upcallback: function (res) {
                        if (res.resultCode == 0) {
                            self.upload_img = res.url;
                        } else if(res.resultCode == '2001'){
                            self.$modal.error(res.message);
                        }else {
                            self.$modal.error('上传失败');
                        }
                    },
                    errorcb:function(message){
                        self.$modal.error(message)
                    }
                });
            }
        },
        created: function () {
        },
        mounted: function () {
            this.upload();
            if (this.options.course.imgUrl) {
                this.upload_img = this.options.course.imgUrl;
            }
        },
        props: ['options']
    });
    return modal
});