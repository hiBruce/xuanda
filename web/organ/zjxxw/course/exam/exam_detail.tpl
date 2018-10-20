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
<input type="hidden" id="cjid" value="{{cjid}}">
<input type="hidden" id="sjid" value="{{sjid}}">
<div class="page">
    <div class="sd-wrapper activity page-content">
        <!-- 中间内容 -->
        <div class="nav-right nav-right-ucenter paper_detail_content" id="app">
            <div class="paper_title">
                <h3 v-html="sj.mc"></h3>
                <span class="score small_score">总分{%cj.sjzf%}分，已得{%cj.fs%}分</span>
            </div>

            <div class="dxt pro_wrap attend_exam_wrap" v-if="danxRow.length">
                <h4 class="title">
                    <span class="">单选题</span>
                </h4>
                <ul class="pro_list">
                    <li class="pro_li" v-for="danx in danxRow">
                        <h5>
                            <span v-html="danx.mc"></span>（{%danx.tmfz%}分）
                            <span class="fr right">
                                <i class="iconfont" v-if="!danx.cs">&#xe643;</i><i v-if="!danx.cs">未答</i>
                                <span v-else>
                                    <i class="iconfont" v-if="danx.cs.sfzq==1">&#xe6e5;</i><i v-if="danx.cs.sfzq==1">正确</i>
                                    <i class="iconfont" v-if="danx.cs.sfzq==0">&#xe643;</i><i v-if="danx.cs.sfzq==0">错误</i>
                                </span>
                                <div>
                                    <i>我的答案：{%danx.cs ? danx.cs.wdda : ''%}</i>
                                </div>
                            </span>
                        </h5>
                        <ul class="options_list">
                            <li v-for="tmxx in danx.tmxxs">
                                <span class="circle_span circle_slected" v-if="tmxx.sfzq==1"><i class="iconfont">&#xe6e5;</i></span>
                                <span class="circle_span " v-if="tmxx.sfzq==0"><i class="iconfont">&#xe6e5;</i></span>
                                ({%tmxx.xx%}) <span class="text" v-html="tmxx.xxnr"></span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="dxt pro_wrap attend_exam_wrap" v-if="duoxRow.length">
                <h4 class="title">
                    <span class="">多选题</span>
                </h4>
                <ul class="pro_list">
                    <li class="pro_li" v-for="duox in duoxRow">
                        <h5>
                            <span v-html="duox.mc"></span>（{%duox.tmfz%}分）
                            <span class="fr right">
                                <i class="iconfont" v-if="!duox.cs">&#xe643;</i><i v-if="!duox.cs">未答</i>
                                <span v-else>
                                    <i class="iconfont" v-if="duox.cs.sfzq==1">&#xe6e5;</i><i v-if="duox.cs.sfzq==1">正确</i>
                                    <i class="iconfont" v-if="duox.cs.sfzq==0">&#xe643;</i><i v-if="duox.cs.sfzq==0">错误</i>
                                </span>
                                <div>
                                    <i>我的答案：{%duox.cs ? duox.cs.wdda : ''%}</i>
                                </div>
                            </span>
                        </h5>
                        <ul class="options_list">
                            <li v-for="tmxx in duox.tmxxs">
                                <span class="circle_span circle_slected" v-if="tmxx.sfzq==1"><i class="iconfont">&#xe6e5;</i></span>
                                <span class="circle_span " v-if="tmxx.sfzq==0"><i class="iconfont">&#xe6e5;</i></span>
                                ({%tmxx.xx%}) <span class="text" v-html="tmxx.xxnr"></span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>


            <div class="pdt pro_wrap attend_exam_wrap" v-if="pandRow.length">
                <h4 class="title">
                    <span class="">判断题</span>
                </h4>
                <ul class="pro_list ">
                    <li class="pro_li" v-for="pand in pandRow">
                        <h5>
                            <span v-html="pand.mc"></span>（{%pand.tmfz%}分）
                            <span class="fr right">
                                <i class="iconfont" v-if="!pand.cs">&#xe643;</i><i v-if="!pand.cs">未答</i>
                                <span v-else>
                                    <i class="iconfont" v-if="pand.cs.sfzq==1">&#xe6e5;</i><i v-if="pand.cs.sfzq==1">正确</i>
                                    <i class="iconfont" v-if="pand.cs.sfzq==0">&#xe643;</i><i v-if="pand.cs.sfzq==0">错误</i>
                                </span>
                                <div>
                                    <i>我的答案：{%pand.cs ? pand.cs.wdda == 'yes' ? '正确':'错误' : ''%}</i>
                                </div>
                            </span>
                        </h5>
                        <ul class="options_list">
                            <li>
                                <span class="right_input fl">
                                     <span class="circle_span circle_slected" v-if="pand.zqda=='yes'"><i class="iconfont">&#xe6e5;</i></span>
                                     <span class="circle_span " v-else><i class="iconfont">&#xe6e5;</i></span>
                                    正确
                                </span>
                                <span class="error_input fl">
                                     <span class="circle_span circle_slected" v-if="pand.zqda=='no'"><i class="iconfont">&#xe6e5;</i></span>
                                     <span class="circle_span " v-else><i class="iconfont">&#xe6e5;</i></span>
                                    错误
                              </span>
                                <i class="fix"></i>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>

            <form id="zfForm">
                <div class="jdt pro_wrap attend_exam_wrap" v-if="zhugRow.length">
                    <h4 class="title">
                        <span class="">主观题</span>
                    </h4>
                    <ul class="pro_list">
                        <li class="pro_li" v-for="zhug in zhugRow">
                            <h5>
                                <span v-html="zhug.mc"></span>（{%zhug.tmfz%}分）
                            </h5>
                            <p class="jdt_text"  style="font-weight:bold">答：</p><i  v-if="zhug.cs" v-html="zhug.cs.wdda"></i>

                            <div v-if="zhug.cs">
                                <span style="font-weight:bold">题目解析</span>：<i v-html="zhug.bz"></i>
                                <span style="font-weight:bold">点评</span>：<i v-html="zhug.cs.dp"></i>
                                <span style="font-weight:bold">得分</span>：<i v-html="zhug.cs.df"></i>分
                            </div>
                        </li>
                    </ul>
                </div>
            </form>

        </div>
    </div>
    <div class="fix"></div>
    <div class="btn_wrap">
        <a class="btn cancel_btn" style="background: #62CCDE;color: #fff;" href="/course/detail/{{kcid}}#/courseMenu">返回</a>
    </div>

    <link rel="import" href="../../common/footer.html?__inline"/>
</div>
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/course/exam/exam_detail.js" id="entry"></script>
</html>