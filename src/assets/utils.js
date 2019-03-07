const utils = (function(){
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min,

  obj = (obj) => {
      return {
        properties : Object.getOwnPropertyNames(obj),
        values : Object.values(obj)
      }
  },

  params = (func) => {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
        ARGUMENT_NAMES = /([^\s,]+)/g,
        fnStr = func.toString().replace(STRIP_COMMENTS, ''),
        result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
        result = [];
        return result;

  },
  elements = (args) => {
    const argsObj = obj(args);
    for(let item in argsObj.properties ){
      args[argsObj.properties[item]] = view.element(argsObj.values[item])
    }
    return args
  },
  format = (str) => {
    return str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/(?:\r\n|\r|\n)/g, '<br>');
  },
  args = ( args, func ) => {
    if(utils.obj(args).properties.length > 0){
      const obj = {}, params = utils.params(func)
      for(let item in params){
        obj[params[item]] = args[item]
      }
      return obj
    }
  },
  occurence = (str,find) => (str.match(new RegExp(`${find}`,'g')) || []).length;
  return{
    getRandomInt : getRandomInt,
    obj : obj,
    params : params,
    elements : elements,
    format : format,
    args : args,
    occurence : occurence
  }
})()
