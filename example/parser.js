// ${element}${selector}${name}${attributes}${contains}${content}${attach}${trigger}${is}${function};
// {'input#name{type:text}':()=>{}}
const parse = function(obj){
  const output = []
  const items = Object.getOwnPropertyNames(obj)

  for (let item in items) {
    let setHandler = true
    const parseBlocks = items[item].split(';')
    for(let parseBlock of parseBlocks){
      parseBlock = parseBlock.split('=').split('{')[0]
      const attrs = `{${parseBlock.split('=').split('{')[1]}`
      if(attrs) attrs = JSON.parse(attrs)
      const isId = parseBlock[0].contains('#')
      let element = isId ? document.querySelector(parseBlock[0]) : document.querySelectorAll(parseBlock[0])
      if(!element){
        isId
        ? element = parseBlock[0].split('#')
        : element = parseBlock[0].split('.')
          let attr = isId ? 'id' : 'class'
          element = document.createElement(element[0])
          if(element[1]) element.setAttribute(attr,element[1])
          if(attrs){
            for (attr in Object.getOwnPropertyNames(attrs) ){
              element.setAttribute(Object.getOwnPropertyNames(attrs)[attr],
              Object.values(attrs)[attr])
            }
          }
      }
      if(Object.values(obj)[item]){
        const content = parseBlock[1].split('.')
        element.innerHTML = content[0]
        let eventListener = content[1]
        if( eventListener ){
           eventListener = eventListener.split(':')
          element.addEventListener(eventListener[0],Object.values(obj)[item])
        }


      }
      if(output[0]) output.push(element)
    }
  }

  return output ?  output : element
}
let str = `{"type":"text"}`
let obj = JSON.parse(str)
console.log(obj)
