/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(function () {
    var app = Vue.component('homework', {
        template: __inline("/web/html/student/course/child/homework.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                zyList: [],
                zy: [],
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
                pageSize: 10,
                pageNo: 1,
                pageContro: ''
            };
        },
        methods: {
            getList: function (page) {
                var self = this;
                if (isNull(page)) page = 1;
                self.pageNo = page;
                var data = {
                    kcid: this.course.id,
                    pageNo: self.pageNo,
                    pageSize: self.pageSize,
                    name: $('#searchName').val()
                }
                var success = function (ret) {
                    if (ret.success) {
                        self.zyList = ret.data;
                        if (page == 1) {
                            self.pageContro.upDate({
                                pageTotal: ret.pageCount
                            });
                        }
                    }
                }
                Service.postBody('/jxxt/api/course/homework/getKcZy', data, success);
            },
            //回车搜索
            keyEnter: function (event) {
                var self = this;
                //console.log(event.keyCode)
                if (event.keyCode == 13) {
                    self.getList();
                }
                if (event.keyCode == 8) {
                    if ($('#searchName').val().length == 1) {
                        $('#searchName').val('')
                        self.getList();
                    }
                }
            },
            showEdit: function (hw_data) {
                if (hw_data.id == null || hw_data.id == undefined) {
                    hw_data = {
                        id: null,
                        jszj: '',
                        kcid: this.course.id,
                        kcmc: this.course.name,
                        mc: '',
                        wtList: [],
                        zywt: '',
                        delFlag: 0
                    }
                }
                this.$modal.show(this, {
                    templateURL: __uri("/web/v/ucenter/build_course/edit_course/modal/modal_edit_homework.js?v"),
                    title: "编辑作业",
                    method: this.getList,
                    zy: hw_data,
                })
            },
            deleteConfirm: function (row) {
                var self = this;
                self.zy = row
                self.$modal.confirm('确定删除该作业吗？', self.deleteRow, null)
            },
            deleteRow: function () {
                var self = this;
                var success = function (ret) {
                    if (ret.success) {
                        self.getList()
                    }
                }
                Service.postBody('/jxxt/api/course/homework/deleteZy', self.zy.id, success)
            },
            useHomeWork: function (zy) {
                var self = this;
                zy.wtList = []
                var data = {zy: zy}
                var success = function (ret) {
                    if (ret.success) {
                        self.getList()
                    }
                }
                Service.postBody('/jxxt/api/course/homework/useHomeWork', data, success);
            },
            clearEdit: function () {
                var self = this;
                /*  $('.ueEdit').each(function () {
                      UE.getEditor($(this).attr('id'),self.ueoption) && UE.getEditor($(this).attr('id'),self.ueoption).destroy();
                  })*/
            },
            /**
             * 分页
             * @type {Pagination}
             */
            pagination: function () {
                var self = this;
                self.pageContro = new Pagination({
                    container: $('.hwmanagement_page'),//必填
                    pageTotal: 0,//必填，此处默认为0
                    callback: function (page) {//点击分页后的回调函数
                        self.getList(page);
                    }
                });
            },
        },
        created: function () {
            this.course = JSON.parse(this.$route.query.course);
            this.getList();
        },
        mounted: function () {
            this.pagination()
        },
    });
    return app;
});