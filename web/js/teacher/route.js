import courseManagerRoute from './course_manager/route.js';
import learningTraceRoute from './learning_trace/route.js';
import noticeRoute from './notice/route.js';
import questionLibraryRoute from './question_library/route.js';
import createCourseRoute from './create_course/route.js';

//路由配置
window.router = new VueRouter({
    routes: [].concat(courseManagerRoute, learningTraceRoute, noticeRoute, questionLibraryRoute, createCourseRoute)
});
router.beforeEach(function (to, from, next) {
    resolveRootMenu(to, next);
});

function resolveRootMenu(path, next) {
    let allMenu = store.getters.getMenu();
    getMenu(allMenu);

    function getMenu(menu) {
        if (menu && menu.length > 0) {
            allMenu = menu;
            resolove();
        } else {
            setTimeout(function () {
                var menu = store.getters.getMenu();
                getMenu(menu);
            }, 5);
        }
    }

    function resolove() {
        let nowMenu = path.fullPath;
        var isRootMenu = false;
        var ind = 0;
        if (nowMenu == '/') {
            isRootMenu = true;
        } else {
            for (let i = 0, j = allMenu.length; i < j; i++) {
                if (nowMenu === allMenu[i].url) {
                    isRootMenu = true;
                    ind = i;
                    break;
                }
            }
            ;
        }

        if (isRootMenu) {
            var firstMenu = store.getters.getFirstMenu(ind);
            goFirstMenu(firstMenu);

            function goFirstMenu(menu) {
                if (!menu.url) {
                    setTimeout(function () {
                        firstMenu = store.getters.getFirstMenu(ind);
                        goFirstMenu(firstMenu);
                    }, 5);
                } else {
                    next(menu.url);
                }
            }
        } else {
            next();
        }
    }
};