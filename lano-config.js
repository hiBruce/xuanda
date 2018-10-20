/**
 * 全量配置信息，对于每个系统的个性化配置， 请不要写入本文件,而是conf/lano-confi-环境.js
 *
 * @author 康永胜
 * @date 2016-08-31T09:47:53+0800
 */
var util = require('util');
var path = require('path');


/*获取fis的media信息*/
var fisMedia = '__CURRENT-FIS-MEDIA__';
if (fisMedia.indexOf('__CURRENT-FIS-MEDIA') === 0) {
    fisMedia = (global.fis && global.fis.project.currentMedia()) || 'development';
}

switch(fisMedia){
    case 'dev':
        fisMedia = 'development';
        break;
    case 'test-no-opti':
        fisMedia = 'test';
        break;
    case 'production-no-opti':
        fisMedia = 'production';
        break;
}

/*获取配置文件*/
var confPath = path.join(__dirname, 'conf');
var oUserConfig = require(path.join(confPath, `lano-conf-${fisMedia}.js`));

/*----------------配置信息开始----------------*/
var oConfig = {
    /* 站点图标中间件 */
    'serve-favicon': {
        // 图标路径，以应用根目录为起始目录。
        'icon-path': '/favicon.ico'
    },
    setHeader:null,
    'packLocation':'./web/js/*',
    /*中间件开关，'true'表示开启，'false'表示关闭，不配置默认开启*/
    'middleware-switch': {
        //为站点提供入口控制服务的中间件
        'lano-getway': false,

        //为站点提供logo的中间件
        'serve-favicon': true,

        //记录请求日志的中间件
        'lano-middleware-logger': true,

        //解析cookie的中间件
        'cookie-parser': true,

        //处理session的中间件
        'lano-session': true,

        //单点登录的服务器中间件
        'lano-sso-server': false,

        //单点登录的客户端中间件
        'lano-sso-client': false
    },

    /* 配置开发和生产环境下的日志级别 */
    'lano-logger': {
        'logs-path': 'logs', /* 日志的存放目录，默认为/logs目录 */
        /**
         * 开发模式和生产模式下的业务日志级别，级别由高到低为： error, warn, info, verbose, debug, silly
         * 详情性查看: https://github.com/winstonjs/winston
         */
        'level-development': 'debug',
        'level-production': 'error',
        /**
         * 请求日志的记录级别，所有级别如下： combined, common, dev, short, tiny 详情请查看:
         * https://www.npmjs.com/package/morgan
         */
        'morgan-development': 'dev',
        'morgan-production': 'combined',
        'morgan-under-production': true
        /* 生产模式下是否记录请求日志 */
    },

    /*lano-ajax-proxy*/
    'lano-ajax-proxy': {
        //ajax的挂载路径，默认为'/ajax'
        'mount-path': '/ajax'
    },

    /*数据代理的配置信息*/
    'lano-data-proxy': {
        /*配置数据代理所使用的服务器地址*/
        'data-sources': {
            'default': {
                //对数据源的描述，默认值为'无描述'
                'description': '默认数据源',

                //数据源集群的所有地址
                'urls': ['http://localhost:8080/'],

                //默认的请求路径，如果请求时指定path参数，则该配置被覆盖，默认为'/'
                'default-path': '/',

                //默认的请求内容类型, 默认值为'application/x-www-form-urlencoded'
                'default-content-type': 'application/x-www-form-urlencoded',

                //node用于将请求发送到该数据源时候用于识别的参数名称, 默认为'service'
                'route-rule-param-name': 'service',

                //数据源路由的规则, 默认为'[**]', 即全部匹配
                'route-rules': ['**'],

                //数据源失效策略： pure-pulse(默认策略，单纯心跳监听),
                //incidental(请求附带判断，定时监听复活)，默认为'pure-pulse'
                'out-of-date-strategy': 'pure-pulse',

                //node监听服务心跳的时间间隔，单位：秒，默认300
                'pulse-interval': 300,

                //监听的路径，默认'/'
                'pulse-path': '/',

                //node认为数据源失效的、连续产生拒绝服务的次数，
                //如果设置为0或false则不会将数据源标记为失效
                'times-to-die': false,

                //请求超时时长，单位：毫秒，默认3000
                'timeout': 3000,

                //node到后端的请求失败之后是否重新进行发送，默认为true
                'resend-after-failing': true,

                //请求失败后被重发的次数, 只有当'resend-after-failing'为true时才有效, 默认为2
                'resend-times': 2,

                //请求参数与实际参数之间的映射，默认为'[]'
                // 'props-map':['service -> serviceName', 'method -> methodName', 'data -> requestJson']
            }
        },

        /*TCP连接池配置*/
        'http-agent': {
            // 是否保持连接池中的连接活跃，以便用于下次请求
            'keepAlive': true,

            //连接池可容纳的最大连接数，默认为50
            'maxSockets': 50,

            //连接池中可容纳的最大空闲连接数，默认为50
            'maxFreeSockets': 50,

            //连接保持的最长时间,单位为秒，默认为600000，即10分钟
            'keepAliveTimeout': 600000,

            //连接超时时间,单位为秒，默认为1200000，即20分钟
            'timeout': 1200000
        }
    },

    /* 权限中间件: 配置权限过来等 */
    'lano-security': {
        // 中间件挂载路径， 默认为'/apps'
        'mount-path': [ '/ucenter', '/admin'],

        // 路径模式，'root'表示路径从应用根目录开始，
        // 'mount'表示路径从中间件的挂载目录开始
        'path-pattern': 'root',

        // 权限验证失败时的跳转uri，默认为'/login'
        'not-login-uri': '/login',

        // 权限不足时的跳转路径，默认为根目录
        'permission-denied-uri': '/login',

        // 权限规则，所有的规则会叠加在一起发挥作用
        'validate-rules': [
            {
                'roleList': ['default'],
                'patternList': ['/myconsole/**', '/apps/**']
            }
        ]
    },

    /*配置redis服务信息，该服务主要是lano-session模块在用，业务代码也可使用该服务*/
    'redis': {
        //主机域名，默认为127.0.0.1
        'host': '10.100.23.83',

        //端口，默认为6379
        'port': 6379,

        //密码，默认无密码
        'pass': 'foobared',

        //数据库的索引号，默认为0
        'db': 0,

        //session在数据库中存储时key的前缀，默认为'lano-'
        'prefix': 'lano-'
    },

    /*配置session*/
    'lano-session': {
        //session超时时间，默认为900s，即15min
        'timeout': 2*60*60,

        //浏览器中存储cookie的名称，默认为'lano.connect.sid'
        'name': 'lano.connect.sid',

        //cookie信息
        'cookie': {
            //cookie对应的domain属性值，false表示不带domain属性
            'domain': false,

            //cookie对应的path属性值，默认为根目录'/'
            'path': '/',

            //httpOnly属性，默认为true
            'httpOnly': true
        }
    },

    /*单点登录: 服务器端配置*/
    'lano-sso-server': {
        //服务器作为中间件的挂载路径，默认为'/login'
        'mount-path': '/login',

        //数据源名称
        'data-proxy-name': 'default',

        //登录界面的模板路径，默认为'web/login/index'
        'login-view-path': 'web/html/login/login',

        //弹出框登录界面的模板路径，默认为'web/login/index-dialog'
        'login-dialog-view-path': 'web/html/login/index-dialog',

        //是否使用系统映射表, 该表是确保服务器跳转到信任的链接颁发token,
        //在sso-server用于开发环境的时候, 该属性可以配置为false
        'use-system-mapping': true,

        //系统名称与真实uri的映射，该uri是'lano-sso-client'在系统中的挂载路径
        'system-mapping': {
            'self': '/',
            'example': 'http://localhost:3006/login'
        }
    },

    /*单点登录: 客户端配置*/
    'lano-sso-client': {
        //客户端作为中间件的挂载路径
        'mount-path': '/login',

        //当前客户端的名称，默认为'lano-server',
        //开发环境下请设置为本地的开发url,
        //url具体到组件的挂载路径
        'system-name': 'lano-server',

        //登录成功后的跳转uri，默认为'/'
        'login-successfuly-uri': '/',

        //退出成功后的跳转uri，默认为'/'
        'logout-successfuly-uri': '/',

        //单点登录的认证服务器uri
        'lano-sso-server-uri': 'http://localhost:3006/login',

        //会话中心的redis服务信息配置，
        //单点登录客户端会从该redis中读取用户信息，从而实现单点登录。
        //该配置请与UCenter中的redis配置项保持一致
        'session-center-redis': {
            //主机域名，默认为127.0.0.1
            'host': '10.100.23.83',

            //端口，默认为6379
            'port': 6379,

            //密码，默认为无密码
            // 'pass': 'foobared',

            //数据库的索引号，默认为0
            'db': 0,

            'pass': 'foobared',

            //session在数据库中存储时key的前缀，默认为'lano-'
            'prefix': 'lano-',

            //每次请求时为会话中心的session续期到的时间，
            //该时间应当与会话中心中session的超时时间一致
            'session-renewal-seconds': 900
        },
    },
    /*部署信息配置*/
    'deploy': {
        /*开发模式下应用将要被部署的位置*/
        'real-path': '',
        /*发布模式*/
        'pattern': fisMedia,
        // /*公有cdn*/
        // 'cdn-public': {
        //     'url': 'http://10.126.3.116:3001',
        //     'receivers': [
        //         {
        //             'url' : 'http://10.126.3.116:3003/receiver',
        //             'real-path' : '/home/kangys/ws-node/cdn-public/public'
        //         }
        //     ]
        // },
        // /*私有cdn*/
        // 'cdn-private':{
        //     'url': 'http://10.126.3.116:3002',
        //     'receivers': [
        //         {
        //             'url' : 'http://10.126.3.116:3003/receiver',
        //             'real-path' : '/home/kangys/ws-node/cdn-private/public'
        //         }
        //     ]
        // },
        /*web应用服务器*/
        // 'lano-server': {
        //     'receivers': [
        //         {
        //             'url' : 'http://10.126.3.116:3003/receiver',
        //             'real-path' : '/home/kangys/ws-node/lano-server/public'
        //         }
        //     ]
        // }
    }
};

/*----------------配置信息结束----------------*/

fnMergConf(oUserConfig, oConfig);
module.exports = oConfig;

/**
 * 合并APP本地配置信息与默认配置信息
 * @author 康永胜
 * @date   2016-08-31T10:01:33+0800
 * @param  {Object}                 oSource [description]
 * @param  {[type]}                 oTarget [description]
 * @return {[type]}                         [description]
 */
function fnMergConf(oSource, oTarget){
    for(var key in oSource){
        if ((key in oTarget) && util.isObject(oSource[key]) && !util.isArray(oSource[key])) {
            fnMergConf(oSource[key], oTarget[key]);
            continue;
        }
        oTarget[key] = oSource[key];
    }
}