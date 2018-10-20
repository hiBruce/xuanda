<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <title>浙江学习网</title>
    <link rel="stylesheet" href="/web/static/style/index/index.less">
</head>
<body>
<link rel="import" href="../common/header.html?__inline"/>
<link rel="import" href="../common/nav.html?__inline"/>
<div class="page" id="app">
    <div class="back-white">
        <div class="sd-wrapper ">
            <ul>
                <li class="course_wrap">
                    <h3 class="title">
                        基础教育
                        <a href="/courselist?from=baseCourse" class="go_link fr">
                            查看更多 <i class="iconfont icon-you"></i>
                        </a>
                    </h3>
                    <ul class="course_list mt20">
                       <template  v-if="jcCourseList.length>0" v-cloak>
                           <li class="fl" v-for="list in jcCourseList">
                               <a :href="'/course/coverPage/'+list.id">
                                   <img class="couse_img" :src="list.imgUrl" alt="">
                                   <!--<p>{{{introduction}}}</p>-->
                                   <div class="content">
                                       <h4 class="course_title" v-text="list.name"></h4>
                                       <p class="name" v-text="'主讲：'+list.teacherName"></p>
                                   </div>
                               </a>
                           </li>
                       </template>
                        <i class="fix"></i>
                    </ul>
                </li>
                <li class="course_wrap">
                    <h3 class="title">
                        学历教育
                        <a href="/courselist?from=formal" class="go_link fr">
                            查看更多 <i class="iconfont icon-you"></i>
                        </a>
                    </h3>
                    <ul class="course_list mt20" >
                       <template v-if="xlCourseList.length>0" v-cloak>
                           <li class="fl" v-for="list in xlCourseList">
                               <a :href="'/course/coverPage/'+list.id">
                                   <img class="couse_img" :src="list.imgUrl" alt="">
                                   <!--<p>{{{introduction}}}</p>-->
                                   <div class="content">
                                       <h4 class="course_title" v-text="list.name"></h4>
                                       <p class="name" v-text="'主讲：'+list.teacherName"></p>
                                   </div>
                               </a>
                           </li>
                       </template>
                        <i class="fix"></i>
                    </ul>
                </li>
                <li class="course_wrap">
                    <h3 class="title">
                        非学历教育
                        <a href="/courselist?from=informal" class="go_link fr">
                            查看更多 <i class="iconfont icon-you"></i>
                        </a>
                    </h3>
                    <ul class="course_list mt20">
                        <template  v-if="fxlCourseList.length>0" v-cloak>
                            <li class="fl" v-for="list in fxlCourseList">
                                <a :href="'/course/coverPage/'+list.id">
                                    <img class="couse_img" :src="list.imgUrl" alt="">
                                    <!--<p>{{{introduction}}}</p>-->
                                    <div class="content">
                                        <h4 class="course_title" v-text="list.name"></h4>
                                        <p class="name" v-text="'主讲：'+list.teacherName"></p>
                                    </div>
                                </a>
                            </li>
                        </template>
                        <i class="fix"></i>
                    </ul>
                </li>
            </ul>

        </div>
    </div>

</div>
<link rel="import" href="../common/footer.html?__inline"/>
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/index/index.js" id="entry"></script>
</html>