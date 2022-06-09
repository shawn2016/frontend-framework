var http = require('http');
var path = require('path');

//path 模块提供用于处理文件路径和目录路径的实用工具


 var basePath = '/foo/bar/baz/asdf/quux.html';


  //path.basename(path,ext) 返回path的最后一部分
  /**
   * path <string>
      ext <string> 可选的文件扩展名。 
      返回: <string>
   */
  var pathBaseName = path.basename("/foo/bar/baz/asdf/quux.html");
  var pathBaseName1 = path.basename("/foo/bar/baz/asdf/quux.html",'html');
  console.log(pathBaseName) //quux.html.txt
  console.log(pathBaseName1) //quux.



  /**
   * path.delimiter 提供平台特定的路径定界符：
   */
  console.log(process.env.PATH);// /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mongodb/bin:/usr/local/mongodb/bin
  console.log(process.env.PATH.split(path.delimiter));//将上述数组字符串进行拆分得到一个数组

   /**
    * path.dirname(path)
    * path.dirname() 方法返回 path 的目录名，类似于 Unix 的 dirname 命令。 尾部的目录分隔符将被忽略，参阅 path.sep。
    * path <string>
      返回: <string> 
    */
   var pathDirname = path.dirname("css/fff/txt.txt");
   console.log(pathDirname)


   /**
    * path.extname(path) 返回path的别名 即文件的后缀名
    * path.extname() 方法返回 path 的扩展名，
    * 从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束。 
    * 如果在 path 的最后一部分中没有 . ，
    * 或者如果 path 的基本名称（参阅 path.basename()）除了第一个字符以外没有 .，
    * 则返回空字符串。
    */
   console.log("path.extname(path)")
   var pathExtname1 = path.extname("index.html")   //.html
   var pathExtname2 = path.extname("index.html.md") //.md
   var pathExtname3 = path.extname("index.")        //.
   var pathExtname4 = path.extname("index")         //''
   var pathExtname5 = path.extname(".index")        // ''
   var pathExtname6 = path.extname(".index.md")     //.md

   console.log(pathExtname1)
   console.log(pathExtname2)
   console.log(pathExtname3)
   console.log(pathExtname4)
   console.log(pathExtname5)
   console.log(pathExtname6)

   /**
    * path.format(pathObject) 格式化
    * path.format() 方法从对象返回路径字符串。 与 path.parse() 相反。
    * 当为 pathObject 提供属性时，注意以下组合，其中一些属性优先于另一些属性：
    * 如果提供了 pathObject.dir，则忽略 pathObject.root。
    * 如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。
    */ 
   // 如果提供了 `dir`、 `root` 和 `base`， 则返回 `${dir}${path.sep}${base}`。  
    var pathObject={
      dir :"/dir",
      root :"root/",
      base :"base/",
      name :"name/",
      ext :"txt.txt",
    }
    var pathFormat = path.format(pathObject) 
    console.log({pathFormat:pathFormat})   // '/dir/base/'

    // 如果未指定 `dir`，则使用 `root`。 
    // 如果只提供 `root`，或 'dir` 等于 `root`，则将不包括平台分隔符。 
    // `ext` 将被忽略。
    var pathFormat1 = path.format({
      root:'/root/', 
      base:"base.txt",
      ext:'ext'
    }) 
    console.log({pathFormat1:pathFormat1})   //'/root/base.txt'

    // 如果未指定 `base`，则使用 `name` + `ext`。
    var pathFormat2 = path.format({
      root: '/root/',
      name: 'base',
      ext: '.txt'
    });
    console.log({pathFormat2:pathFormat2}) // '/root/base.txt' 

    // 返回: '/file.txt'
    console.log(path.parse('/dir/root/base/name/ext.txt'));


    /**
     * path.parse(path) path.parse() 方法返回一个对象，其属性表示 path 的重要元素。 尾部的目录分隔符将被忽略
     */
      var pathParse = path.parse("css//riiri/txt.txt")
      console.log(pathParse)
      /**返回的对象类型
       { root: '/',
          dir: '/dir/root/base/name',
          base: 'ext.txt',
          ext: '.txt',
          name: 'ext' }
       */

     /**
      * path.isAbsolute(path) 方法检测 path 是否为绝对路径。 如果给定的 path 是零长度字符串，则返回 false。
      */
     var pathIsabsolute = path.isAbsolute('/foo/bar'); 
     console.log(pathIsabsolute)


     /**
      * path.join([...paths]) path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
      * ...paths <string> 路径片段的序列。
      * 经常用于拼接路径
      */
     var pathJoin = path.join('/user/', 'bar/', '//baz/asdf', 'eee', 'y.txt');
     console.log(pathJoin); ///user/bar/baz/asdf/eee/y.txt


     /**
      * path.normalize(path) 方法规范化给定的 path，解析 '..' 和 '.' 片段。
      */
      /**
       * path.relative(from, to)
       * path.relative() 方法根据当前工作目录返回 from 到 to 的相对路径。 如果 from 和 to 各自解析到相同的路径（分别调用 path.resolve() 之后），则返回零长度的字符串。
       */

       var pathRelative = path.relative('/data/1/1.txt', '/data/2.txt')
       console.log({pathRelative:pathRelative});  //返回from到to的相对路径../../impl/bbb 
       



       /**
        * path.resolve([...paths])
        * path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
        */
       var pathResolve = path.resolve('/foo/bar', './baz');
       console.log(pathResolve) //'/foo/bar/baz'
       var pathResolve2 = path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
       console.log(pathResolve2) ///Users/hhh/Documents/work/mycode/git-knowledge/nodejs/wwwroot/static_files/gif/image.gif
     

      /**
       * path.sep 提供平台特定的路径片段分隔符： 
       */
      var pathSep = 'foo/bar/baz'.split(path.sep);
      console.log(pathSep)

      /**
       * path.toNamespacedPath(path)  仅在 Windows 系统上，返回给定 path 的等效名称空间前缀路径。 如果 path 不是字符串，则将返回 path 而不进行修改。
       * path.win32 属性提供对特定于 Windows 的 path 方法的实现的访问。
       */
 