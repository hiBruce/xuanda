define(function () {
    var pro = Vue.component('modal', {
        template: __inline("./modal_question_hf.html"),
        data: function () {
            return {
                /*ueoption:{
                    toolbars: [[
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat', 'formatmatch', 'blockquote', 'pasteplain', '|', 'forecolor', 'insertorderedlist', 'insertunorderedlist', 'cleardoc', '|',
                        , 'lineheight', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                        'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                        'simpleupload', 'insertimage',  'insertvideo', 'attachment', 'insertframe', 'insertcode', 'template', 'background', '|',
                        'horizontal',  'spechars', 'wordimage', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',

                    ]],
                    autoHeightEnabled:false,
                    initialFrameHeight:100
                },*/
                row:[],
            }
        },
        methods: {
            init: function () {
                CKEDITOR.replace('edit_container', { height: '240px', width: '100%' });
                CKEDITOR.instances['edit_container'].setData('');
            },
            closeModal: function () {
                this.$modal.hide(this)
            },
            cloneObj : function (obj) {
                var newObj = {};
                if (obj instanceof Array) {
                    newObj = [];
                }
                for (var key in obj) {
                    var val = obj[key];
                    //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
                    newObj[key] = typeof val === 'object' ? this.cloneObj(val): val;
                }
                return newObj;
            },
            submit:function () {
                var self = this;
                self.row.lsxx = CKEDITOR.instances['edit_container'].getData();;
                self.row.children = [];
                var success = function (ret) {
                    if(ret.success){
                        self.closeModal()
                        self.options.method()
                    }
                }
                Service.postBody('/jxxt/api/course/ksdy/submit',self.row,success)
            }
        },
        created: function () {
            var self = this;
            self.row = self.options.row;
        },
        mounted: function () {
            var self = this;
            self.init()
        },
        props: ['options']
    });
    return pro
});