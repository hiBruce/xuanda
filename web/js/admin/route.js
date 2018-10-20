import accountManagerRoute from './account_manager/route.js';
import organManagerRoute from './organ_manager/route.js';
import roleManagerRoute from './role_manager/route.js';
import logManagerRoute from './log_manager/route.js';
import templateManagerRoute from './template_manager/route.js';
import cmsRoute from './cms/route.js';
import activityManagerRoute from './activity_manager/route.js';
import groupManagerRoute from './group_manager/route.js';

//路由配置
window.router = new VueRouter({
    routes: [].concat(accountManagerRoute, organManagerRoute, roleManagerRoute, logManagerRoute, templateManagerRoute, cmsRoute, activityManagerRoute, groupManagerRoute)
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