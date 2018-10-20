<div class="part menulist">
    <h3>
        <i class="bread"></i>课程目录
    </h3>
    <ul v-cloak v-if="courseChapters.length>0">
        <li v-for="chapter in courseChapters" class="chapter-wrap">
            <label v-if=" course.templateType != 2">
                <i class="iconfont">&#xe67d;</i>
                <span v-text="chapter.name" class="limittext control-h2 span_chapter"></span>
            </label>
            <ul v-if=" course.templateType == 0">
                <li class="child_li" v-for="child in chapter.children" :data-percent="child.percent+1">
                    <div class="sec-chapter">
                        <a href="javascript:void(0)">
                            <i class="iconfont fl mr10">&#xe67d;</i>
                            <span class="fl left-span" v-text="child.name"></span>
                            <i class="fix"></i>
                        </a>
                    </div>
                    <ul class="third_ul">
                        <li class="third_li" v-for="thirdContent in child.contentList">
                            <i class="iconfont  fl mr10">
                                <template v-if="thirdContent.type==2"> &#xe628;</template>
                                <template v-else-if="thirdContent.type==3">&#xe6b8;</template>
                                <template v-else-if="thirdContent.type==4">&#xe678;</template>
                                <template v-else-if="thirdContent.type == 5">&#xe739;</template>
                                <template v-else-if="thirdContent.type==6">&#xe644;</template>
                            </i>
                            <span class="fl left-span" v-text="thirdContent.contentName"></span>
                            <i class="fix"></i>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul v-else-if=" course.templateType == 1">
                <li class="child_li" v-for="child in chapter.contentList" :data-percent="child.percent+1">
                    <div class="sec-chapter">
                        <a href="javascript:void(0)">
                            <i class="iconfont fl mr10">
                                <template v-if="child.type==2"> &#xe628;</template>
                                <template v-else-if="child.type==3">&#xe6b8;</template>
                                <template v-else-if="child.type==4">&#xe678;</template>
                                <template v-else-if="child.type == 5">&#xe739;</template>
                                <template v-else-if="child.type==6">&#xe644;</template>
                            </i>
                            <span class="fl left-span" v-text="child.contentName"></span>
                            <i class="fix"></i>
                        </a>
                    </div>

                </li>
            </ul>
            <ul v-else-if=" course.templateType == 2" style="border-top:0">
                <li class="child_li" v-for="child in chapter.contentList" :data-percent="child.percent+1">
                    <div class="sec-chapter">
                        <a href="javascript:void(0)">
                            <i class="iconfont fl mr10">
                                <template v-if="child.type==2"> &#xe628;</template>
                                <template v-else-if="child.type==3">&#xe6b8;</template>
                                <template v-else-if="child.type==4">&#xe678;</template>
                                <template v-else-if="child.type == 5">&#xe739;</template>
                                <template v-else-if="child.type==6">&#xe644;</template>
                            </i>
                            <span class="fl left-span" v-text="child.contentName"></span>
                            <i class="fix"></i>
                        </a>
                    </div>

                </li>
            </ul>
        </li>
    </ul>
</div>