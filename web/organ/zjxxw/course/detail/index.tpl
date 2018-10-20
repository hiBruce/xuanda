<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>课程详情</title>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <link rel="stylesheet" href="/web/static/style/index/course/course.less">
    <link rel="stylesheet" href="/web/static/style/teacher/edit_course.less">
    <link href="/static/lib/js/cropperjs/dist/cropper.min.css" rel="stylesheet">
</head>
<body>
<link rel="import" href="../../common/header.html?__inline"/>
<link rel="import" href="../../common/nav.html?__inline"/>
<div class="page" id="app">
    <div class="sd-wrapper course page-content">
        <div class="nav-left fl edit_course_menu">
            <div class="menu_header e-box">
                <img :src="course.imgUrl" alt="">
                <p v-text="course.name"></p>
            </div>
            <div class="menu_content_wrap e-box">
                <a href="/ucenter/my_course" class="back">
                    <i class="iconfont">&#xea7a;</i>我的课程
                </a>
                <ul class="menu_content">
                    <li class="menu_li">
                        <h3 :class="($route.path=='/progress') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe71f;</i>
                            <span>
									<router-link :to="{name:'progress'}">学习进度</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/notice') ? 'active':''">
                            <i class="iconfont">&#xe6be;</i>
                            <span>
									<i>
										<router-link :to="{name:'notice'}">课程公告</router-link>
									</i>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/baseinfo') ? 'active':''">
                            <i class="iconfont">&#xe63f;</i>
                            <span>
                                    <i>
                                        <router-link :to="{name:'baseinfo'}">课程信息</router-link>
                                    </i>
                                </span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/courseMenu') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe64f;</i>
                            <span>
									<router-link :to="{name:'courseMenu'}">章节目录</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/quesetion') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe683;</i>
                            <span>
									<router-link :to="{name:'quesetion'}">答疑</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">

                        <h3 :class="getHasRoute('homework') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe649;</i>
                            <span>
									<router-link :to="{name:'homework'}">作业</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/exam') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe681;</i>
                            <span>
									<router-link :to="{name:'exam'}">测试</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/exercise') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe681;</i>
                            <span>
									<router-link :to="{name:'exercise'}">练习</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">

                        <h3 :class="($route.path=='/notes') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe651;</i>
                            <span>
									<router-link :to="{name:'notes'}">笔记</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/learnFromCourse') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe625;</i>
                            <span>
									<router-link :to="{name:'learnFromCourse'}">学习体会</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/bjtl') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe683;</i>
                            <span>
                                    <router-link :to="{name:'bjtl'}">班级讨论</router-link>
                                </span>
                        </h3>
                    </li>
                    <li class="menu_li">
                        <h3 :class="($route.path=='/courseData') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe63a;</i>
                            <span>

									<router-link :to="{name:'courseData'}">拓展资料</router-link>
								</span>
                        </h3>
                    </li>
                    <li class="menu_li">

                        <h3 :class="($route.path=='/kcpj') ? 'active':''">
                            <i class="iconfont fl mr20">&#xe646;</i>
                            <span>

									<router-link :to="{name:'kcpj'}">课程评价</router-link>
								</span>
                        </h3>
                    </li>
                    <template v-if="addMenuArr.length>0" v-cloak>
                        <li class="menu_li" v-for="(menu,ind) in  addMenuArr">
                            <h3 :class="($route.path==('/menu'+ind)) ? 'active':''">
                                <i class="iconfont fl mr20">&#xe64c;</i>
                                <span>
                          		      <router-link
                                              :to="{path:'menu'+ind,query:{newMenu:JSON.stringify(addMenuArr)}}">{%menu.xxmc%}</router-link>
                            		</span>
                            </h3>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="nav-right course-detail fr">
            <router-view></router-view>
        </div>
        <i class="fix"></i>
    </div>
    <input type="hidden" id="courseId" value="{{courseId}}">
    <input type="hidden" id="isJs" value="{{isJs}}">
    <input type="hidden" id="reviewCon" value="{{reviewCon}}">
    <link rel="import" href="../../common/footer.html?__inline"/>
</div>
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/course/detail/index.js" id="entry"></script>
<script src="/static/lib/js/ckeditor/ckeditor.js"></script>
</html>