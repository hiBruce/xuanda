var oAppConfig = {
    // 端口号
    'server-port': 3006,
    'ifReleaseEs': true,
    'packLocation': './web/js/admin/*',//配置需要合并的路径
    'deploy': {
        /*开发模式下应用将要被部署的位置*/
        'real-path': '../lano-cloud-pro'
    },
    'domain': 'http://10.100.23.85:3006',
    setHeader: ['domain'],
    'AAS': {
        'appKey': 'zjxxw',
        'loginUrl': '/login',
        'homeUrl': '/index.html',
        'lnpt': 'http://ln.zjlll.cn/zsjypt/oou_index.action',
        'cmsNoticeUrl': 'http://10.100.23.94:8080/static/publish/notice/',
        'cmsNewsUrl': 'http://10.100.23.94:8080/static/publish/news/'
    },
    'middleware-switch': {
        'lan-sso-server': true,
        'lano-security': true,
        'lano-sso-client': false
    },
    'app_auth': {
        'app_key': 'zjxxw',
        'app_secret': 'd1f18aed-b0f2-235w-ae04-5b6cd7b75922'
    },
    // 'lano-sso-client': {
    //     //单点登录的认证服务器uri
    //     'lano-sso-server-uri': 'http://10.100.23.85:3006/login'
    // },
    'redis': {
        'host': '10.100.23.83',
        'port': 6379,
        'pass': 'foobared',
        'db': 1
    },
    'lano-data-proxy': {
        'data-sources': {
            'default': {
                'description': '默认数据源',
                'urls': ['http://10.100.23.84:8080/service'],
                'default-path': '/',
                'pulse-path': '',
                'timeout': 300000
            },
            'aCms': {
                'description': 'cms',
                'urls': ['http://10.100.23.94:8080'],
                'default-path': '/',
                'pulse-path': '',
                'route-rule-param-name': 'cms',
                'timeout': 300000
            },
            'weixinPlatform': {
                'description': '微信第三方平台',
                'urls': ['http://10.100.23.105:9009/'],
                'default-path': '/',
                'pulse-path': '',
                'route-rule-param-name': 'weixinPlatform',
                'timeout': 300000
            },
            'centroNode': {
                'description': '单点登录java',
                // 'urls': ['http://centro.zjlaedu.com'],
                'urls': ['http://10.100.23.85:3006'],
                'default-path': '/',
                'pulse-path': '',
                'route-rule-param-name': 'centroNode',
                'timeout': 300000
            }
        }
    },
    'lano-session': {
        'name': 'thirdorganization.connect.sid'
    },
    'lano-security': {
        // 中间件挂载路径， 默认为'/apps'
        'mount-path': ['/admin', '/teacher'],

        // 路径模式，'root'表示路径从应用根目录开始，
        // 'mount'表示路径从中间件的挂载目录开始
        'path-pattern': 'root',

        // 权限验证失败时的跳转uri，默认为'/login'
        // 'not-login-uri': '/login',

        // 权限不足时的跳转路径，默认为根目录
        // 'permission-denied-uri': '/login',

        // 权限规则，所有的规则会叠加在一起发挥作用
        'validate-rules': [
            {
                'roleList': ['default'],
                'patternList': ['/admin/**', '/teacher/**']
            }
        ]
    },

    /**
     * 上传文件配置
     */
    'upload': {
        // 映射路径
        'mount-path': '/upfile',

        // 文件服务器提供商 local -本地文件服务器 , oss -阿里云oss服务器
        'upload-provider': 'fdfs',

        // 临时目录位置
        'tempDir': './temp',

        // 阿里云oss服务器配置
        'oss': {
            'ACCESS_ID': '',
            'ACCESS_KEY': '',
            'endPoint': '',
            'bucketName': ''
        },
        'fdfs': {
            serverUrl: 'http://dfs.zjlll.net',
            trackers: [
                {
                    host: 'www.zjlll.net',
                    port: 22122
                }
            ]
        },

        // 本地文件服务器
        'local': {
            // 文件服务器位置
            'fileServerUrl': 'http://10.100.23.85:3006/upload',
            'location': 'upload'
        }
    }
};

module.exports = oAppConfig;
