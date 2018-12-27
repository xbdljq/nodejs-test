# nodejs-test
# 后台启动应用
node server.js 8888 >! log 2>&1 &

# 启动应用
node server.js 8888

或者

node server 8888

# 添加路由
- 打开 server.js，添加 if else
- 重新运行 node server.js 8888


# 运行jsonp结果请求
- C:\Windows\System32\drivers\etc 打开这个路径下的hosts文件  ，在文件末尾加上以下内容
>127.0.0.1 frank.com
>127.0.0.1 jack.com

- 然后在该项目文件夹内，打开2个git base， 
> 一个git base  运行 POST=8001 node server 8001
> 一个git base  运行 POST=8002 node server 8002

- 浏览器分别运行以下网址
> http://frank.com:8001/
> http://jack.com:8002/

- 然后在http://frank.com:8001/页面，点击付钱按钮，查看开发者控制台，就可以看到请求了http://jack.com:8002/这个网址，这就是跨域了
