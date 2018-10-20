<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>课程列表</title>
    <link rel="stylesheet" href="/web/static/style/style.css">
    <link rel="stylesheet" href="/web/static/style/index/course/course.less">
    <link rel="stylesheet" href="/web/static/style/student/index.less">
    <link rel="stylesheet" href="/web/static/style/common/iconfont.css">
</head>
<body>
<link rel="import" href="/web/html/index/common/header.html?__inline"/>
<link rel="import" href="/web/html/index/index_wedge/nav.html?__inline"/>
<div class="page" id="app">
    <div class="sd-wrapper course page-content">
        <div class="menu-list-warp">
            <ul class="menu-list">
                <li class="fl" :class="!ind1active && 'active'" @click="loadCourseByCategory(1,null,1)">全部课程</li>
                <li v-if="categories.length > 0" v-for="(cat,ind) in categories"
                    :class="(ind==(ind1active-1)) && 'active'" class="fl" v-text="cat.name"
                    @click="loadCourseByCategory(1,cat,1,ind+1)"></li>
                <i class="fix"></i>
                <div class="fr search_wrap">
                    <input type="text" placeholder="请输入课程关键字" v-model="keyword" @keyup.enter="searchKeyword($event)">
                    <i class="iconfont" @click="searchKeyword">&#xe600;</i>
                </div>
            </ul>
            <ul class="menu-list hasmore" v-cloak v-if="hasmoremenu >= 2 && ind2menu.length > 0"
                :class="ind2fold && 'floder'">
                <li class="fl" :class="!ind2active && 'active'" @click="loadCourseByCategory(1,null,2)">全部</li>
                <li v-for="(cat,ind) in ind2menu" :class="(ind==(ind2active-1))
                 && 'active'" class="fl" v-text="cat.name"
                    @click="loadCourseByCategory(1,cat,2,ind+1)"></li>
                <span class="getmore" @click="showMore(2)" v-if="ind2fold">
                    <span>收起</span>
                    <i class="arrow toparrow"></i>
                </span>
                <span class="getmore" @click="showMore(2)" v-else>
                    <span>更多</span>
                    <i class="arrow"></i>
                </span>
                <i class="fix"></i>
            </ul>
            <ul class="menu-list hasmore" v-cloak v-if="hasmoremenu >= 3&& ind3menu.length > 0"
                :class="ind3fold && 'floder'">
                <li class="fl" :class="!ind3active && 'active'" @click="loadCourseByCategory(1,null,3)">全部</li>
                <li v-for="(cat,ind) in ind3menu" :class="(ind==(ind3active-1)) && 'active'" class="fl"
                    v-text="cat.name" @click="loadCourseByCategory(1,cat,3,ind+1)"></li>
                <span class="getmore" @click="showMore(3)" v-if="ind3fold">
                    <span>收起</span>
                    <i class="arrow toparrow"></i>
                </span>
                <span class="getmore" @click="showMore(3)" v-else>
                    <span>更多</span>
                    <i class="arrow"></i>
                </span>
                <i class="fix"></i>
            </ul>
            <ul class="menu-list hasmore" v-cloak v-if="hasmoremenu >= 4&& ind4menu.length > 0"
                :class="ind4fold && 'floder'">
                <li class="fl" :class="!ind4active && 'active'" @click="loadCourseByCategory(1,null,4)">全部</li>
                <li class="fl" v-for="(cat,ind) in ind4menu" :class="(ind==(ind4active-1)) && 'active'" class="fl"
                    v-text="cat.name" @click="loadCourseByCategory(1,cat,4,ind+1)"></li>
                <span class="getmore" @click="showMore(4)" v-if="ind4fold">
                    <span>收起</span>
                    <i class="arrow toparrow"></i>
                </span>
                <span class="getmore" @click="showMore(4)" v-else>
                    <span>更多</span>
                    <i class="arrow"></i>
                </span>
                <i class="fix"></i>
            </ul>
            <ul class="menu-list hasmore" v-cloak v-if="hasmoremenu >= 5&& ind5menu.length > 0"
                :class="ind5fold && 'floder'">
                <li class="fl" :class="!ind5active && 'active'" @click="loadCourseByCategory(1,null,5)">全部</li>
                <li class="fl" v-for="(cat,ind) in ind5menu" :class="(ind==(ind5active-1)) && 'active'" class="fl"
                    v-text="cat.name" @click="loadCourseByCategory(1,cat,5,ind+1)"></li>
                <span class="getmore" @click="showMore(5)" v-if="ind5fold">
                    <span>收起</span>
                    <i class="arrow toparrow"></i>
                </span>
                <span class="getmore" @click="showMore(5)" v-else>
                    <span>更多</span>
                    <i class="arrow"></i>
                </span>
                <i class="fix"></i>
            </ul>
            <ul class="menu-list hasmore" v-cloak v-if="hasmoremenu >= 6 && ind6menu.length>0"
                :class="ind6fold && 'floder'">
                <li class="fl" :class="!ind6active && 'active'" @click="loadCourseByCategory(1,null,6)">全部</li>
                <li class="fl" v-for="(cat,ind) in ind6menu" :class="(ind==(ind6active-1)) && 'active'" class="fl"
                    v-text="cat.name" @click="loadCourseByCategory(1,cat,6,ind+1)"></li>
                <span class="getmore" @click="showMore(6)" v-if="ind6fold">
                    <span>收起</span>
                    <i class="arrow toparrow"></i>
                </span>
                <span class="getmore" @click="showMore(6)" v-else>
                    <span>更多</span>
                    <i class="arrow"></i>
                </span>
                <i class="fix"></i>
            </ul>
        </div>
        <div class="course-search">
            <div class="course-r fl">
                <ul v-if="courses.length>0" v-cloak>
                    <li v-for="c in courses" v-if="c">
                        <a :href="getUrl(c)" :target="c.sourceType==1 ? '_blank':''" v-if="categoryNum!=2">
                            <img :src="c.imgUrl ? c.imgUrl : '/static/images/course_default.jpg'" :alt="c.name">
                            <h3 class="limittext" v-text="c.name"></h3>
                            <p>
                                <span v-text="'讲师：' + (c.teacherName ? c.teacherName : '')" class="limittext"></span>
                                <i class="fr" v-text="(c.studyNum||0) + '人学习'"></i>
                            </p>
                        </a>
                        <a :href="getUrl1(c)" :target="c.sourceType==1 ? '_blank':''" v-if="categoryNum==2">
                            <img :src="c.imgUrl ? c.imgUrl : '/static/images/course_default.jpg'" :alt="c.name">
                            <h3 class="limittext" v-text="c.name"></h3>
                            <p>
                                <span v-text="'讲师：' + (c.teacherName ? c.teacherName : '')" class="limittext"></span>
                                <i class="fr" v-text="(c.studyNum||0) + '人学习'"></i>
                            </p>
                        </a>
                    </li>
                </ul>
                <ul v-else>
                    <div class="nodata-warp">
                        <p>暂无数据</p>
                    </div>
                </ul>
            </div>
            <div class="pageinfo">
            </div>
            <i class="fix"></i>
        </div>

        <div class="fix"></div>
    </div>
    <link rel="import" href="/web/html/_layout_/footer.html?__inline"/>
</div>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/js/index/course/courselist.js" id="entry"></script>
</body>
</html>