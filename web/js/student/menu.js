define(function () {
    var getSlash = function () {
        var str = window.location.pathname;
        if (str.length > 0) {
            str = str.substring(str.lastIndexOf('/') + 1);
        }
        return str;
    };

    //获取积分
    var getPoint = function () {
        var data = {};
        var success = function (result) {
            if (result.resultCode === "0") {
                $("#pointSpan").html(result.data);
            }
        };
        Service.get('/zjxxw/api/archive/point', data, success);
    };
    //获取学分
    var getDegree = function () {
        var data = {};
        var success = function (result) {
            if (result.resultCode === "0") {
                $("#degreeSpan").html(result.data);
            }
        };
        Service.get('/zjxxw/api/archive/degree', data, success);
    };
   setTimeout(function () {
       $(document).on('click', '.drop_h4',function(){
           var par = $(this).parents(".drop_li");
           if($(par).find(".down_btn").css("display") ==='block'){
               $(par).find('.sub-menu').show();
               $(par).find(".down_btn").hide();
               $(par).find(".up_btn").show();
           }else{
               $(par).find('.sub-menu').hide();
               $(par).find(".down_btn").show();
               $(par).find(".up_btn").hide();
           }
       });
   },0);
    getPoint();
    getDegree();
    return {
        init: function() {
            var slash = getSlash();
            if (slash.length === 0 || slash === 'ucenter') {
                $('.user-info .ucenter').addClass('active');
                $('.user-conter .ucenter').addClass('active');
            } else {
                $('.user-conter li.' + slash).addClass('active');
                 $('.user-info .' + slash).addClass('active');
                if ($('.user-conter li.' + slash).parent().hasClass('sub-menu')) {
                    var par = $('.user-conter li.' + slash).parents(".drop_li");
                    $(par).find('.sub-menu').show();
                    $(par).find(".down_btn").hide();
                    $(par).find(".up_btn").show();
                }
            }
        }
    };
});