'use strict'
const application = (function(){
  let applicationModule,applicationObj,main,menu,moduleNames,moduleFunctions,filePath;
  const route = () => location.hash.slice(1).split('/'),
  load = (event) => {
    if( event ){ // event is only provided by window.hashchange, not on init

    }
    
    if(!route()[0] === ''){

      route()[1]
      ? applicationModule[route()[0]]()[route()[1]](route()[2])
      : applicationModule[route()[0]].default()
    }else{
      applicationModule.default()
    }
  },
  nav = () => {
    for( let item of moduleNames){
      if( applicationModule[ item ].label ){
        let menuItem = view.add( menu, "li",{ id : item })
        view.add( menuItem, "a", { href : `#${item}`}, applicationModule[ item ].label)
      }
    }
  },
  init = ( application ) => {
    applicationModule = application;
    applicationObj = utils.obj(application);
    main = view.element(applicationModule.config.main);
    menu = view.element(applicationModule.config.menu);
    moduleNames = applicationObj.properties;
    moduleFunctions = applicationObj.values;
    nav()
    load()
  },
  call = ( exc, fn, args ) => {
    let targetElement
    args.target
    ? targetElement = args.target
    : targetElement = applicationModule.config.main;
    window[exc][fn]({
      component : args.component,
      fields : args.fields,
      controllers : args.controllers,
      model : model.data[args.component],
      config : applicationModule.config,
      target : targetElement
    })
  }
  controller.add( window, "hashchange", (event) => load(event) );
  return {
    route : route,
    init : init,
    call : call
  }
})()
