<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>活动列表</title>
    <link rel="stylesheet" href="/web/static/style/style.css">
    <link rel="stylesheet" href="/web/static/style/index/activity/activity.less">
    <link rel="stylesheet" href="/web/static/style/student/index.less">
    <link rel="stylesheet" href="/web/static/style/common/iconfont.css">
</head>
<body>
<link rel="import" href="../common/header.html?__inline"/>
<link rel="import" href="../common/nav.html?__inline"/>
<div class="page" id="app">
    <div class="sd-wrapper activity page-content">
        <div class="activity-detail">
            <!-- 热门活动部分开始 -->
            <div class="contain">
                <div class="container_top">
                    <a href="/activitylist/"><span>活动</span></a>&nbsp;
                    <i class="iconfont">&#xe652;</i>
                    <a href="javascription:vio">活动详情</a>
                </div>
                <div class="content back-white padding20 act-detail-con">
                    <div class="content_left" v-cloak>
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <img :src="dataModel.pic1">
                                </div>
                                <div class="swiper-slide">
                                    <img :src="dataModel.pic2" class="active">
                                </div>
                                <div class="swiper-slide">
                                    <img :src="dataModel.pic3">
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                    <div class="content_right" v-cloak>
                        <span class="title" v-text="dataModel.title"></span>
                        <div class="right_activity ">
                            <i class="iconfont">&#xe61a;</i>
                            <span class="activity limittext" v-text="'活动通知：'+dataModel.notice"></span>
                        </div>
                        <sc :scparams="dataModel" scfl="2"></sc>
                        <!--管理员添加通知-->
                        <span class="addNotify" style="display: none;">添加通知</span>
                        <br>
                        <div class="time">
                            <span v-text="'活动地址：'+dataModel.address"></span><br>
                            <span>联系方式: {%dataModel.telephone%}</span><br>
                            <span>活动时间: {%dataModel.startDate  | date%}--{%dataModel.endDate  | date%}</span>
                        </div>
                        <ul>
                            <li class="li">访问量: <span class="marleft10">{%dataModel.clickCount%}</span></li>
                            <li class="li">创建时间：{% dataModel. createDate | date %}</li>
                            <li>发布者：{%dataModel.creatorName%}</li>
                        </ul>
                        <span href="javascript:void(0)" class="activityStatus join_btn"
                              v-if="dataModel.activeStatus==2 && attend.status==1" @click="cttend(dataModel.id,$event)">
                            我要参加</span>
                        <span href="javascript:void(0)" class="cancleStatus join_btn"
                              v-else-if="dataModel.activeStatus==2 && !attend.status"
                              @click="cttend(dataModel.id,$event)">
                            取消参加</span>
                    </div>
                    <i class="fix"></i>
                </div>
                <!-- 活动简介开始部分 -->
                <div class="detail-warp">
                    <div class="detail-left">
                        <span class="intro">活动详情</span>
                        <p v-text="dataModel.content" class="intro-text"></p>
                        <!-- 活动简介结束部分 -->
                        <div class="toppicture">
                            <span>活动图片</span>
                            <div class="upload_photo" v-if="attend.status ==0" v-cloak>
                            </div>
                        </div>
                        <div class="activity_photo" id="activity_photo">
                            <div class="slider">
                                <span class="prev no_click" id="prev"><i class="iconfont">&#xe823;</i></span>
                                <span class="next " id="next"><i class="iconfont">&#xe652;</i></span>
                                <div id="slider_pic">
                                    <ul>
                                        <li v-for="row in image_list"><img :src="row.url"/></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="discuss">

                            <div class="discuss_top" id="discuss_top">
                                <span>讨论区</span>
                                <template v-if="dataModel.activeStatus==2 && !attend.status">
                                    {{#showReview _user_ reviewCon}}
                                    <div class="userText">
                                    <textarea id="commentText" placeholder="请输入评论内容"
                                              v-lano-limit="{showNumId:'showLen',text:'tlcontent',maxLen:500}"
                                              v-model="tlcontent"></textarea>
                                        <p class="showTextlen"><i id="showLen">0</i>/500</p>
                                    </div>
                                    {{#if _user_ }}
                                    <a href="javascript:void(0)">
                                        <div class="submit" @click="submitContent($event)">评论</div>
                                    </a>
                                    {{else}}
                                    <a href="javascript:void(0)">
                                        <div class="submit" @click="unsContent($event)">评论</div>
                                    </a>
                                    {{/if}}
                                    {{/showReview}}
                                </template>
                            </div>

                            <ul class="discussion_list_wrap" v-cloak v-if="discuss_list.length>0">
                                <li class="discussion_list" v-for="row in discuss_list">
                                    <div class="discussion-text">
                                        <div class="avatar-circle-warp fl">
                                            <img :src="row.creatorPic || '/static/images/default_avator.png'"
                                                 class="avatar-circle" :data-user="row.creatorId">
                                        </div>
                                        <div class="author">
                                            <span class="baba" v-text="row.creatorName"></span>
                                            <span class="time">{%row.createDate | date%}</span>
                                            <p class="discuss-text" v-text="row.content"></p>
                                            <!--<div class="cont">-->
                                            <!--&lt;!&ndash;<i class="iconfont">&#xe6e0;</i>&ndash;&gt;-->
                                            <!--&lt;!&ndash;<span class="send" @click="reply(row.id,row.creatorName,row.content,$event)">回复</span>&ndash;&gt;-->
                                            <!--&lt;!&ndash;<span class="send" @click="deleteComment(row.id)">删除评论</span>&ndash;&gt;-->
                                            <!--</div>-->
                                        </div>
                                        <i class="fix"></i>
                                    </div>
                                    <i class="fix"></i>
                                </li>
                            </ul>
                            <ul v-else>
                                <div class="nodata-warp">
                                    <p>暂无数据</p>
                                </div>
                            </ul>
                        </div>
                        <!-- 讨论区部分结束 -->
                        <div class="loader" v-if="pageTotal>pageNo" @click="getMoreComment">
                            <i class="iconfont">&#xe6d9;</i>
                            <span>加载更多</span>
                        </div>
                    </div>
                    <div class="detail-right">
                        <p class="title">热门活动</p>
                        <ul class="hot-activity-list" v-if="activity.length>0" v-cloak>
                            <li v-for="activ in activity">
                                <div class="fl">
                                    <img :src="activ.titlePic" :alt="activ.description">
                                </div>
                                <div class="fr">
                                    <a :href="'/activitydetail/'+ activ.id">
                                        <h6 v-text="activ.title" class="limittext"></h6>
                                        <p class="normal-p">

                                            <span class="mr10 col-blue">访问量:<span class="marleft10"
                                                                                  v-text="activ.clickCount"></span></span>
                                            <span class=""
                                                  v-text="(activ.memberCount>0 ? activ.memberCount :0)+'人参加'"></span>
                                        </p>
                                    </a>
                                </div>
                                <i class="fix"></i>
                            </li>
                        </ul>
                        <ul v-else>
                            <div class="nodata-warp">
                                <p>暂无数据</p>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="import" href="../common/footer.html?__inline"/>
</div>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/js/index/activity/activitydetail.js" id="entry"></script>
</body>
</html>