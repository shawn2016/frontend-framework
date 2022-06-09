var http = require("http");  
var url = require('url')   
  //nodejs中用户url格式化和反格式化模块

  //用于url解析、处理等操作的解决方案 
  var newUrl = new URL("http://www.nodejs.org/some/url/?with=query&param=that#about")
  console.log(newUrl)
 
  //1.url.parse(urlString,parseQueryString,slashesDenoteHost)
  /**
   * urlString <string> 要解析的 URL 字符串。
      parseQueryString <boolean> 如果为 true，则 query 属性总会通过 querystring 模块的 parse() 方法生成一个对象。 如果为 false，则返回的 URL 对象上的 query 属性会是一个未解析、未解码的字符串。 默认为 false。
      slashesDenoteHost <boolean> 如果为 true，则 // 之后至下一个 / 之前的字符串会被解析作为 host。 例如，//foo/bar 会被解析为 {host: 'foo', pathname: '/bar'} 而不是 {pathname: '//foo/bar'}。 默认为 false。
      url.parse() 方法会解析一个 URL 字符串并返回一个 URL 对象。 
  */
 var myurl="http://www.nodejs.org/some/url/?with=query&param=that#about"
  parsedUrl=url.parse(myurl)
  // URL {
  //   href:
  //   'http://www.nodejs.org/some/url/?with=query&param=that#about',
  //   origin: 'http://www.nodejs.org',
  //   protocol: 'http:',
  //   username: '',
  //   password: '',
  //   host: 'www.nodejs.org',
  //   hostname: 'www.nodejs.org',
  //   port: '',
  //   pathname: '/some/url/',
  //   search: '?with=query&param=that',
  //   searchParams: URLSearchParams { 'with' => 'query', 'param' => 'that' },
  //   hash: '#about' }
  parsedUrl1=url.parse(myurl,true)
  console.log(parsedUrl1)
  // Url {
  //   protocol: 'http:',
  //   slashes: true,
  //   auth: null,
  //   host: 'www.nodejs.org',
  //   port: null,
  //   hostname: 'www.nodejs.org',
  //   hash: '#about',
  //   search: '?with=query&param=that',
  //   query: [Object: null prototype] { with: 'query', param: 'that' }, //第二个参数为true
  //   pathname: '/some/url/',
  //   path: '/some/url/?with=query&param=that',
  //   href:
  //    'http://www.nodejs.org/some/url/?with=query&param=that#about' }
  console.log(parsedUrl)
  console.log(url.parse(myurl,true,true))
  /*Url {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'www.nodejs.org',
    port: null,
    hostname: 'www.nodejs.org',
    hash: '#about',
    search: '?with=query&param=that',
    query: 'with=query&param=that', //参数转化成对象
    pathname: '/some/url/',
    path: '/some/url/?with=query&param=that',
    href:
     'http://www.nodejs.org/some/url/?with=query&param=that#about'} */
 
  //2.url.format(urlObject)
  /**
   * urlObject <Object> | <string> 一个 URL 对象（就像 url.parse() 返回的）。 如果是一个字符串，则通过 url.parse() 转换为一个对象。
   * url.format() 方法返回一个从 urlObject 格式化后的 URL 字符串。

   * 如果 urlObject 不是一个对象或字符串，则 url.format() 抛出 TypeError。 
   */   
var obj1={ protocol: 'http:',      
  slashes: true,         
  auth: null,           
  host: 'calc.gongjuji.net',   
  port: null,                 
  hostname: 'calc.gongjuji.net',  
  hash: '#one#two',              
  search: '?name=zhangsan&age=18',  
  query: 'name=zhangsan&age=18',    
  pathname: '/byte/',              
  path: '/byte/?name=zhangsan&age=18',  
  href: 'http://calc.gongjuji.net/byte/?name=zhangsan&age=18#one#two'   
};  
var url1=url.format(obj1);   //格式化参数字符串
console.log(url1); //http://calc.gongjuji.net/byte/?name=zhangsan&age=18#one#two

//3.url.resolve(from, to) 
/**
 * from <string> 解析时相对的基本 URL。
 * to <string> 要解析的超链接 URL。
 */
var url1=url.resolve('/one/two/three', 'four')         // '/one/two/four'
var url2=url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
var url3=url.resolve('http://example.com/one/', '/two') // 'http://example.com/two'
console.log(url1);
console.log(url2)
console.log(url3)
 