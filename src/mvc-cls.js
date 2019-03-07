// -----------------------------------------------------------------------------
// model
// const model = new Model;
class Model {

  constructor(data) {
    if (!data) data = {};
    if (typeof data != "object")
      throw "data is not a object";
      return;

    this._data = data;
    this._components = [];
  }
  obj( obj ){
    return {
      properties : Object.getOwnPropertyNames(obj),
      values : Object.values(obj)
    }
  }
  component( component ){ //controller component
    if( component.id ) component = component.id;
    return this._data[component];
  }
  response( event, args ){

  }
  // model.apiRequest({ 'component' : 'value' })
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
  set add(data) {
    for (let item in obj(data).properties)
      this.components.push(obj(data).properties[item])
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
  get components() {
    return this.components;
  }
}

// -----------------------------------------------------------------------------
// view
// const view = new View( model )
class View {
  constructor(model) {
    this.elements = [];
    this.components = [];
    this.model = model;
  }
  // view.DOM( 'element' )
  DOM(selector) {
    let element;
    try {
      if (document) {
        const hasHash = selector.contains("#");
        const hasDot = selector.contains(".");

        if (hasHash || hasDot) {
          element = hasDot
            ? document.querySelectorAll(selector)
            : document.querySelector(selector);
        } else {
          element = document.getElementsByClassName(selector);
          if (!element) element = document.getElementById(selector);
          if (!element) element = document.createElement(selector);
        }
      }
    } catch (e) {
      /*element = {
        innerHTML: undefined,
        className: undefined,
        id: undefined,
        appendChild: element => {
          this.elements.push({ id: element.id, element: element });
        },
        createTextNode: txt => {

        }
      };*/
    } finally {
      return element;
    }
  }
  // view.get( 'element' )
  get(id) {
    for (let item of this.elements) {
      if (item.id === id) {
        return item.element;
      }
    }
  }
  // view.element( 'element' )
  element(element) {
    if (get(element)) return get(element);
    if (typeof element === "string") element = DOM(element);
    if (!element["id"]) element["id"] = `el_${this.elements.length + 1}`;
    this.elements.push({ id: element.id, element: element });
    return element;
  }
  // view.set( 'element','content' )
  set(_element, content) {
    if (typeof content === "object") content = content.innerHTML;
    get(_element) ? (_element = get(_element)) : (_element = element(_element));
    _element.innerHTML = content;
  }
  // view.txt( 'element','content' )
  txt(_element, txt) {
    get(_element) ? (_element = get(_element)) : (_element = element(_element));
    txt = document.createTextNode(txt);
    _element.appendChild(txt);
  }
  // view.attr( 'element',{ attribute : 'value' } )
  attr(element, attributes) {
    if( typeof attributes === 'object'){
      const model = this._model;
      const obj = model.obj(attributes);
      const props = obj.properties;
      const vals = obj.values;
      for (let attribute in props) {
        element.setAttribute(
          props[attribute],
          vals[attribute]
        );
      }
      return element;
    } else if (typeof attributes === 'array') {
      const tmp = {};
      for( let item of attributes ) tmp[ item ] = element.getAttribute( item )
      return obj
    } else if (typeof attributes === 'string'){
      return element.getAttribute( )
    }

  }
  // view.add( 'parentElement','childElement'[,{ attribute : 'value' }],'content' )
  add(parent, _element, attrs, cont) {
    if (typeof parent === "string")
      get(parent) ? (parent = get(parent)) : (parent = element(parent));
    if (typeof _element === "string") elmt = element(_element);
    if (typeof attrs === "object") _element = attr(_element, attrs);
    if (typeof attrs === "string") cont = attrs;
    if (content) set(_element, cont);
    parent.appendChild(_element);
    return _element;
  }
  get components() {
    return this.components;
  }
}

// -----------------------------------------------------------------------------
// controller
// const controller = new Controller( view, model )
class Controller {
  constructor(view, model) {
    this.actions = [];
    this.view = view;
    this.model = model;
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
    if (typeof element === "string") element = this.view.element(element);
    element.addEventListener(action, event => {
      event.preventDefault();
      event.stopPropagation();
      receptor(event);
      callback(event);
    });
  }
}
