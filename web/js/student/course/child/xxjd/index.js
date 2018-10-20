/*
*编辑试题，此组件需要根据实际业务再次修改
* */
define(['c3'], function (c3) {
    var xxjd = Vue.component('xxjd', {
        template: __inline("/web/html/student/course/child/xxjd/index.html"),
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                progress: {},
                course: {},
                learningStatus: {}
            };
        },
        methods: {
            cePie: function () {
                var chart = c3.generate({
                    bindto: '#chart',
                    "size": {"width": 140, "height": 140},
                    data: {
                        "columns": [
                            ['我的进度', this.progress.jd || 0], ['未完成进度', 100 - parseFloat(this.progress.jd || 0)]
                        ],
                        "type": "donut",
                        colors: {
                            "未完成进度": '#f4f4f4',
                            '我的进度': '#62CCDE'
                        }
                    },
                    legend: {
                        show: false
                    },
                    tooltip: {
                        show: false
                    },
                    donut: {
                        title: (this.progress.jd || 0) + "%",
                        width: 10,
                        label: {
                            show: false//隐藏图形上的进度文字
                        }
                    },
                    "transition": {"duration": 1000}
                });
            },
            cjPie: function () {
                var chart = c3.generate({
                    bindto: '#cj_chart',
                    "size": {"width": 120, "height": 200},
                    data: {
                        "columns": [
                            ['视频观看', this.progress.spFs],
                            ['作业', this.progress.zyFs],
                            ['考试', this.progress.ksFs],
                            ['练习', this.progress.lxFs],
                            ['文本', this.progress.wbFs],
                            ['未完成分数', 100 - parseFloat(this.progress.spFs) - parseFloat(this.progress.zyFs) - parseFloat(this.progress.ksFs) - parseFloat(this.progress.lxFs) - parseFloat(this.progress.wbFs)]
                        ],
                        "type": "donut",
                        colors: {
                            "未完成分数": '#f4f4f4',
                            '视频观看': '#1f77b4',
                            '作业': '#ff7f0e',
                            '考试': '#2ca02c',
                            '练习': '#e55c6f',
                            '文本': '#4e59bf'
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    legend: {
                        show: false
                    },
                    donut: {
                        title: parseFloat(parseFloat(this.progress.spFs) + parseFloat(this.progress.zyFs) + parseFloat(this.progress.ksFs) + parseFloat(this.progress.lxFs) + parseFloat(this.progress.wbFs)).toFixed(2) + "分",
                        width: 20,
                        label: {
                            show: false//隐藏图形上的进度文字
                        }
                    },
                    "transition": {"duration": 1000}
                });
            },
            getData: function () {
                var self = this;
                Service.get("/jxxt/api/admin/xykctj/wdKcJd", {kcId: this.course.id}, function (res) {
                    if (res.success) {
                        self.progress = res.data[0];
                        self.cePie();
                        self.cjPie();
                    }
                });
            }
        },
        created: function () {
            this.course = this.$store.getters.getCourse();
            this.learningStatus = this.$store.getters.getLearnStatus();
            if (this.course.id) {
                this.getData();
            } else {
                var self = this;
                this.$root.getCourse().then(function (data) {
                    self.course = data.course;
                    self.getData();
                    self.learningStatus = data.learningStatus;
                });
            }
        },
        mounted: function () {
        }
    });
    return xxjd;
});
