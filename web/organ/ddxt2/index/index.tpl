<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="import" href="/web/html/_layout_/meta.html?__inline"/>
    <title>浙江学习网</title>
    <link rel="stylesheet" href="/web/static/style/index/index.less">
</head>
<body>
{{#header}}{{/header}}
{{#partial 'ddxt2_common_nav' }}{{/partial}}
<div class="page" id="app">
    <div class="back-white">
        <div class="sd-wrapper ">
            <ul>
                <li class="course_wrap">
                    <h3 class="title">
                        基础教育
                        <a href="/courselist?from=baseCourse" class="go_link fr">
                            查看更多 <i class="iconfont icon-you"></i>
                        </a>
                    </h3>
                    <ul class="course_list mt20">
                        {{#partial '{"name":"ddxt2_index_course_jc","params":{"pageNo":1}
                        ,"method":"get","url":"/jxxt/api/admin/course/category/4028829c46f4bf830146f4c1cefa0001/5"}' }}
                        {{/partial}}
                        <i class="fix"></i>
                    </ul>
                </li>
                <li class="course_wrap">
                    <h3 class="title">
                        学历教育
                        <a href="/courselist?from=formal" class="go_link fr">
                            查看更多 <i class="iconfont icon-you"></i>
                        </a>
                    </h3>
                    <ul class="course_list mt20">
                        {{#partial '{"name":"ddxt2_index_course_xl","params":{"pageNo":1}
                        ,"method":"get","url":"/jxxt/api/admin/course/category/4028829c46f4bf830146f4c7db180002/5"}' }}
                        {{/partial}}
                        <i class="fix"></i>
                    </ul>
                </li>
                <li class="course_wrap">
                    <h3 class="title">
                        非学历教育
                        <a href="/courselist?from=informal" class="go_link fr">
                            查看更多 <i class="iconfont icon-you"></i>
                        </a>
                    </h3>
                    <ul class="course_list mt20">
                        {{#partial '{"name":"ddxt2_index_course_fxl","params":{"pageNo":1}
                        ,"method":"get","url":"/jxxt/api/admin/course/category/4028829c46f4bf830146f4c84dfc0003/5"}' }}
                        {{/partial}}
                        <i class="fix"></i>
                    </ul>
                </li>
            </ul>

        </div>
    </div>

</div>
{{#footer}}{{/footer}}
</body>
<script src="/static/lib/js/require/require.js"></script>
<script src="/web/js/config.js" data-main="/web/js/index/index.js" id="entry"></script>
</html>