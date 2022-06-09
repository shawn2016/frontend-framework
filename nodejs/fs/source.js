
fs.readFile = function(path, options, callback_) { 
  var callback = maybeCallback(arguments[arguments.length - 1]); 
  //msybeCallback用来判断是否为一个function，这里时判断传入的第二个参数是否为function 
  //如果不是，那么就定义一个，这里对于后面的逻辑影响不大 
   
  //给options设置一些默认值，readFile的第二个参数，只能是三种情况 
  //1：function，这个时候，options使用默认值，第二个参数为回调函数 
  //2：string类型，这个时候，第二个参数为encoding的属性值 
  //3：object类型，这个时候，表示options为一个完整的对象，可能包含也可能不包含encoding和flag属性 
  //如果不为上述的三种类型，那么直接抛出一个类型异常，停止执行 
  if (util.isFunction(options) || !options) { 
   options = { encoding: null, flag: 'r' }; 
  } else if (util.isString(options)) { 
   options = { encoding: options, flag: 'r' }; 
  } else if (!util.isObject(options)) { 
   throw new TypeError('Bad arguments'); 
  } 
   
  var encoding = options.encoding; 
  assertEncoding(encoding); 
  //判断encoding是否为当前支持的编码类型，如果不支持，则抛出一个异常，停止执行。 
  //判断encoding的方法在Buffer模块中，请参考前面的文章，文章地址，请在源码分析的结尾查看。 
   
  // first, stat the file, so we know the size. 
  var size; 
  var buffer; // single buffer with file data 
  var buffers; // list for when size is unknown 
  var pos = 0; 
  var fd; 
   
  //参数验证成功，开始执行读取数据的，设置flag默认值 
  var flag = options.flag || 'r'; 
  //首先根据路径，打开文件，open的使用，请参考前面的文章 
  fs.open(path, flag, 438 /*=0666*/, function(er, fd_) { 
   //如果失败，那么获取到失败的error对象，并返回该对象 
   if (er) return callback(er); 
   
   //记录打开文件的文件描述符 
   fd = fd_; 
   
   //使用fstat，查看当前打开文件的一些基本信息。 
   //fstat获取到的信息，请向前翻看。 
   fs.fstat(fd, function(er, st) { 
    if (er) { 
     //如果在执行fstat时失败，则执行关闭文件的操作， 
     //关闭之后，把错误信息，传入readFile的回调函数 
     return fs.close(fd, function() { 
      callback(er); 
     }); 
    } 
   
    size = st.size; 
    //根据文件的大小，执行不同的操作 
    //如果为空文件，则重新定义一个空的buffers，执行read文件的方法 
    if (size === 0) { 
     // the kernel lies about many files. 
     // Go ahead and try to read some bytes. 
     buffers = []; 
     return read(); 
    } 
    //如果文件内容，大于内存所能保存的最大量，则抛出一个范围异常。 
    if (size > kMaxLength) { 
     var err = new RangeError('File size is greater than possible Buffer: ' + '0x3FFFFFFF bytes'); 
     return fs.close(fd, function() { 
      callback(err); 
     }); 
    } 
    //否则，定义一个与内容相当大小的Buffer对象，开始执行read方法 
    buffer = new Buffer(size); 
    read(); 
   }); 
  }); 
   
  function read() { 
   //根据size的不同，执行两个方法 
   //当读取成功时，执行afterRead方法。 
   //其中，size，buffer，fd，pos，等都是父级作用域的变量 
   if (size === 0) { 
    buffer = new Buffer(8192); 
    fs.read(fd, buffer, 0, 8192, -1, afterRead); 
   } else { 
    fs.read(fd, buffer, pos, size - pos, -1, afterRead); 
   } 
  } 
   
  function afterRead(er, bytesRead) { 
   if (er) { 
    //读取文件失败时，根据失败时的错误对象，执行readFile的回调函数 
    return fs.close(fd, function(er2) { 
     return callback(er); 
    }); 
   } 
   
   //如果读取的数据量为0，则表示已经读取结束，则执行close方法，结束readFile方法，并返回数据 
   if (bytesRead === 0) { 
    return close(); 
   } 
   
   //如果有值，则更改pos的值，也就是更改在read方法中，读取文件起始位置的值。 
   pos += bytesRead; 
   //如果pos的值，已经等于文件的长度size了，则表示当前文件已经读取结束了，则关闭文件 
   //否则，继续调用read方法，继续读取。 
   //如果size＝＝＝0的话，有可能是fstat没有能正常的读取到size的值，就执行后面的 
   if (size !== 0) { 
    if (pos === size) close(); 
    else read(); 
   } else { 
    // unknown size, just read until we don't get bytes. 
    //猜测，这里可能是在某些系统下，无法获取到文件的字节数，所以添加的这个判断。 
    buffers.push(buffer.slice(0, bytesRead)); 
    read(); 
   } 
  } 
   
  function close() { 
    fs.close(fd, function(er) { 
      //当文件读取结束时，拼接读取到的数组， 
      if (size === 0) { 
      // collected the data into the buffers list. 
      buffer = Buffer.concat(buffers, pos); 
      } else if (pos < size) { 
      buffer = buffer.slice(0, pos); 
      } 
      //根据是否有encoding，做一次编码转换 
      if (encoding) buffer = buffer.toString(encoding); 
      //把最终的数据，传入readFile的回调函数中。 
      return callback(er, buffer); 
    }); 
  } 
 }; 
