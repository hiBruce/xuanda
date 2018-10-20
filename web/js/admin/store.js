//前端数据状态管理
var store = new Vuex.Store({
    state: {
        menu: [],
    },
    //需要返回状态或者值
    getters: {
        /**
         * 判断是否具有权限
         * @param state
         * @returns {Function}
         */
        //获取菜单树
        getMenu: function (state) {
            return function () {
                return state.menu;
            }
        },
        //通过id获取子菜单
        getChildMenu: function (state, id) {
            return function () {
                var childMenu = [];
                if (state.menu.length > 0) {
                    state.menu.forEach(function (ele) {
                        if (ele.id === id) {
                            childMenu = ele;
                        }
                    })
                }
                return childMenu;
            }
        },
        //通过当前路径自动获取子菜单
        autoGetChildMenu: function (state) {
            return function () {
                var nowPath = router.app.$route.path;
                var childMenu = [];
                for (let i = 0, j = state.menu.length; i < j; i++) {
                    if (nowPath.indexOf(state.menu[i].bs) == 1) {
                        childMenu = state.menu[i].children;
                        break;
                    }
                    ;
                }
                return childMenu;
            }
        },
        //获取菜单树中第一个真实页面路径
        getFirstMenu: function (state) {
            return function (index) {
                var firstMenu = {};
                var time = 0;
                let ind = index || 0;
                getFirstMenu(ind)

                function getFirstMenu() {
                    if (state.menu.length > 0) {
                        firstMenu = getdeepLoop(state.menu[ind])
                    }
                };

                function getdeepLoop(menu) {
                    var getMenu = {};
                    getdeep(menu)

                    function getdeep(nowMenu) {
                        if (nowMenu.children && nowMenu.children.length > 0) {
                            getdeep(nowMenu.children[0])
                        } else {
                            getMenu = nowMenu
                        }
                        ;
                    }

                    return getMenu;
                };
                return firstMenu;

            }
        }
    },
    mutations: {
        // 菜单数据
        setMenus: function (state, data) {
            state.menu = data;
        },

    },
    actions: {}
});
