<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>课程详情</title>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <link rel="stylesheet" href="/web/static/style/index/course/course.less">
</head>
<body>
<link rel="import" href="../common/header.html?__inline"/>
<link rel="import" href="../common/nav.html?__inline"/>
<div class="page">
    <div class="sd-wrapper course page-content">
        <div class="course-detail">
            <h3><a href="/course">课程</a> ><span>课程详情</span></h3>
            <div id="coursedetails" class="course-base-info e-box">
                <template v-if="course.coverVideoUrl">
                    <video  autoplay="true" loop="true" :src="course.coverVideoUrl" class="fl"></video>
                </template>
                 <template v-else>
                  <img class="fl" :src="course.imgUrl"/>
                 </template>

                <div class="fl" v-cloak>
                    <h4 v-text="course.name"></h4>
                    <label>课程视频总时长：</label><span v-text="courseDuration"/></span>
                    <p v-if="course.teacherName">
                        <em class="fl" v-text="'讲师：'+ course.teacherName"></em>
                        <span class="fr" v-text="course.studyNum + '人正在学习'"><i class="iconfont">&#xe641;</i></span>
                    </p>
                    <div class="star">
                        <div></div>
                    </div>
                    <h5 v-text="'共计：' + (course.courseHours == undefined ? '0' : course.courseHours + '课时')"></h5>
                    <!--<div class="range">-->
                        <!--<div>-->
                            <!--<div :style="'width:' + (!learningStatus.learningProgress  ? 0 : learningStatus.learningProgress)+'%'"></div>-->
                        <!--</div>-->
                        <!--<span v-text="(!learningStatus.learningProgress  ? 0 : learningStatus.learningProgress)+'%'"></span>-->
                    <!--</div>-->
                    <!--<p class="progresser" v-if="learningStatus"-->
                       <!--v-text="'上次学习：' + (learningStatus.xxzks ? learningStatus.xxzks.contentName : '暂未学习本课程' )"></p>-->
                       <template v-if="loginStatus">
                            <div @click="goStudy('/course/detail/' + course.id)" class="popLogin fl" v-if="learningStatus" v-cloak>进入课程</div>
                            <div @click="joinCourse('/course/detail/' + course.id)" class="popLogin fl" v-else-if="course.type==1" v-cloak>加入课程</div>
                            <div class="sc-detail">
                                <sc :scparams="course" scfl="1"></sc>
                            </div>
                       </template>
                       <template v-else>
                           <button class="popLogin fl" @click="goLogin">加入课程</button>
                       </template>
                    </div>
                </div>
            </div>
            <div class="main course_detail_content">
                <div class="main-l fl">
                    <div class="part intro">
                        <h3>
                          <i class="bread"></i>课程简介
                         </h3>
                         <div class="text" v-html="course.profile">
                         </div>
                        <i class="fix"></i>
                    </div>
                    <div class="part info">
                        <h3>
                          <i class="bread"></i>课程概述
                         </h3>
                          <div class="text" v-html="course.introduction">
                         </div>
                        <i class="fix"></i>
                    </div>
                    <ul id="data_course"  style="padding-bottom:20px;">
                        <li class="main-tabs catalog" id="data_course_outline_page" >
                            <link rel="import" href="./course_outline.tpl?__inline"/>
                        </li>
                        
                    </ul>               
                     </div>
                <div class="main-r fr">
                     <div class="cat e-box">
                        <label>教师介绍</label>
                        
                        <ul v-if="course.kcZjjsList && course.kcZjjsList.length>0" v-cloak>
                            <li v-for="row in course.kcZjjsList" style="display:block">
                                <div class="top">
                                    <img :src=" row.jstx ? row .jstx : '/static/images/default_avator.png'" class="fl">
                                    <div class="fl">
                                            <h3> <span v-text= "row.jsmc"></span> <span v-text="row.zc"></span></h3>
                                        <p v-text="row.dw"></p>
                                    </div>
                                    <i class="fix"></i>
                                </div>
                                <div class="text mt10" v-html="row.js"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="fix"></div>
            </div>
        </div>
        <div class="fix h50"></div>
    </div>
    <link rel="import" href="../common/footer.html?__inline"/>
    <addnote v-if="addNote" :course="course" :outline="courseChapters" :closecb="closeNotes" :cb="addNoteCb"></addnote>
</div>
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/course/coverPage.js" id="entry"></script>
<script src="/static/lib/js/ckeditor/ckeditor.js"></script>
</html>