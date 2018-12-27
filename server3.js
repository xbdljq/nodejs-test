var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = parsedUrl.pathname

  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ 
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) 
  }
  
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)
  if(path === '/' || path === '/index.html'){
    var string = fs.readFileSync('./index.html','utf8');
    var amount = fs.readFileSync('./db','utf8')


    string = string.replace('&&&amount&&&',amount);
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
   // response.write('哈哈哈')
   response.write(string)
    response.end()
  }else if(path === '/style.css'){
    var string = fs.readFileSync('./style.css','utf8');
    response.setHeader('Content-Type', 'text/css')
    response.write(string)
    response.end()
  }else if(path === '/pay'){
      var amount = fs.readFileSync('./db','utf8')
      var newAmount = amount - 1;
      fs.writeFileSync('./db',newAmount)

      if(Math.random() > 0.5){
        fs.writeFileSync('./db',newAmount)
        response.setHeader('Content-Type', 'image/png')
        response.statusCode = 200
        response.write(fs.readFileSync('./44.png'))
        response.write('succcess')
      }else{
        response.statusCode = 400
        response.write('fail')
      }

      response.end()
  }
  else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('找不到对应的路径，你需要自行修改index.js'+path)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
  console.log('------')
  console.log(method +','+request.url+','+path)
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
