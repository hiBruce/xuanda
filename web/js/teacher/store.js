//前端数据状态管理
window.store = new Vuex.Store({
    state: {
        menu: [],
        settings : {}
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
        getSettings : function (state){
            return function () {
                return state.settings;
            }
        },
        //通过id获取子菜单
        getChildMenu: function (state, id) {
            return function () {
                var childMenu = [];
                if (state.menu.length > 0) {
                    state.menu.forEach(function (ele, i) {
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
                function findFirst(m){
                    if (m.children == null || m.children.length == 0) {
                        return m;
                    } else {
                        var vm = null;
                        for (var i = 0; i < m.children.length; i ++) {
                            vm = findFirst(m.children[i]);
                            if (vm != null) {
                                break;
                            }
                        }
                        return vm;
                    }
                }

                var theFirst = null;
                for (var i = 0; i < state.menu.length ; i ++){
                    theFirst = findFirst(state.menu[i]);
                    if (theFirst != null) {
                        break;
                    }
                }
                return theFirst;

            }
        }
    },
    mutations: {
        // 菜单数据
        setMenus: function (state, data) {
            state.menu = data;
        },
        setSettings : function (state, data){
            state.settings = data;
        }
    },
    actions: {}
});
