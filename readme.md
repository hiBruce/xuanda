# lano-front-platform

### 一些基础配置项
#### 1、packLocation:对于单页应用有需求要把单页内模块的js进行合并，这个属性是指定需要合并的js路径的;
#### 2、ifReleaseEs:是否启用es6+的解析，默认开启，true为开启，false为关闭;
#### 3、deploy.real-path:指定发布路径，默认发布路径为'../lano-server-deploy';
#### 4、lano-session:指定本项目session的name，每个项目都应该有自己单独的name;
#### 5、lano-security.mount-path:指定需要权限的路径;



### 一些需要注意的问题
#### 1、在页面内访问/web/static和访问/static都可以访问到static目录下的文件，但对于less文件只能用/web/static，
##### 原因：fis在编译less文件时的访问路径是/web/static，然后它会把所有访问这个路径的链接的.less改为.css，如果这时前端写的是/static，fis是匹配不到的。

暂存用户名
学院管理
管理员账号：admin_15318152783110
登录密码：888888

老师登录
管理员账号：teacher_15318152788341
登录密码：888888

学员登录
管理员账号：student_15318152794632
登录密码：888888