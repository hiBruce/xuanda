/**
 * @Ttitle 首页
 */
define(function () {
    new Vue({
        el: "#app",
        delimiters: ['{%', '%}'],
        data: function () {
            return {
                jcCourseList:[],
                xlCourseList:[],
                fxlCourseList:[]
            };
        },
        methods: {
            getJcList(){
                Service.get('/jxxt/api/admin/course/category/4028829c46f4bf830146f4c1cefa0001/5',{"pageNo":1},(result)=>{
                    if(result.success){
                        this.jcCourseList = result.data;
                    }else{
                        this.jcCourseList = [];
                    }
                    setTimeout(setfootDet, 0);
                });
            },
            getXlList(){
                Service.get('/jxxt/api/admin/course/category/4028829c46f4bf830146f4c7db180002/5',{"pageNo":1},(result)=>{
                    if(result.success){
                        this.xlCourseList = result.data;
                    }else{
                        this.xlCourseList = [];
                    }
                    setTimeout(setfootDet, 0);
                });
            },
            getFxlList(){
                Service.get('/jxxt/api/admin/course/category/4028829c46f4bf830146f4c84dfc0003/5',{"pageNo":1},(result)=>{
                    if(result.success){
                        this.fxlCourseList = result.data;
                    }else{
                        this.fxlCourseList = [];
                    }
                    setTimeout(setfootDet, 0);
                });
            }
        },
        created: function () {
            this.getJcList();
            this.getXlList();
            this.getFxlList();
        },
        mounted: function () {
        }
    });
});