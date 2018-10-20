define(function () {
    var khbz = Vue.component('khbz', {
        template: __inline('/web/html/student/course/child/bjgl/khbz.html'),
        data: function () {
            return {
                courseKh: {}
            }
        },
        methods: {
            closeModal: function () {
                this.$modal.hide(this);
            },
            /**
             * 提交课程考核比例设置
             */
            submitScale: function () {
                var self = this;
                // 验证比例之和是否为100%
                
                if (this.courseKh.kczf === 100) {
                    self.courseKh.kcId = self.course.id;
                    var success = function (result) {
                        self.$modal.success("设置成功！");
                        self.getKcKh(self.course.id)
                    };
                    Service.postBody('/jxxt/api/admin/course/updateKcKh', self.courseKh, success);
                } else {
                    self.$modal.error("所设比例总和不为100%，请修改后再次提交！");
                }
            },

            /**
             * 根据课程id获取该课程的考核比例
             *
             * @param courseId
             */
            getKcKh: function (courseId) {
                var self = this;
                var success = function (result) {
                    if (result.data) {
                        self.courseKh = result.data;
                    }
                };
                Service.get('/jxxt/api/admin/course/getKhBl/' + courseId, null, success);
            }
        },
        created: function () {
            this.course = JSON.parse(this.$route.query.course)
            this.getKcKh(this.course.id);
        },
        mounted: function () {
        	
        },
        computed:{
            'getKczf':function(){
                this.courseKh.kczf = parseFloat(this.courseKh.spbl || 0) + parseFloat(this.courseKh.zybl || 0) + parseFloat(this.courseKh.lxbl || 0) + parseFloat(this.courseKh.csbl || 0);
               return  this.courseKh.kczf;
            }
        }
    });


    return khbz;
})