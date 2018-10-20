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
<link rel="import" href="/web/html/index/common/header.html?__inline"/>
<link rel="import" href="/web/html/index/index_wedge/nav.html?__inline"/>
<div class="page" id="app">
    <div class="sd-wrapper activity page-content">
        <div class="activity-list">
            <!-- 中间图片部分开始 -->
            <ul class="hot">
                <li v-for="(row,ind) in acitvity_topn" v-if="ind<6" v-cloak>
                    <a :href="getUrl(row)" :target="row.type==1 ? '_blank':''">
                        <div class="pic">
                            <img :src="row.titlePic" :alt="row.description" @click="clickC(row.id)">
                        </div>
                        <div class="title limittext" v-text="row.title"></div>
                    </a>
                </li>
            </ul>
            <!-- 中间图片部分结束 -->

            <!-- 列表部分开始 -->
            <div class="act-search">
                <div class="left e-box">
                    <div class="topall">
                        <ul class="">
                            <li><a class="active" href="javascript:void(0)" @click="lineActivity(0,$event)">全部活动</a>
                            </li>
                            <li><a href="javascript:void(0)" @click="lineActivity(2,$event)">线上活动</a></li>
                            <li><a href="javascript:void(0)" @click="lineActivity(1,$event)">线下活动</a></li>
                        </ul>
                        <input type="text" placeholder="请输入活动关键字" @keyup="searchKeyword($event)">
                        <!--<a href="javascript:void(0)" @click="searchKeyword()"><i class="iconfont">&#xe600;</i></a>-->
                    </div>
                    <div class="cat">
                        <label>类型:</label>
                        <ul class="check_ul">
                            <li class="type_list">
                                <a href="javascript:void(0)" @click="allType" class="active">全部</a>
                            </li>
                            <li v-for="row in type_list" class="type_list">
                                <a href="javascript:void(0)" @click="typeActivity(row.id,$event)" :id=" row.id"
                                   v-text="row.name"></a>
                            </li>
                        </ul>
                    </div>
                    <div class="cat">
                        <label>状态:</label>
                        <ul class="cat_status check_ul">
                            <li><a class="" href="javascript:void(0)" :class="{active:!this.searchOptions.status}"
                                   @click="statusActivity(null)">全部</a></li>
                            <li><a href="javascript:void(0)" name="未开始" :class="{active:this.searchOptions.status==1}"
                                   @click="statusActivity(1)">未开始</a></li>
                            <li><a href="javascript:void(0)" name="进行中" :class="{active:this.searchOptions.status==2}"
                                   @click="statusActivity(2)">进行中</a></li>
                            <li><a href="javascript:void(0)" name="已结束" :class="{active:this.searchOptions.status==3}"
                                   @click="statusActivity(3)">已结束</a></li>
                        </ul>
                    </div>
                    <div class="cat">
                        <label>时间:</label>
                        <ul class="time check_ul">
                            <li><a href="javascript:void(0)" id="latestRelease"
                                   @click="clickLatest($event)">最新发布</a>
                            </li>
                        </ul>
                    </div>
                    <!-- 活动搜索列表 -->
                    <ul class="list" id="act_search" v-if="activity_search.length>0" v-cloak>
                        <li v-for="(row,ind) in activity_search">
                            <a href="javascript:void(0)" :target="row.type==1 ? '_blank':''" class="fl img-warp"
                               @click="clickC(row.id,getUrl(row))"><img
                                    :src="row.titlePic" :alt="row.description"></a>
                            <div class="act_searchlist">
                                <h3>
                                    <a :href="getUrl(row)" :target="row.type==1 ? '_blank':''" v-text="row.title"></a>
                                </h3>
                                <div class="status" href="javascript:void(0)">
                                    <span v-if="row.activeStatus == 1">未开始</span>
                                    <span v-if="row.activeStatus == 2">进行中</span>
                                    <span v-if="row.activeStatus == 3">已结束</span>
                                </div>
                                <span class="content">活动时间:{%row.startDate | date %} 一 {%row.endDate | date %}</span>
                                <span class="content" v-text="'活动地址:'+row.address"></span>
                                <span class="content" v-text="'主办方：'+row.sponsor"></span>
                                <span class="ct" :id="row.id"
                                      v-text="(row.memberCount>0 ?row.memberCount:'0')+'人参加'"></span>
                                <span href="javascript:void(0)" class="activityStatus join" @click="cttending(row,ind)"
                                      v-if="!row.isJoin && row.activeStatus == 2">
                                   我要参加
                                </span>
                                <span href="javascript:void(0)" class="cancleStatus join" @click="cttended(row,ind)"
                                      v-else-if="row.isJoin &&row.activeStatus ==2">
                                   取消参加
                                </span>
                            </div>
                        </li>
                    </ul>
                    <ul v-else>
                        <div class="nodata-warp">
                            <p>暂无数据</p>
                        </div>
                    </ul>
                    <!-- 分页 -->
                    <div class="page-warp"></div>
                </div>
                <div class="right fr e-box">
                    <h3>活动排行</h3>
                    <ul v-cloak v-if="activity_ranking.length>0">
                        <li v-for="(row,$index) in activity_ranking">
                            <span class="fl">
                                <i class="ball" :class="($index<3) && 'ball-'+($index+1)" v-text="$index + 1"></i>
                            </span>
                            <a class="fl img-warp" href="javascript:void(0)" :target="row.type==1 ? '_blank':''"
                               @click="clickC(row.id,getUrl(row))" style="height: 104px;">
                                <img :src=" row.titlePic" :alt="row.description">
                            </a>
                            <div class="dp-ib fl content">
                                <h4 class="limittext" v-text="row.title"></h4>
                                <div class="bt">
                                    <span class="ct">访问量 {%row.clickCount%}</span>
                                    <span class="ac">{% row.memberCount>0 ? row.memberCount : '0'%}人参加</span>
                                </div>
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
            <!-- 列表部分结束 -->
        </div>
    </div>
    <link rel="import" href="/web/html/_layout_/footer.html?__inline"/>
</div>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/js/index/activity/activitylist.js" id="entry"></script>
</body>
</html>