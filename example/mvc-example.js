

const example = (() => {
  const element = view.element,
  add = view.add,
  set = view.set,
  obj = utils.obj
  main = element("main#example"),

//...........................................................................
  exampleModuleNames = obj(examples).properties,
  exampleModuleFunctions = obj(examples).values,
//...........................................................................
  moduleSelect = element("moduleSelect")
  let current

  for(let item in exampleModuleNames){
    let moduleName = exampleModuleNames[item];
    add(moduleSelect, "option",{ value : exampleModuleNames[item] },exampleModuleNames[item])

  }
  controller.add( moduleSelect, "change", (event) => {
    element(`#example_${current}`).innerHTML = element("#exampleShow").innerHTML
    runExample( event.target.value )
  })
  exampleOverview = () => {

    set(main, "");
    for( let module in exampleModuleNames ){

      let moduleName = exampleModuleNames[module],
      moduleElement = view.add(main,"div",{ id : moduleName, class : 'exampleElem' })

      add(
        moduleElement,
        "h2",
        `${exampleModuleFunctions[module]().label} - ${moduleName}(${utils.params(examples[moduleName]).join(',')})`
      )
      add(moduleElement, "hr","")
      add(moduleElement, "p", {class:"lead"},exampleModuleFunctions[module]().description)
      let moduleExample = add(moduleElement,"pre", { class : "code" } )
        .innerHTML = utils.format(exampleModuleFunctions[module]().module.toString())

      controller.add(
        add(
          moduleElement,
          "button",
          { class : 'btn btn-primary btn-lg'},
          `Run Example`
        ),
        "click",
        () => runExample(moduleName)
      )
    }
  },
  //...........................................................................
    runExample = (example) => {
      current = example;
      window.scrollTo(0, 0);
      const module = examples[example],
      exampleElems = element('#examples'),
      exampleElem = element(`#example_${example}`),
      exampleElemHTML = exampleElem.innerHTML,
      args = {};

      main.innerHTML = exampleElemHTML;
      main.innerHTML = ""
      add(main,"h2",module().label)
      add(main, "hr","")
      add(main, "p",module().description)
      let overviewBtn = add( main,"button",{ class : 'btn btn-primary'},"Back to Overview")
      add(main,"div",{ id : "exampleShow",class : "example" }).innerHTML = exampleElemHTML;

      add(main,"h3","Javascript")
      let code = add(main,"pre",{ class : "code" }).innerHTML = utils.format(module().module.toString())
      add(main,"h3","HTML")
      let html = add(main,"pre",{ class : "code" },exampleElemHTML)
      //let myCodeMirror = CodeMirror(code);
      exampleElem.innerHTML = "";
      for(let param of utils.params(module)){
        args[param] = `#${example}_${param}`
      }


      module().module(args)
      controller.add(
        overviewBtn,
        "click",
        () => {
          exampleElem.innerHTML = exampleElemHTML;
          exampleOverview()
        }

      )
    };
//...........................................................................
  return{
    overview : exampleOverview
  }
})();

example.overview();
