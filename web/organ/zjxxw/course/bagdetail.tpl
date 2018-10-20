<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>课程包详情</title>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <link rel="stylesheet" href="/web/static/style/index/course/course.less">
</head>
<body>
<link rel="import" href="../common/header.html?__inline"/>
<link rel="import" href="../common/nav.html?__inline"/>
<div class="page">
    <div class="sd-wrapper course page-content">
        <div class="course-detail">
            <h3><a href="/course">课程包</a> <span>课程详情包</span></h3>
            <div id="coursedetails" class="course-base-info e-box">
                <template>
                    <img class="fl" :src="course.imgUrl"/>
                </template>

                <div class="fl" v-cloak>
                    <h4 v-text="course.name"></h4>
                    <p>
                        <span v-text="course.studyNum + '人正在学习'"><i class="iconfont">&#xe641;</i></span>
                    </p>
                    <label>课程包视频总时长：</label><span v-text="kcbDuration"/></span>
                    <div v-text="'共' + courseCount + '个课程'"></div>

                    <!--<p class="progresser"-->
                    <!--v-text="'上次学习：' + (learningStatus.xxzks ? learningStatus.xxzks.name : '暂未学习本课程包' )"></p>-->
                    <!--<template v-if="loginStatus">-->
                    <!--<a :href="'/course/detail/' + course.id" class="popLogin fl" v-if="learningStatus"-->
                    <!--v-cloak>进入课程</a>-->
                    <!--<a :href="'/course/detail/' + course.id" class="popLogin fl" v-else-if="course.type==1" v-cloak>加入课程</a>-->
                    <!--<div class="sc-detail">-->
                    <!--<sc :scparams="course" scfl="1"></sc>-->
                    <!--</div>-->
                    <!--</template>-->
                    <template v-if="learningStatus">
                        <div class="popLogin fl" @click="goStudy('/course/detail/' + learningStatus.cxxzks)">进入学习</div>
                    </template>
                    <template v-else-if="course.type == 1 && !learningStatus">
                        <button class="popLogin fl" @click="joinKcb()">加入课程包</button>
                    </template>
                </div>
            </div>
        </div>
        <div class="main course_detail_content">
            <div class="bag_main main-l">
                <div class="part intro">
                    <h3>
                        <i class="bread"></i>课程包介绍
                    </h3>
                    <div class="text" v-html="course.introduction">
                    </div>
                </div>
                <div class="part info">
                    <h3>
                        <i class="bread"></i>课程列表
                    </h3>
                    <ul class="bag_list" v-if="rows_course.length>0">
                        <li v-for="row in rows_course">
                            <a :href="learningStatus ? '/course/detail/' + row.kcId : 'javascript:void(0)'">
                                <img :src="row.imgUrl" alt="" class="fl course_img mr10">
                                <div class="right_content">
                                    <h4 v-text="row.kcmc"></h4>
                                    <p class="tips mt10">讲师：<span v-text="row.teacherName"></span></p>
                                    <p class="intro mt20 limittext2" v-filter-html="row.profile">
                                    </p>
                                </div>
                                <i class="fix"></i>
                            </a>
                        </li>
                    </ul>
                    <ul v-else>
                        <li>
                            <div class="nodata-warp">
                                <p>暂无数据</p>
                            </div>
                        </li>
                    </ul>
                    <div class="course_package_page"></div>
                </div>
            </div>
            <div class="fix"></div>
        </div>
    </div>
    <div class="fix h50"></div>
</div>
<link rel="import" href="../common/footer.html?__inline"/>
</div>
</body>

<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/course/bagdetail.js" id="entry"></script>
<script src="/static/lib/js/ckeditor/ckeditor.js"></script>
</html>