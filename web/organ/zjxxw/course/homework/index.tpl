<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>课程列表</title>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <link rel="stylesheet" href="/web/static/style/index/course/course.less">
</head>
<body>
<link rel="import" href="../../common/header.html?__inline"/>
<link rel="import" href="../../common/nav.html?__inline"/>
<div class="page" id="course">
    <input type="hidden" value="{{kcnrid}}" id="chapterId"/>

    <div class="sd-wrapper hw_content " style="min-height:300px">
        <h3 class="bread_tips"><a href="/course">课程</a> ><span>作业</span></h3>
        <div class="homew_wrap" v-cloak>
            <h3 class="title" style="height: 30px">
                <span class="col-xs-4" v-html="'<b>作业名称：</b>'+chapterName"></span>
                <span class="col-xs-4" v-html="'<b>所属课程：</b>'+zyXy.kcmc"></span>
                <span style="float: right">
                    <a style="color: blue" href="/course/detail/{{kcid}}#/courseMenu">返回课程</a>
                    </span>
            </h3>
            <ul class="hw_list">
                <li  v-for="(zy,index) in detailList">
                    <p>
                        <span class="fl fontwei6" v-html="'问题'+(index+1)+':'"></span>
                        <span class="fl break_word" v-html="zy.wt" ></span>
                        <i class="fix"></i>
                    </p>
                    <p class="mt20 mb10 fontwei6">回答：</p>
                    <textarea v-model="detailList[index].da" class="validator required"  title="答案" maxlength="2000" cols="30" rows="10"></textarea>
                </li>
                <li class="chapter_name row">
                    <div class="col-sm-2">
                        <select name="" id="" v-model="acceptTypeStr" class="fl select_wrap form-control">
                            <!--<option value="img">图片</option>-->
                            <!--<option value="video">视频</option>-->
                            <!--<option value="doc">文本</option>-->
                            <option v-for="soucename in sourceArr" :value="soucename.id" v-text="soucename.name"></option>
                        </select>
                    </div>
                    <div class="fl btn upload_source_btn" style="position:relative;overflow: hidden">上传资源</div>
                    <i class="fix"></i>
                </li>
                <li class="chapter_name" v-if="zyXy.wjmc">
                    <label class="">资源名称：</label>
                    <div id="zymc" v-text="zyXy.wjmc"></div>
                    <label class="">资源地址：</label>
                    <div id="zylj" v-text="zyXy.wjlj"></div>
                </li>
            </ul>
        </div>
        <div class="btn_wrap"  v-cloak>
            <a class="btn cancel_btn" href="/course/detail/{{kcid}}#/courseMenu">返回</a>
            <button class="btn confirm_btn" @click="submit(detailList)">提交</button>
        </div>
    </div>
    <input type="hidden" id="workid" value="{{zyXyid}}">
    <input type="hidden" id="kcid" value="{{kcid}}">
    <input type="hidden" id="kcnrid" value="{{kcnrid}}">
    <link rel="import" href="../../common/footer.html?__inline"/>
</div>
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/course/homework/index.js" id="entry"></script>
</html>