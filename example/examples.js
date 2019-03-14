

const examples = (function(){

  const modules = {},
//...........................................................................
  instantUpdate = function(input, output) {
    const module = (args) => {

      args = utils.elements(args); // get elements
      args.input.value = args.output.innerHTML; // set input value
      controller.add(args.input,'input',() => {
          // update output innerHTML with input value
          args.output.innerHTML = args.input.value;
      })
    }
    if( arguments[0] ) return module(utils.args( arguments, this.instantUpdate))
    return{

      label : 'Instant Update',
      description : 'Change innerHTML of target element with change of input',
      module : module
    }
  },

//...........................................................................
  instantCount = function(input, output) {
    const module = (args) => {
      args = utils.elements(args);
      controller.add(
        args.input,
        'input',
        () => {
          args.output.innerHTML = args.input.value.length;
        }
      )
    }
    if( arguments[0] ) return module(utils.args( arguments, this.instantCount))


    return{

      label : 'Instant Count',
      description : 'Count length of input value with change of input',
      module : module
    }
  },
//...........................................................................

  instantTransfer = function( input, from, to ) {
    const module = (args) => {
      model.data['items'] = [1,2,3,4,5]
      args = utils.elements(args);
      for( let item of model.data.items ) {
        view.add( args.input, "option").innerHTML = item
        view.add( args.from, "div",{ id : `item_${item}`}).innerHTML = item
      }
      controller.add( args.input, "change", () => {
        view.set(args.from,"")
        view.set(args.to,"")
        for( let item of model.data.items )
          view.add( args.from, "div",{ id : `item_${item}`}).innerHTML = item

        for(let option of args.input.selectedOptions){
          let element = view.element(`#item_${option.value}`)
          args.from.removeChild(element)
          args.to.appendChild(element)

        }
      })
    }
    if( arguments[0] ) return module(utils.args( arguments, this.instantTransfer))

    return{

      label : 'Instant Transfer',
      description : 'Transfer elements on basis of selection',
      module : module
    }
  },

  //...........................................................................

    instantElement = function( input, btn, target ) {
      const module = (args) => {
        args = utils.elements(args);
        controller.add( args.btn, "click", () => {
          let addItem = view.add( args.target,"li", args.input.value )
          controller.add(view.add( addItem, "button", "Remove"),"click",() => {
              args.target.removeChild( addItem )
          })
          args.input.value = "";
        })
      }
      if( arguments[0] ) return module(utils.args( arguments, this.instantElement))

      return{

        label : 'Instant Element',
        description : 'Create elements with content of input',
        module : module
      }
    },
  //...........................................................................

      instantDimensions = function( width, height, target ) {
        const module = (args) => {
          args = utils.elements(args);
          const dimensions = () => view.attr( args.target, {style : `width:${args.width.value}px;height:${args.height.value}px;background-color:rgb(${args.height.value/2},${args.width.value/2},${args.height.value/2});`})
          dimensions()
          controller.add( args.width, "input", dimensions)
          controller.add( args.height, "input", dimensions)
        }
        if( arguments[0] ) return module(utils.args( arguments, this.instantDimensions))

        return{

          label : 'Instant Dimensions',
          description : 'Modify dimensions of element instantly',
          module : module
        }
      },
  //...........................................................................

      instantFilter = function( input, target ) {
        const module = (args) => {
          args = utils.elements(args);
          model.data["items"] = [
            { text : "one" },
            { text : "two" },
            { text : "three" },
            { text : "four" },
            { text : "five" }
          ]
          const arrayOutput = view.element('#arr')
          arrayOutput.innerHTML = JSON.stringify(model.data.items)
          for( item of model.data.items )
            view.add(args.target,"li",item.text)
          controller.add(args.input,"input",()=>{
            const arr = [];
            view.set(args.target,"")
            for( item of model.data.items ){
              if(item.text.includes(args.input.value)) {
                view.add(args.target,"li",item.text);
                arr.push( item )
              }
            }
            arrayOutput.innerHTML = JSON.stringify(arr)
          })
        }
        if( arguments[0] ) return module(utils.args( arguments,this.instantFilter))

        return{

          label : 'Instant Filter',
          description : 'Filter items of list with input value',
          module : module
        }
      },
      //...........................................................................

          todoPriority = function( task ) {
            const module = (args) => {
              model.data[ 'list' ] = []

              const elements = [ 'list', 'task', 'priority' ]
              for( let item of elements ) view.element( item)

              buildList = function(){

                view.set('list','') // set contents of 'list' to '' in view
                model.data.list.sort( (a, b) => a.priority - b.priority )
                for( let item of model.data.list ){

                  const task = view.add( 'list', 'div',  { id : item.id } ) // add new element to 'list' in view
                  const check = view.add( task, 'input', { 'type' : 'checkbox' } ) // add new element to task
                  controller.add( check, 'click', done )
                  //console.log( view.elements )
                  const label =  view.add( task, 'label', { 'for' : check.id } , `${item.task} (${item.priority}) ` )
                  controller.add( view.add( task, 'button',{class:'btn'}, '+' ), 'click', priorityUp )
                  controller.add( view.add( task, 'button',{class:'btn'}, '-' ), 'click', priorityDown )
                  controller.add( view.add( task, 'button',{class:'btn'}, 'x' ), 'click', deleteTask )
                  if( item.done ){
                    view.attr( label, {'style': 'text-decoration: line-through' } )
                    check.checked = true
                  }

                }
              },
              updateList = function(){
                const list = view.get('list')
                for( let element of list ){ // collection current items
                  list.removeChild( item )
                }
              },
              add = function(event){

                if( view.get('task').value === '' || view.get('priority').value === '' ) return

                model.data.list.push({
                    id : taskId(),
                    task : view.get('task').value,
                    priority : parseInt(view.get('priority').value),
                    done : false
                  })
                  view.get('task').value = ''
                  view.get('priority').value = ''
                  buildList()
              },
              taskId = function(){
                const id = utils.getRandomInt(100, 999)
                for( let item in model.data.list ) if( item.id === id ) return taskId()
                return id
              },
              done = function( event ){
                for( let item in model.data.list ){
                  if( parseInt(event.target.parentElement.id) === model.data.list[ item ].id ){
                    model.data.list[item].done ? model.data.list[ item ].done = false : model.data.list[ item ].done = true
                  }
                }
                buildList()
              },
              deleteTask = function( event ){

                let tmpList = []

                for( let item in model.data.list ){
                  if( !(parseInt(event.target.parentElement.id) === model.data.list[ item ].id) ) {
                    tmpList.push( model.data.list[ item ] )
                  }
                }

                model.data.list = tmpList
                buildList()
              },
              priorityUp = function( event ){
                for( let item in model.data.list ){
                  if( parseInt(event.target.parentElement.id) === model.data.list[item].id ){
                    model.data.list[item].priority++
                  }
                }
                buildList()
              },
              priorityDown = function( event ){
                for( let item in model.data.list ){
                  if( parseInt(event.target.parentElement.id) === model.data.list[item].id ){
                    model.data.list[item].priority--
                  }
                }
                buildList()
              }

              controller.add( 'addTask', 'submit', add )
            }
            if( arguments[0] ) return module(utils.args( arguments,this.todoPriority))

            return{

              label : 'To do priority list',
              description : 'Create list with tasks with priority',
              module : module
            }
          }
//...........................................................................

  return {

    instantUpdate : instantUpdate,
    instantCount : instantCount,
    instantTransfer : instantTransfer,
    instantElement : instantElement,
    instantDimensions : instantDimensions,
    instantFilter : instantFilter,
    todoPriority : todoPriority
  }

})()
