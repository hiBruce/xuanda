<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>圈子列表</title>
    <link rel="stylesheet" href="/web/static/style/style.css">
    <link rel="stylesheet" href="/web/static/style/index/group/circleDetails.less">
    <link rel="stylesheet" href="/web/static/style/student/index.less">
    <link rel="stylesheet" href="/web/static/style/common/iconfont.css">
</head>
<body>
<link rel="import" href="../common/header.html?__inline"/>
<link rel="import" href="../common/nav.html?__inline"/>
<div class="page" id="app">
    <div class="sd-wrapper circledetalis-wrap group-detail-warp">
        <h3 class="bread-tips">
            <a href="/grouplist">圈子</a> &gt;
            <span class="col-orange">圈子详情</span>
        </h3>
        <div id="circledetalis" class="fix circledetalis">
            <img class="fl" :src="groupData.pictureUrl"/>
            <div class="fl" v-cloak>
                <p class="col-orange note"><i class="iconfont">&#xe61a;</i></p>
                <h4 class="title" v-text="groupData.name"></h4>
                <p class="info">创建时间:{% groupData.createDate|date%}</p>
                <p class="info">
                    <span class="fl"><i class="justify">圈主</i>  : <i v-text="groupData.creatorName"></i></span>
                    <span class="fl right-part"><i class="justify">人数</i> : <i
                            v-text="groupData.memberCount"></i></span>
                </p>
                <button class="fr join-btn" v-if="!groupData.isJoin" @click="join($event)" type="1">加入</button>
                <button class="fr join-btn" v-else @click="join($event)" type="2">退出</button>
                <p class="info">
                    <i class="fl">圈子介绍 :</i>
                    <span class="limittext fl" style="width:780px;display:block" v-text="groupData.synopsis"
                          :title="groupData.synopsis"></span></p>
                <div class="info tips">
                    <i class="justify fl">标 签 ：</i>
                    <div class="fl" style="width:770px;">
                        <i class="mb10 type-text" v-for="items in groupData.type" v-text="items"></i>
                    </div>
                    <i class="fix"></i>
                </div>
                <sc :scparams="groupData" scfl="3"></sc>
            </div>
        </div>
        <div class="main clearfix">
            <div class="main-l fl e-box">
                <ul class="main-l-list">
                    <li><span :class="{'active':!listInd}" @click='cut($event,0)'>首页</span></li>
                    <li><span :class="{'active':listInd==1}" @click='cut($event,1)'>成员</span></li>
                    <li><span :class="{'active':listInd==2}" @click='cut($event,2)'>精华</span></li>
                </ul>
                <div class="main-tab tabone tab-tips" :class="{hide: listInd}">
                    <span class="discuss_title">讨论区</span>
                    {{#showReview _user_ reviewCon}}
                    <textarea placeholder="请输入评论内容" id="remarks"
                              v-lano-limit="{text:'',maxLen:500}"
                    ></textarea>
                    <div class="tab">
                        <!--<ul class="fl">-->
                        <!--<li><a href="javascript:(0)" @click="animatend(0)"><i class="iconfont">&#xe608;</i>表情</a>-->
                        <!--</li>-->
                        <!--<li><a class="active" href="javascript:(0)" @click="animatend(1)"><i class="iconfont">&#xe653;</i>图片</a>-->
                        <!--</li>-->
                        <!--<li><a href="javascript:(0)" @click="animatend(2)"><i class="iconfont">&#xe62a;</i>视频</a>-->
                        <!--</li>-->
                        <!--<li><a href="javascript:(0)" @click="animatend(3)"><i class="iconfont">&#xe67d;</i>文章</a>-->
                        <!--</li>-->
                        <!--</ul>-->
                        <button class="fr" @click="publish">发表</button>
                    </div>
                    {{/showReview}}
                    <!--<div class="teb-content commit_img" v-if="fal==1"  v-cloak>-->
                    <!--<input id="uploadImg" type="file" style="display: block;width: 0px;height: 0px;">-->
                    <!--<a href="javascript:(0)" class="iconfont" @click="upImg">&#xe6d9;</a>-->
                    <!--<img v-for="el in circleImg" :src="el">-->
                    <!--</div>-->
                    <!--<div class="teb-content" v-else-if="fal==2"  v-cloak>-->
                    <!--<input id="uploadVideo" type="file" style="display: block;width: 0px;height: 0px;">-->
                    <!--<a href="javascript:(0)" href="#" @click="upVideo">上传视频</a>-->
                    <!--<span>上传格式为flv、wmv、avi、rmvb、rm、mp4等</span>-->
                    <!--</div>-->

                    <ul class="invitation" v-cloak v-if="circleTopics.length>0">
                        <li v-for="(items,i) in circleTopics" class="topic-li">
                            <div class="avatar-circle-warp">
                                <img :src="items.portrait || '/static/images/default_avator.png'" alt=""
                                     class="avatar-circle" :data-user="items.memberId"/>
                            </div>

                            <div class="fr">
                                <h4>{%items.memberName%} <span>{%items.createDate|date%}</span></h4>
                                <p v-text="items.remarks"></p>
                                <ul class="gtal">
                                    <li v-for="el in items.gtal">
                                        <video v-if="items.type==3" :src="el.accessoryUrl" :autoplay="autoplay"
                                               :controls="controls"></video>
                                        <img v-if="items.type==2" :src="el.accessoryUrl">
                                    </li>
                                </ul>
                                <div class="count">
                                    <p class="tips">
                                        <i class="iconfont" @click='comment($event,i,items.id)'
                                           v-text="'评论('+items.commentCount+')'"></i>
                                        <i class="iconfont col-red" v-if="items.userIsLike"
                                           v-text="'已赞('+items.likeCount+')'"></i>
                                        <i class="iconfont" v-else="!items.userIsLike"
                                           @click="upvote($event,items.id,i)" v-text="'点赞('+items.likeCount+')'"></i>
                                    </p>
                                    <div class="comment-div">
                                        {{#showReview _user_ reviewCon}}
                                        <div>
                                            <textarea class="comment-text content_text"></textarea>
                                            <button class="fr" @click="commentPublish($event,i,items.groupId,items.id)">
                                                评论
                                            </button>
                                            <i class="fix"></i>
                                        </div>
                                        {{/showReview}}
                                        <ul class="comment-warp" v-if="commentArr[i]">
                                            <li class="comment-show" v-for="(item,ind) in commentArr[i]['data']"
                                                v-if='item'>
                                                <div class="avatar-circle-warp fl">
                                                    <img class="avatar-circle"
                                                         :src="item.portrait ||'/static/images/default_avator.png'"
                                                         alt="" :data-user="item.userId">
                                                </div>
                                                <div class="fl comment-text">
                                                    <p>
                                                        <span v-text="item.userName"></span>
                                                        <span>{%item.createDate | date %}</span>
                                                    </p>
                                                    <p v-text="item.content"></p>
                                                </div>
                                                <i class="fix"></i>
                                            </li>
                                        </ul>
                                        <p class="getmore mt10 " style="text-align: center"
                                           v-if="commentArr[i] && commentArr[i]['moreCon']"
                                           @click="getMoreComment($event,items.id,commentArr[i]['pageNo'],i)">
                                            <i class="edit_btn_sty" style="cursor:pointer">查看更多</i></p>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <ul v-else>
                        <div class="nodata-warp-little nodata-warp">
                            <p>暂无评论</p>
                        </div>
                    </ul>
                    <div class="pagewarp" id="pagewarp"></div>
                </div>
                <div class="main-tab tabtwo" :class="{hide: listInd!=1}" v-cloak>
                    <div class="a">
                        <h2>圈主</h2>
                        <div>
                            <div class="avatar-circle-warp">
                                <img class="avatar-circle" :data-user="groupData.creatorId"
                                     :src="(groupData.user&&groupData.user.avator) ? groupData.user.avator :'/static/images/default_avator.png'"
                                     alt="">
                            </div>
                            <span class="fr" v-text="memberList.length+'名圈子成员'"></span>
                            <i class="fix"></i>
                        </div>
                    </div>
                    <div class="a">
                        <h2>成员</h2>
                        <ul>
                            <li v-if="memberList.length>0" v-for="(items,ind) in memberList"
                                v-if="(items.id != groupData.creatorId) && ind<10">

                                <div class="avatar-circle-warp">
                                    <img :src="items.avator  ||'/static/images/default_avator.png'"
                                         :data-user="items.id" class="avatar-circle">
                                    <i v-text="items.name"></i>
                                </div>

                            </li>
                            <li v-if="memberList.length<=0" class="nouser">
                                <img src="/web/static/images/nouser.png?__inline">
                                <p>圈成员为空</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="main-tab tab-tips tabthree" :class="{hide: listInd!=2}" v-cloak>
                    <ul class="invitation" v-if="hotCardList.length>0">
                        <li v-for="(items,i) in hotCardList">
                            <img :src="items.portrait" alt="">
                            <div class="fr">
                                <h4>{%items.memberName%} <span>{%items.createDate|date%}</span></h4>
                                <p v-text="items.remarks"></p>
                                <ul class="gtal">
                                    <li v-for="el in items.gtal">
                                        <video v-if="items.type==3" :src="el.accessoryUrl" :autoplay="autoplay"
                                               :controls="controls"></video>
                                        <img v-if="items.type==2" :src='el.accessoryUrl'>
                                    </li>
                                </ul>
                                <div class="count">
                                    <p class="tips">
                                        <i class="iconfont" @click='comment($event,i,items.id,1)'
                                           v-text="'评论('+items.commentCount+')'"></i>
                                        <i class="iconfont col-red" v-if="items.userIsLike"
                                           v-text="'已赞('+items.likeCount+')'"></i>
                                        <i class="iconfont" v-if="!items.userIsLike"
                                           @click="upvote($event,items.id,i,1)" :text="'点赞('+items.likeCount+')'"></i>
                                    </p>
                                    <div class="comment-div">
                                        {{#showReview _user_ reviewCon}}
                                        <textarea class="comment-text "></textarea>
                                        <button class="fr" @click="commentPublish($event,i,items.groupId,items.id,1)">
                                            评论
                                        </button>
                                        {{/showReview}}
                                        <ul class="comment-warp" v-if="commentArrHot.length>0" v-cloak>
                                            <li class="comment-show" v-for="(item,ind) in commentArrHot[i]['data']">
                                                <div class="avatar-circle-warp">
                                                    <img class="avatar-circle" :data-user="item.id"
                                                         :src="item.portrait  ||'/static/images/default_avator.png'"
                                                         alt="">
                                                </div>
                                                <p>
                                                    <span v-text="item.userName"></span>
                                                    <span>{%item.createDate | date %}</span>
                                                </p>
                                                <p v-text="item.content"></p>
                                            </li>
                                        </ul>
                                        <p class="getmore" v-if="commentArrHot[i] && commentArrHot[i]['moreCon']"
                                           style="text-align: center"
                                           @click="getMoreComment($event,items.id,commentArr[i]['pageNo'],i,1)">
                                            <i class="edit_btn_sty" style="cursor:pointer">查看更多</i></p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul v-else>
                        <div class="nodata-warp-little nodata-warp">
                            <p>暂无数据</p>
                        </div>
                    </ul>
                    <div class="hot-group-page"></div>
                </div>
            </div>
            <div class="main-r fr">
                <div class="cat e-box">
                    <label>最近访客</label>
                    <ul v-if="latestGuests.length>0" v-cloak class="user-list">
                        <li v-for="items in latestGuests" class="fl">
                            <div class="avatar-circle-warp">
                                <img :src="items.avator  ||'/static/images/default_avator.png'" class="avatar-circle"
                                     :data-user="items.id">
                                <span v-text="items.name"></span>
                            </div>
                        </li>
                        <i class="fix"></i>
                    </ul>
                    <ul v-else>
                        <div class="nodata-warp-little nodata-warp">
                            <p>暂无最新访客</p>
                        </div>
                    </ul>
                </div>
                <div class="cat e-box">
                    <label>活跃成员
                        <!--<a class="fr" href="javascript:(0)" @click='cut($event,1)'>全部成员>></a>-->
                    </label>
                    <ul v-if="activityMember.length>0" v-cloak class="user-list">
                        <li v-for="items in activityMember" v-if="items" class="fl">
                            <div class="avatar-circle-warp">
                                <img :src="items.avator ||'/static/images/default_avator.png'" class="avatar-circle"
                                     :data-user="items.id">
                                <span v-text="items.name"></span>
                            </div>
                        </li>
                        <i class="fix"></i>
                    </ul>
                    <ul v-else>
                        <div class="nodata-warp-little nodata-warp">
                            <p>暂无活跃成员</p>
                        </div>
                    </ul>
                </div>
                <div class="cat1 e-box" v-if="subjectGroup.length>0" v-cloak>
                    <label>可能感兴趣的圈子</label>
                    <ul>
                        <li v-for="items in subjectGroup">
                            <a :href="getUrl(items)" :target="items.sourceType==1 ? '_blank':''">
                                <img class="fl" :src="items.pictureUrl">
                                <div>
                                    <h3 v-text="items.name"></h3>
                                    <span>创建时间：{%items.updateDate|date%}</span>
                                    <p>
                                        <i class="fl" v-text="'圈主：'+items.creatorName"></i>
                                        <i class="fr" v-text="'人数：'+items.memberCount"></i>
                                    </p>
                                </div>
                                <i class="fix"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <link rel="import" href="../common/footer.html?__inline"/>
</div>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/js/index/group/groupdetail.js" id="entry"></script>
</body>
</html>