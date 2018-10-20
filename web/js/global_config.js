require.config({
    baseUrl: '/',
    map: {},
    waitSeconds: 0,
    paths: {
        noext: '../../lib/js/require/noext',
        jquery: '/web/static/lib/js/jquery-1.11.3.min',
        bootstrap: '/web/static/lib/js/bootstrap',
        ace: '/web/static/lib/js/ace.min',
        aceElements: '/web/static/lib/js/ace-elements.min',
        common: '/web/static/js/common/common',
        artDialog: '/web/static/lib/js/artDialog/js/dialog',
        dialog: '/web/static/js/common/dialog',
        bootbox: '/web/static/lib/js/bootbox',
        metadata: '/web/static/js/common/metadata',
        app: '/web/static/js',
        lib: '/web/static/lib/js',
        vue: '/web/static/lib/js/vue/vue',
        vueRouter: '/web/static/lib/js/vue/vue-router',
        vuex: '/web/static/lib/js/vue/vuex',
        vueFilter: '/web/static/lib/js/vue/vue-self-filter',
        vueModal: "/static/lib/js/vue/vue-modal/index",
        vueDirective: "/static/lib/js/vue/lano-directive/index",
        "template-web": '/web/static/lib/js/template-web',
        'Pagination': '/web/static/js/common/pagination',
        fcup: '/web/static/lib/js/fcup/src/js/jquery.fcup',
        d3: '/web/static/lib/js/d3/d3v3',
        c3: '/web/static/lib/js/c3/c3',
        Swiper: '/web/static/lib/js/swiper/swiper2.7.6.min',
        ueditorConfig: '/web/static/lib/js/ueditor-1.4.3.3/ueditor.config',
        ueditor: '/web/static/lib/js/ueditor-1.4.3.3/ueditor.all.min',
        confirm: '/web/static/js/common/confirm',
        drag: "/static/lib/js/vuedraggable/dist/vuedraggable.min",
        sortablejs: "/static/lib/js/sortablejs/Sortable",
        d3: '/web/static/lib/js/d3/d3v3',
        c3: '/web/static/lib/js/c3/c3',
        ckeditor: '/web/static/lib/js/ckedirot/ckeditor'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'c3': {
            deps: ['d3'],
            exports: "c3"
        },
        fcup: ['jquery'],
        'common': ['jquery'],
        'lib/ace.min': ['jquery'],
        'ace': ['jquery'],
        'aceElements': ['jquery'],
        'jqueryFlot': ['jquery'],
        'jqueryFlotPie': ['jquery'],
        'metadata': ['jquery'],
        'artDialog': {
            deps: ['jquery']
        },
        'dialog': {
            exports: "dialog",
            deps: ['common', 'artDialog']
        },
        'Swiper': {
            exports: "Swiper",
            deps: ['jquery']
        },
        'bootbox': {
            deps: ['bootstrap']
        },
        'jqueryFlotResize': ['jquery'],
        avalon: {
            deps: ['common'],
            exports: "avalon"
        },
        Pagination: {
            deps: ['common', 'jquery']
        },
        ueditor: {
            exports: "ueditor",
            deps: ['ueditorConfig']
        },
        vueDirective: {
            deps: ['vue']
        }
    }
});