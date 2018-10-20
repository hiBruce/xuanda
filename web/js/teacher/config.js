require.config({
    baseUrl: '/',
    map: {},
    waitSeconds: 0,
    paths: {
        jquery: '/static/lib/js/jquery-1.11.3.min',
        bootstrap: '/static/lib/bootstrap/js/bootstrap.min',
        common: '/static/js/common/common',
        app: '/static/js',
        lib: '/static/lib/js',
        vue: '/static/lib/js/vue/vue',
        vueRouter: '/static/lib/js/vue/vue-router',
        vuex: '/static/lib/js/vue/vuex',
        vueFilter: '/static/lib/js/vue/lano-filter/filter',
        vueModal: "/static/lib/js/vue/lano-modal/index",
        Pagination: '/static/js/common/pagination',
        fcup: '/static/lib/js/fcup/src/js/jquery.fcup',
        Swiper: '/static/lib/js/swiper/swiper2.7.6.min',
        vueDirective: "/static/lib/js/vue/lano-directive/index",
        ztree: '/static/zTree/js/ztree.all',
        ztreejs: '/static/zTree/js/jquery-1.4.4.min',
        jqueryContextMenu: '/static/lib/js/plugins/jquery.contextMenu',
        metadata:'/static/js/common/metadata',
        ckeditor: '/static/lib/js/ckeditor/ckeditor',
        confirm: '/web/static/js/common/confirm',
        datePicker:'/web/static/lib/js/WdatePicker/WdatePicker',
        q: '/static/lib/js/q/q',
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'fcup': ['jquery'],
        'common': ['jquery'],
        'Swiper': {
            exports: "Swiper",
            deps: ['jquery']
        },
        'Pagination': {
            deps: ['common', 'jquery']
        },
        'vueDirective': {
            deps: ['vue']
        },
        'metadata': {
            exports: ['metadata']
        },
        'ztree': ['jquery']
    }
});
require(['vue', 'jquery', 'common', 'vueModal', 'vueRouter', 'vuex', 'bootstrap'], function (vue, $, common, modal, router, Vuex) {
    window.Vue = vue;
    window.$ = window.jQuery = $;
    window.VueRouter = router;
    window.Vuex = Vuex;
    Vue.use(modal);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    require(['vueDirective', 'vueFilter', 'ztree', '/web/component/service-organ-settings.js', document.getElementById("entry").dataset.main]);
});