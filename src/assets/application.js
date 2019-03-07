

/*
const example = (function(){

  const main = view.element('div#main')
  const mainNav = view.element('ul#mainNav')
//...........................................................................
  const exampleModuleOne = () => {
    model.data['exampleModuleOneData'] = []
    const main = (){
      view.set( main, 'This is main of exampleModuleOne')
    },
    second = (){
      view.set( main, 'This is second of exampleModuleOne')
    }
    return {
      label : 'Example Module One',
      default : main,
      main : main,
      second : second
    }
  },
//...........................................................................
  exampleModuleTwo = () => {
    const main = (){
      view.set( main, 'This is main of exampleModuleTwo')
    },
    second = (){
      view.set( main, 'This is second of exampleModuleTwo')
    }
    return {
      label : 'Example Module Two',
      default : main,
      main : main,
      second : second
    }
  }
//...........................................................................
  return {
    one : exampleModuleOne,
    two : exampleModuleTwo,
    main : main,
    mainNav : mainNav,
    default : exampleModuleOne
  }

});

application.init( example );
*/

const application = (function(){
  let applicationModule,applicationObj,main,mainNav,moduleNames,moduleFunctions,filePath;
  const load = () => {
    const route = location.hash.slice(1).split('/')
    if(route){
      route[1] ? application[route[0]]()[route[1]]() : application[route[0]].default()
    }else{
      application.default()
    }
  },
  nav = () => {
    for( let item of moduleNames){
      let navMenuItem = view.add( mainNav, "li",{ id : item })
      view.add( navMenuItem, "a", { href : `#${item}`}, application[ item ].label)
    }
    load()
  },
  init = ( application ) => {
    applicationModule = application;
    applicationObj = utils.obj(application);
    main = view.element(application.main);
    mainNav = view.element(application.mainNav);
    moduleNames = applicationObj.properties;
    moduleFunctions = applicationObj.values;
    nav()
  }
  window.onhashchange = load
  return { init : init }
})()
