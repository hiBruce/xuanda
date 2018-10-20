<!DOCTYPE html>
<html lang="ch">
<head>
    <meta charset="UTF-8">
    <title>课程列表</title>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <link rel="stylesheet" href="/web/static/style/index/course/course.less">
</head>
<body>
<link rel="import" href="../../common/header.html?__inline"/>
<link rel="import" href="../../common/nav.html?__inline"/>
<div class="page" id="course">
    <div class="sd-wrapper course page-content" style="background:#fff;padding:20px;min-height:300px">
        {{{profile}}}
    </div>
    <input type="hidden" id="xykcid" value="{{xykcid}}">
    <input type="hidden" id="kcnrid" value="{{kcnrid}}">
    <link rel="import" href="../../common/footer.html?__inline"/>
</div>
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/organ/{{domain}}/course/text/index.js" id="entry"></script>
</html>