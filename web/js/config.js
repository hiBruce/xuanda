require.config({
    baseUrl: '/',
    map: {},
    waitSeconds: 0,
    paths: {
        jquery: '/web/static/lib/js/jquery-1.11.3.min',
        bootstrap: '/web/static/lib/bootstrap/js/bootstrap.min',
        common: '/web/static/js/common/common',
        app: '/web/static/js',
        lib: '/web/static/lib/js',
        vue: '/web/static/lib/js/vue/vue',
        vueRouter: '/web/static/lib/js/vue/vue-router',
        vuex: '/web/static/lib/js/vue/vuex',
        vueFilter: '/web/static/lib/js/vue/lano-filter/filter',
        vueDirective: "/web/static/lib/js/vue/lano-directive/index",
        vueModal: "/static/lib/js/vue/lano-modal/index",
        Pagination: '/web/static/js/common/pagination',
        fcup: '/web/static/lib/js/fcup/src/js/jquery.fcup',
        d3: '/web/static/lib/js/d3/d3v3',
        c3: '/web/static/lib/js/c3/c3',
        Swiper: '/web/static/lib/js/swiper/swiper2.7.6.min',
        confirm: '/web/static/js/common/confirm',
        dialog: '/web/static/js/common/dialog',
        ckeditor: '/web/static/lib/js/ckeditor/ckeditor',
        metadata: '/web/static/js/common/metadata'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'c3': {
            deps: ['d3'],
            exports: "c3"
        },
        'fcup': ['jquery'],
        'common': ['jquery'],
        'metadata': ['jquery'],
        'Swiper': {
            exports: "Swiper",
            deps: ['jquery']
        },
        'dialog': {
            exports: "dialog",
            deps: ['common', 'artDialog']
        },
        'Pagination': {
            deps: ['common', 'jquery']
        },
        'vueDirective': {
            deps: ['vue']
        }
    }
});
require(['vue', 'jquery', 'common', 'vueModal', 'bootstrap'], function (vue, $, common, modal) {
    window.Vue = vue;
    window.$ = window.jQuery = $;
    Vue.use(modal);
    require(['vueDirective', 'vueFilter', $("script[data-main]").attr("data-main")]);
});