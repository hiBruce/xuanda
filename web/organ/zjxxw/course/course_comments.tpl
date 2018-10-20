<!-- 课程评论 -->
<div v-cloak>
    {{#showReview _user_ reviewCon}}
    <div class="halfstar" id="halfstar"></div>
    <div class="userText">
         <textarea placeholder="请输入评论内容" name="content" id="content" v-model=" courseComment.content"></textarea>
        <p class="showTextlen"><i id="showLen">0</i>/500</p>
    </div>
    <button class="fr" @click="submitContent">评论</button>
    {{/showReview}}
    <ul class="evaluateed">
        <li v-for="row in courseComments">
            <img class="fl" src="/static/images/default_avator.png" alt="">
            <div class="fl">
                <h3>******<span>{% row.createDate | date %}</span></h3>
                <div class="halfstar1" :id="row.id"></div>
                <div class="content" v-text="row.content">
                </div>
            </div>
        </li>
    </ul>
    <div class="comment-page">
    </div>
</div>
<!--<script src=__uri("/web/v/main.js") data-main="/static/js/front/course/course_comments.js"></script>-->