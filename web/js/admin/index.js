mod['index'] = new Vue({
    el: "#app",
    router: router,
    store: store,
    data: function () {
        return {
            menus: [],
            leftMenus: [],
            currentMenu: null
        };
    },
    methods: {
        getMenuTree: function () {
            var self = this;
            Service.get("/centro/admin/menu/getMyMenus", {type: 1}, function (result) {
                self.menus = result.data;
                self.$store.commit('setMenus', self.menus);

                if (self.menus.length > 0) {
                    self.leftMenus = self.menus[0].children;
                }
                // self.setDefaultMainTab();
            });
        },

        /**
         * 点击主菜单时，改变主菜单选中状态
         * @param event
         * @param menu
         */
        changeMainTab: function (event, menu) {
            // 设置当前菜单选中状态
            this.currentMenu = menu;
            this.leftMenus = menu.children;
        },

        /**
         * 一进页面，设置默认的主菜单选中状态
         */
        isDefaultMainTab : function (menu){
            if (this.menus == null) {
                return false;
            }
            if (this.currentMenu != null) {
                return this.currentMenu == menu;
            }

            var currentRoute = this.$route.path;
            function isChoosed(m){
                if (m.url == currentRoute) {
                    return true;
                } else  if (m.children != null && m.children.length > 0){
                    var choosed = false;
                    for (var i = 0; i < m.children.length; i ++){
                        if (isChoosed(m.children[i])) {
                            choosed = true;
                            break;
                        }
                    }
                    return choosed;
                } else {
                    return false;
                }
            }

            var choosed = isChoosed(menu);
            if ( choosed){
                this.leftMenus = menu.children;
            }
            return  choosed;
        },

        /**
         * 判断是否有子菜单选中
         * @param ind
         * @returns {boolean}
         */
        hasChildrenSelected: function (ind) {
            if (this.$route.path.indexOf(this.leftMenus[ind].url) >= 0) {
                var $el = $(".menu_list").find('.menu_li').eq(ind).find('h4');
                $el.parents(".menu_li").siblings('.menu_li').find(".show_detail").removeClass("show_detail");
                $el.addClass("show_detail");
                $el.siblings(".sec_list").show();
                $el.find(".fr").html("&#xe676;");
                return true;
            }
            return false;
        },

        /**
         * 点击后显示子菜单
         * @param event
         */
        onLeftMenuClick : function (event){
            var $el = $(event.target);
            if ($el.hasClass("show_detail")) {
                $el.removeClass("show_detail");
                $el.siblings(".sec_list").hide();
                $el.find(".fr").html("&#xe675;");
            } else {
                $el.addClass("show_detail");
                $el.siblings(".sec_list").show();
                $el.find(".fr").html("&#xe676;");
            }
        }
    },
    computed: {},
    created: function () {
    },
    mounted: function () {
        this.getMenuTree();
    }
});
