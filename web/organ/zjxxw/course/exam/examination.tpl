<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>测试</title>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <link rel="stylesheet" href="/web/static/style/index/course/course.less">
</head>
<body>
<link rel="import" href="../../common/header.html?__inline"/>
<link rel="import" href="../../common/nav.html?__inline"/>
<div class="page">
    <input type="hidden" value="{{kcid}}" id="courseId"/>
    <input type="hidden" value="{{kcnrid}}" id="chapterId"/>
    <input type="hidden" value="{{examId}}" id="examId"/>
    <input type="hidden" value="{{kssc}}" id="kssc"/>


    <div class="sd-wrapper activity page-content examination">
        <form id="ksForm">

            <!-- 中间内容 -->
            <div class="nav-right nav-right-ucenter  paper_detail_content" id="app" style="min-height:300px">
                <div class="paper_title">
                    <h3 v-html="chapterName"></h3>
                    <span class="score small_score">总分<i v-text="sj.zfz"></i>分</span>
                </div>
                <div class="time_count" v-cloak>
                    <span v-if="flag" >测试剩余时间：<i v-text="m"></i> : <i v-text="s"></i></span>
                    <span v-if="!flag">测试剩余时间：不限时</span>
                </div>
                <div class="dxt pro_wrap attend_exam_wrap" v-if="danxRow.length>0"  v-cloak>
                    <h4 class="title">
                        <span class="">单选题</span>
                        <span class="fr"><i v-text="'总分'+danxZf+'分'"></i></span>
                    </h4>
                    <ul class="pro_list">
                        <li class="pro_li" v-for="(danx,index) in danxRow">
                            <h5>
                                <i class="fl" v-text="(index+1)+'、'"></i><span v-html="danx.mc" class="fl"></span><i class="fl" v-text="'（'+ danx.tmfz+'分）'"></i>
                                <i class="fix"></i>
                            </h5>
                            <ul class="options_list">
                                <li v-for="tmxx in danx.tmxxs">
                                    <span class="circle_span fl" >
                                        <input type="radio" :name="danx.id" :value="tmxx.xx"/>
                                    </span>
                                    <i v-text="tmxx.xx" class="fl"></i><span class="text fl" v-html="tmxx.xxnr"></span>
                                    <i class="fix"></i>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="dxt pro_wrap attend_exam_wrap" v-if="duoxRow.length>0"  v-cloak>
                    <h4 class="title">
                        <span class="">多选题</span>
                        <span class="fr"><i v-text="'总分'+duoxZf+'分'"></i></span>
                    </h4>
                    <ul class="pro_list">
                        <li class="pro_li" v-for="(duox,index) in duoxRow">
                            <h5>
                                <i class="fl" v-text="(index+1)+'、'"></i><span v-html="duox.mc"></span>（<i v-text="duox.tmfz+'分'"></i>）
                            </h5>
                            <ul class="options_list">
                                <li v-for="tmxx in duox.tmxxs">
                                <span class="circle_span">
                                    <input type="checkbox" :name="duox.id" :value="tmxx.xx"/>
                                </span>
                                    (<i v-text="tmxx.xx"></i>) <span class="text" v-html="tmxx.xxnr"></span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>


                <div class="pdt pro_wrap attend_exam_wrap" v-if="pandRow.length>0"  v-cloak>
                    <h4 class="title">
                        <span class="">判断题</span>
                        <span class="fr"><i v-text="'总分'+pandZf+'分'"></i></span>
                    </h4>
                    <ul class="pro_list ">
                        <li class="pro_li" v-for="(pand,index) in pandRow">
                            <h5>
                                <i class="fl" v-text="(index+1)+'、'"></i><span v-html="pand.mc"></span>（{%pand.tmfz%}分）
                            </h5>
                            <ul class="options_list">
                                <li>
                                <span class="right_input fl">
                                     <span class="circle_span">
                                        <input type="radio" :name="pand.id" value="yes">
                                    </span>
                                    正确
                                </span>
                                    <span class="error_input fl">
                                  <span class="circle_span">
                                    <input type="radio" :name="pand.id" value="no">
                                 </span>
                                    错误
                              </span>
                                    <i class="fix"></i>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </div>






                <div class="jdt pro_wrap attend_exam_wrap" v-if="wxtkRow.length>0"  v-cloak>
                    <h4 class="title">
                        <span class="">完型填空</span>
                        <span class="fr"><i>总分{%wxtkZf%}分</i></span>
                    </h4>
                    <ul class="pro_list">
                        <li class="pro_li" v-for="(wxtk,index) in wxtkRow">
                            <h5>
                                <i class="fl" v-text="(index+1)+'、'"></i><span v-html="wxtk.mc"></span>（{%wxtk.tmfz%}分）
                            </h5>
                            <ul v-if="wxtk.ztmList.length>0" class="ml30">
                                <li class="pro_li" v-for="(ztm,index2) in wxtk.ztmList">
                                    <ul>
                                        <li v-if="ztm.lx==1">
                                            <h5>
                                                <i class="fl" v-text="(index2+1)+'、'"></i><span v-html="ztm.mc" class="fl"></span><i class="fl" v-text="'（'+ ztm.tmfz+'分）'"></i>
                                                <i class="fix"></i>
                                            </h5>
                                            <ul class="options_list">
                                                <li v-for="tmxx in ztm.tmxxs">
                                                        <span class="circle_span fl" >
                                                            <input type="radio" :name="ztm.id" :value="tmxx.xx"/>
                                                        </span>
                                                    <i v-text="tmxx.xx" class="fl"></i><span class="text fl" v-html="tmxx.xxnr"></span>
                                                    <i class="fix"></i>
                                                </li>
                                            </ul>
                                        </li>

                                        <li v-if="ztm.lx==2">
                                            <h5>
                                                <i class="fl" v-text="(index2+1)+'、'"></i><span v-html="ztm.mc"></span>（<i v-text="ztm.tmfz+'分'"></i>）
                                            </h5>
                                            <ul class="options_list">
                                                <li v-for="tmxx in ztm.tmxxs">
                                                        <span class="circle_span">
                                                            <input type="checkbox" :name="ztm.id" :value="tmxx.xx"/>
                                                        </span>
                                                    (<i v-text="tmxx.xx"></i>) <span class="text" v-html="tmxx.xxnr"></span>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>


                <div class="jdt pro_wrap attend_exam_wrap" v-if="ydljRow.length>0"  v-cloak>
                    <h4 class="title">
                        <span class="">阅读理解</span>
                        <span class="fr"><i>总分{%ydljZf%}分</i></span>
                    </h4>
                    <ul class="pro_list">
                        <li class="pro_li" v-for="(ydlj,index) in ydljRow">
                            <h5>
                                <i class="fl" v-text="(index+1)+'、'"></i><span v-html="ydlj.mc"></span>（{%ydlj.tmfz%}分）
                            </h5>

                            <ul v-if="ydlj.ztmList.length>0" class="ml30">
                                <li class="pro_li" v-for="(ztm,index2) in ydlj.ztmList">
                                    <ul>
                                        <li v-if="ztm.lx==1">
                                            <h5>
                                                <i class="fl" v-text="(index2+1)+'、'"></i><span v-html="ztm.mc" class="fl"></span><i class="fl" v-text="'（'+ ztm.tmfz+'分）'"></i>
                                                <i class="fix"></i>
                                            </h5>
                                            <ul class="options_list">
                                                <li v-for="tmxx in ztm.tmxxs">
                                                            <span class="circle_span fl" >
                                                                <input type="radio" :name="ztm.id" :value="tmxx.xx"/>
                                                            </span>
                                                    <i v-text="tmxx.xx" class="fl"></i><span class="text fl" v-html="tmxx.xxnr"></span>
                                                    <i class="fix"></i>
                                                </li>
                                            </ul>
                                        </li>

                                        <li v-if="ztm.lx==2">
                                            <h5>
                                                <i class="fl" v-text="(index2+1)+'、'"></i><span v-html="ztm.mc"></span>（<i v-text="ztm.tmfz+'分'"></i>）
                                            </h5>
                                            <ul class="options_list">
                                                <li v-for="tmxx in ztm.tmxxs">
                                                            <span class="circle_span">
                                                                <input type="checkbox" :name="ztm.id" :value="tmxx.xx"/>
                                                            </span>
                                                    (<i v-text="tmxx.xx"></i>) <span class="text" v-html="tmxx.xxnr"></span>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>




                <div class="jdt pro_wrap attend_exam_wrap" v-if="zhugRow.length>0"  v-cloak>
                    <h4 class="title">
                        <span class="">主观题</span>
                        <span class="fr"><i>总分{%zhugZf%}分</i></span>
                    </h4>
                    <ul class="pro_list">
                        <li class="pro_li" v-for="(zhug,index) in zhugRow">
                            <h5>
                                <i class="fl" v-text="(index+1)+'、'"></i><span v-html="zhug.mc"></span>（{%zhug.tmfz%}分）
                            </h5>
                            <textarea :name="zhug.id" class="jdt_area" v-lano-limit="{judge:'noSpecialForExam',maxLen:500}"></textarea>
                        </li>
                    </ul>
                </div>


            </div>
        </form>
        <div class="btn_wrap"  v-cloak>
            <a class="btn cancel_btn"  href="/course/detail/{{kcid}}#/courseMenu">返回</a>
            <button class="btn submit_btn" @click="submitForm()">提交</button>
        </div>
    </div>


    <div class="fix"></div>
    <link rel="import" href="../../common/footer.html?__inline"/>
</div>
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/course/exam/examination.js" id="entry"></script>
</html>
