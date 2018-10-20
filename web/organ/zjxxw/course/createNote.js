/**
 * 课程首页js
 */
define(function () {
    return Vue.component('addnote', {
        template: __inline('./create_note.html'),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                noteTitle: '',
                chapterInd: '',
                nr: '',
                impStatus: 0,
                shareStatus: 0,
                myoutline: ''
            }
        },
        methods: {
            submit: function () {
                var self = this;
                var params = {
                    cbt: this.noteTitle.trim(),
                    cnr: this.nr.trim(),
                    ckcid: this.course.id,
                    cksid: this.myoutline[this.chapterInd] ? this.myoutline[this.chapterInd].id : '',
                    ckcmc: this.course.name,
                    cksmc: this.myoutline[this.chapterInd] ? (this.myoutline[this.chapterInd].contentType == 0 ? this.myoutline[this.chapterInd].name : this.myoutline[this.chapterInd].contentName) : '',
                    nsfzybj: this.impStatus ? 1 : 0,
                    nfxzt: this.shareStatus ? 1 : 0,
                    loading: true,
                };
                for (param in params) {
                    if (params.hasOwnProperty(param)) {
                        if (params[param] === '') {
                            self.$modal.warn('请填写完整笔记');
                            return;
                        }
                    }
                }
                ;
                if (Utils.getStrLength(params.cnr) > 1000) {
                    self.$modal.warn('请填写500字以内的笔记');
                    return;
                }
                if (window.getSensitiveWords(params.cnr) && window.getSensitiveWords(params.cbt)) {
                    Service.postBody('/jxxt/api/course/notes/create', params, function (res) {
                        self.cb()
                    })
                } else {
                    self.$modal.error("请不要填写敏感词汇!")
                }


            },
            clear: function () {
                this.noteTitle = '';
                this.nr = '';
                this.chapter = '';
                $("#showLen2").text(0);
            },
            closeNote: function () {
                this.closecb()
            },
            getOutline: function () {
                var self = this;
                Service.get('/jxxt/api/admin/chapter/getChapterListByCourseId/' + this.course.id, null, function (res) {
                    if (res.resultCode == '0') {
                        self.myoutline = res.data;
                    }
                })
            },
            set: function (val) {
                this.nr = val;
            },
            setBt: function (val) {
                this.noteTitle = val;
            }
        },
        created: function () {
            if (!this.outline || this.outline.length < 1) {
                this.getOutline();
            } else {
                this.myoutline = this.outline;
            }
        },
        mounted: function () {
            // Utils.controlEleLen('CNr', 'showLen2')
        },
        props: ['course', 'outline', 'cb', 'closecb']
    })
});