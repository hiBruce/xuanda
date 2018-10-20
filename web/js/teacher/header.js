function headControl() {
    var count = 0;
    getStr()
    function getActive(str) {
        try {
            if (str.length == 0) {
                document.getElementById('home').className += 'active';
            } else {
                document.getElementById(str).className += 'active';
            }
        } catch (e) {
            count++;
            if (count <= 3) {
                setTimeout(function () {
                    getActive(str)
                }, 60);
            }
        }
    }

    function getStr() {
        var str = window.location.pathname;
        if (str.length > 0) {
            if (str.indexOf('/') == 0)
                str = str.substring(1);
            var idx = str.indexOf('/');
            if (idx >= 0) {
                str = str.substring(0, idx);
            }
            getActive(str)
        }
    }
};
headControl()
