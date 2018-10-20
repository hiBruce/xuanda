require(['vue','jquery','common','vueModal','bootstrap', 'bootbox', 'artDialog', 'dialog'], function (vue,$,common,modal) {
    window.Vue = vue;
    window.$ = window.jQuery = $;
    Vue.use(modal);
    require(['vueDirective','vueFilter',$("script[data-main]").attr("data-main")]);
});