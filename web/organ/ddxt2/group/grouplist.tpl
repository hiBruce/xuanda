<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>圈子列表</title>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <link rel="stylesheet" href="/web/static/style/index/group/circle.less">
</head>
<body>
{{#header}}{{/header}}
{{#partial 'ddxt2_common_nav' }}{{/partial}}
<div class="page" id="app">
    <div class="sd-wrapper circle">
        <!-- 列表部分开始 -->
        <div class="act-search">
            <div class="cat">
                <label>分类:</label>
                <ul v-cloak>
                    <li v-for="(items,index) in circleClassify">
                        <a href="javascript:void(0);" :class="(activeClassNum==index) && 'active' "
                           @click="changeCategory($event,index)" v-text="items.name">
                        </a>
                    </li>
                </ul>
            </div>
            <div class="cat" v-if="circleTag.length>0" v-cloak>
                <label>标签:</label>
                <ul>
                    <li>
                        <a href="javascript:void(0);" :class="!activeTagsNum && 'active' "
                           @click="changeTags($event,0)">全部</a>
                    </li>
                    <li v-for="(items,index) in circleTag">
                        <a href="javascript:void(0);" :class="(activeTagsNum==index+1) && 'active' "
                           @click="changeTags($event,index+1)" v-text="items.name"></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list-group spe-list">
            <ul v-if="circleList && circleList.length > 0" id="data-container" v-cloak>
                <li v-for="items in circleList" class="fl">

                    <div class="img-warp">
                        <a :href="getUrl(items)" :target="items.sourceType==1 ? '_blank':''">
                            <img :src="items.pictureUrl">
                        </a>
                        <div v-if="items.sourceType!=1">
                            <button type=2 v-if="items.hasjoin" class="join-btn hasjoin-btn">已加入</button>
                            <button type=1 @click="join($event,items)" v-else class="join-btn">加入</button>
                        </div>
                    </div>
                    <a :href="getUrl(items)" :target="(items.sourceType==1)&& '_blank'">
                        <h4 v-text="items.name"></h4>
                        <p class="time">创建时间:{% items.createDate|dateMinute %}</p>
                        <p class="info">
                            <span class="fl" v-text="'圈主：'+items.creatorName"></span>
                            <span class="fl" v-text="'人数：'+items.memberCount"></span>
                        </p>
                        <p v-text="items.synopsis" class="limittext"></p>
                    </a>
                </li>
                <i class="fix"></i>
            </ul>
            <div class="nodata-warp" v-else>
                <p>暂无数据</p>
            </div>
        </div>
        <div class="cj-page"></div>
    </div>
    {{#footer}}{{/footer}}
</div>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/js/index/group/grouplist.js" id="entry"></script>
</body>
</html>