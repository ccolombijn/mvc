// -----------------------------------------------------------------------------
// model
// const model = new Model;
class Model {

  constructor(data) {
    if (!data) data = {};
    if (typeof data != "object") {
      throw "data is not a object";
      return;
    }
    this._data = data;
    this._components = [];
  }
  obj( obj ){
    return {
      properties : Object.getOwnPropertyNames(obj),
      values : Object.values(obj)
    }
  }
  component( component ){
    if( component.id ) component = component.id;
    return this._data[component];
  }

  // model.apiRequest({ 'component' : 'route' })
  apiRequest( args, callback ){
    let xhr = new XMLHttpRequest()
    if( !args ) args = {}
    if( !args.type ) args[ 'type' ] = 'GET'
    if( !args.status ) args[ 'status' ] = 200
    if( !callback ) callback = response;
    xhr.addEventListener( 'load',  ( event ) => {
      if ( xhr.readyState === 4 && xhr.status === args.status ) {
        this._data[args.component] = JSON.parse(event.target.responseText)
        callback( event, args )
      }
    })
    xhr.open( args.type, `api/${args.component}`, true )
    xhr.send( args.data )
  }
  // model.add({ 'component' : 'value' })
  add(data) {
    const obj = (obj) => {
      return {
        properties : Object.getOwnPropertyNames(obj),
        values : Object.values(obj)
      }
    }
    console.log(obj(data))
    for (let item in obj(data).properties)

      //this._components.push(obj(data).properties[item])
      this._data[obj(data).properties[item]] = obj(data).values[item];
  }
  // model.update({ 'component' : 'value' })
  set update(data) {
    for (let item in this._data) {

    }
  }
  get get() {
    return this._data;
  }

}

// -----------------------------------------------------------------------------
// view
// const view = new View( model )
class View {
  constructor(model) {
    this._elements = [];
    this._components = [];
    this._model = model;
  }

  // get( 'element' )
  get(selector) {
    for (let item of this._elements) {
      if (item.selector === selector) {
        return item.element;
      }
    }
  }

  // view.this.element( 'element' )
  element(selector) {

    if (this.get(selector)) return this.get(selector);
    const create = (selector) => {

      let element;
      const hasHash = selector.includes("#");
      const hasDot = selector.includes(".");
      if(hasDot && hasHash){
      } else if (hasDot) {
        selector = selector.split(".")
      } else if (hasHash) {
        selector = selector.split("#");
      }
      selector.length>0 ? element = selector[0] : element = element;
      if(!element) element = "div"
      element = $(`<${element}></${element}>`)
      if (hasDot) element.addClass(selector[1])
      if (hasHash) element.attr("id",selector[1])
      return element;
    }

    element = $( selector );
    if(!element) element = create(selector);
    this._elements.push({ selector: selector, element: element });
    return element;
  }

  // view.set( 'element','content' )
  set(element, content) {

    if (typeof content === "object") content = content.html();
    element= this.element(element);
    element.html( content );
  }
  // view.txt( 'element','content' )
  txt(element, txt) {
    element= this.element(element).txt(txt);
  }

  attr(element, attributes) {
    if( typeof attributes === 'object'){ // attr( 'element',{ attribute : 'value' } )
      const props = Object.getOwnPropertyNames(attributes),
            vals = Object.values(attributes);

      for (let attribute in props) {
        element.attr(props[attribute],vals[attribute]);
      }
      return element;
    } else if (typeof attributes === 'array') {// attr( 'element',['id','class'] )
      const obj = {};
      for( let item of attributes ) obj[ item ] = element.attr( item )
      return obj
    } else if (typeof attributes === 'string'){// attr( 'element','attr' )
      return element.attr( attributes )
    }

  }
  // add( 'parentElement','childElement'[,{ attribute : 'value' }],'content' )
  add(parent, element, attributes, content) {
    if (typeof parent === "string")
      parent = this.element(parent);

    if (typeof element === "string") element= this.element(element);
    if (typeof attributes === "object") element= this.attr(element, attributes);
    if (typeof attributes === "string") content = attributes;
    if (content) this.set(element, content);
    //parent.appendChild(element);
    parent.append(element)
    return element;
  }
  get components() {
    return this._components;
  }
}

// -----------------------------------------------------------------------------
// controller
// const controller = new Controller( view, model )
class Controller {
  constructor(view, model) {
    this.actions = [];
    this.view = view;
    this._model = model;
  }
  receptor(event) {
    const component = event.target.id; // id of element added to controller acts as trigger to component to receptor
    for (let action of this.actions) {
      if (action.component === component) action.do();
    }
  }
  // attach function to component of element; will be called by receptor() in add()
  // controller.component( 'element', 'event',function(){} )
  component(element, event, action) {
    this.actions.push({ component: element.id, event : event, do: action });
  }
  // add event to element
  // controller.add( 'element', 'event', callbackFunctionName )
  add(element, action, callback) {
    if (typeof element === "string") element = this.view.this.element(element);
    element.addEventListener(action, event => {
      event.preventDefault();
      event.stopPropagation();
      receptor(event);
      callback(event);
    });
  }
}
