<!-- 课程笔记 -->
<div class="note-header" v-cloak>
    <div class="sortrow clearfix">
        <div class="header-right" style="text-align:right;">
            <ul class="sort">
                <li>排序:</li>
                <li>
                    <span class="sortitemicon" @click="ChangeOrder('DCjsj')">
                        创建时间
                        <i class="iconfont" :class="{selected:orderBy=='DCjsj'}"
                           v-if="orderByDirection == 'asc' && orderBy=='DCjsj'">&#xe73f;</i>
                        <i class="iconfont" :class="{selected:orderBy=='DCjsj'}" v-else-if="orderByDirection == 'asc' && orderByDirection == 'desc'">&#xea79;</i>
                        <i class="iconfont" :class="{selected:orderBy=='DCjsj'}" v-else>&#xea79;</i>
                    </span>
                </li>
                <!--<li>-->
                    <!--<span class="sortitemicon" @click="ChangeOrder('NPlcs')">-->
                    <!--评论数-->
                    <!--<i class="iconfont" :class="{selected:orderBy=='NPlcs'}"-->
                       <!--v-if="orderByDirection == 'asc' && orderBy=='NPlcs'">&#xe73f;</i>-->
                    <!--<i class="iconfont" :class="{selected:orderBy=='NPlcs'}" v-else-if="orderByDirection == 'asc' && orderByDirection == 'desc'">&#xea79;</i>-->
                         <!--<i class="iconfont" :class="{selected:orderBy=='NPlcs'}" v-else>&#xea79;</i>-->

                <!--</span>-->
                <!--</li>-->
                <li>
                    <span class="sortitemicon" @click="ChangeOrder('NSccs','FavoritedCount','sortitemicon','kcbj');">
                        收藏数
                        <i class="iconfont" :class="{selected:orderBy=='NSccs'}"
                           v-if="orderByDirection == 'asc' && orderBy=='NSccs'">&#xe73f;</i>
                        <i class="iconfont" :class="{selected:orderBy=='NSccs'}" v-else-if="orderByDirection == 'asc' && orderByDirection == 'desc'">&#xea79;</i>
                         <i class="iconfont" :class="{selected:orderBy=='NSccs'}" v-else>&#xea79;</i>

                    </span>
                </li>
            </ul>
            <!--{{#showReview _user_ reviewCon}}-->
                 <span class="create-note" @click="addNotesBtn"><i class="iconfont">&#xe605;</i> 添加笔记</span>
            <!--{{/showReview}}-->
        </div>
        <div class="fix line"></div>
    </div>
</div>
<ul class="note-content" v-cloak>
    <li v-for="note in notes['notes']" >
        <div class="note-row">
            <div class="head_leftimg clearfix">
                <img class="fl avatar" :src="note.authorPortrait||'/static/images/default_avator.png'" alt="">
                <div class="itemcontent fl clearfix">
                    <!-- 标题部分 -->
                    <div class="ct-header fix">
                        <div class="ct-header-l fl" style="display: inline;">
                            <a style="font-weight: bolder;" v-text="note.authorName"></a>
                            <!--<a class="clink20" :title="note.cbt" href="#" @click="showNoteDetail" v-text="note.cbt"></a>-->
                            <span class='icon-share ' v-if="note.nfxzt == 1" title="此笔记已设置为分享"></span>
                            <span class='icon-recommand element' v-if="note.ntjzt == 1"
                                  title="此笔记已被推荐为精品笔记">&nbsp;</span>
                            <span class='icon-jiang element' v-if="note.nsfzybj == 1" title="此笔记为重要笔记">&nbsp;</span>
                        </div>
                        <div class="class fr" v-text="note.cksmc" v-if="note.cksmc"></div>

                        <div class="ct-header-r fr" style="width: 290px; display: inline;">
                            <div class="fr" style="display: none;">
                                <div class="videopoint hand" onmouseover="this.className='videopoint hand filteropcity'"
                                     onmouseout="this.className='videopoint hand'"></div>
                            </div>
                            <div class="fl">
                                <div class="courseware-name clearfix" v-if="note.CKsmc">
                                    <div class="left"></div>
                                    <div class="center " :title="'所属课程：'+note.CKsmc" v-text="note.CKsmc">
                                    </div>
                                    <div class="right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 内容部分 -->
                    <div class="ct-content fix">
                        <div v-text="note.cnr"></div>
                    </div>
                    <!-- 鼠标放上后的链接 -->
                    <div class="ct-footer fx">
                        <div class="fl">
                            <!--<span class="iconfont ico fl"><i>&#xe6e0;</i>评论 ({%note.nplcs%})</span>-->
                            <span class="iconfont ico fl"><sc :scparams="note" scfl="4" :cb="getNotes"></sc>({%note.nsccs%})</span>
                            <!--<span class="iconfont ico"><i>&#xe654;</i>分享 ({%note.nfxcs%})</span>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
    </li>
</ul>
<div class="page-info"></div>