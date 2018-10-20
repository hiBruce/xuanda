<!DOCTYPE html>
<html lang="en">
<head>
    <!--<link rel="import" href="/web/html/_layout_/meta.html?__inline"/>-->
    <title>浙江学习网</title>
    <script src="/web/js/admin/header.js"></script>
    <link rel="stylesheet" href="/web/static/style/student/index.less">
    <link rel="stylesheet" href="/web/static/style/style.css">
    <link rel="stylesheet" href="/web/static/style/common/iconfont.css">
  </head>
<body>

<div class="page" id="app">
    <!--头-->
    <link rel="import" href="/web/html/index/common/header.html?__inline"/>
    <link rel="import" href="/web/html/index/index_wedge/nav.html?__inline"/>
    <!--    <link rel="import" href="/web/html/student/index_wedge/menu.tpl?__inline"/>-->
    <link rel="import" href="/web/html/index/index_wedge/banner.html?__inline"/>
    <link rel="import" href="/web/html/index/index_wedge/course.html?__inline"/>
    <div class="ad1">
        <a href="">
            <div class="ad" style="background-image:url('/web/static/images/ad1_del.png')"></div>
        </a>
    </div>

    <div>
        <cms-list></cms-list>
    </div>

    <link rel="import" href="/web/html/index/index_wedge/teacher.html?__inline"/>
    <link rel="import" href="/web/html/index/index_wedge/service.html?__inline"/>
</div>
<link rel="import" href="/web/html/index/common/footer.html?__inline"/>
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/js/index/index.js" id="entry"></script>
</html>