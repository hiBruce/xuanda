<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>作业详情</title>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <link rel="stylesheet" href="/web/static/style/index/course/course.less">
    <style>
        .hw_comment_text *{
            line-height:2;
        }
    </style>
</head>
<body>
<link rel="import" href="../../common/header.html?__inline"/>
<link rel="import" href="../../common/nav.html?__inline"/>
<div class="page mt20">

    <input type="hidden" value="{{kcnrid}}" id="chapterId"/>

    <div class="sd-wrapper hw_content ">
        <div class=" homew_wrap  e-box" style="min-height:300px;">
            <div class="nav-right-content" v-cloak>
                <p class="bread_tips">我的作业
                    <i class="iconfont">&#xe652;</i>
                    <span>作业详情</span>
                    <span style="float: right">
                        <a href="/course/detail/{{kcid}}#/courseMenu" class="edit_btn_sty">返回课程</a>
                    </span>
                </p>
                <div class="hw-title row">
                    <span class="col-xs-4" v-html="'<b>作业名称：</b>'+chapterName"></span>
                    <span class="col-xs-4" v-html="'<b>所属课程：</b>'+zyXy.kcmc"></span>
                    <span class="col-xs-4" v-html="'<b>提交日期：</b>'+getTime(zyXy.tjsj)">
                    </span>
                </div>
                <div v-for="(da,index) in detailList">
                    <p class="ask mt20">
                        <span class="tips fl mr20 fontwei6" v-text="'问题'+(index+1)+':'"></span>
                        <span class="text fl" v-html="da.wt"></span>
                        <i class="fix"></i>
                    </p>
                    <p class="answer mt20">
                        <span class="tips fl mr20 fontwei6">回答:</span>
                        <span class="text fl" v-html="da.da"></span>
                        <i class="fix"></i>
                    </p>
                     <div class="fix"></div>
                    <div class="line">
                    </div>
                </div>
                <div class="chapter_name" v-if="zyXy.wjlj">
                    <label class="">资源地址：</label>
                    <a style="color: blue" target="_blank" :href="zyXy.wjlj" v-text="zyXy.wjmc"></a>
                </div>
                <div class="hw-title hw_comment">
                    <b>老师点评:</b>
                </div>
                <div class="hw-name mt10 hw_comment_text " id="jspj">
                </div>
            </div>
        </div>
        <div class="fix h50"></div>
        <input type="hidden" id="workid" value="{{zyXyid}}">
    </div>
    <link rel="import" href="../../common/footer.html?__inline"/>
</div>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/course/homework/homework_detail.js" id="entry"></script>
</body>
</html>