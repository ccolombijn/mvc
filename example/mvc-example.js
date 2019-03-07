

const example = (() => {
  const main = view.element("main#example"),

//...........................................................................
  exampleModuleNames = utils.obj(examples).properties,
  exampleModuleFunctions = utils.obj(examples).values,
//...........................................................................
  exampleOverview = () => {

    view.set(main, "");
    for( let module in exampleModuleNames ){

      let moduleName = exampleModuleNames[module],
      moduleElement = view.add(main,"div",{ id : moduleName, class : 'exampleElem' })

      view.add(
        moduleElement,
        "h2",
        `${exampleModuleFunctions[module]().label} - ${moduleName}(${utils.params(examples[moduleName]).join(',')})`
      )
      view.add(moduleElement, "hr","")
      view.add(moduleElement, "p", {class:"lead"},exampleModuleFunctions[module]().description)
      let moduleExample = view.add(
        moduleElement,
        "pre", { class : "code" } )
        .innerHTML = utils.format(exampleModuleFunctions[module]().module.toString())
      //console.log(utils.occurence(exampleModuleFunctions[module]().module.toString(),'view.add'))
      //let myCodeMirror = CodeMirror(moduleExample);
      controller.add(
        view.add(
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

      window.scrollTo(0, 0);
      const module = examples[example],
      exampleElems = view.element('#examples'),
      exampleElem = view.element(`#example_${example}`),
      exampleElemHTML = exampleElem.innerHTML,
      args = {};

      main.innerHTML = exampleElemHTML;
      main.innerHTML = ""
      view.add(main,"h2",module().label)
      view.add(main, "hr","")
      view.add(main, "p",module().description)
      let overviewBtn = view.add( main,"button",{ class : 'btn btn-primary'},"Back to Overview")
      view.add(main,"div",{ class : "example" }).innerHTML = exampleElemHTML;

      view.add(main,"h3","Javascript")
      let code = view.add(main,"pre",{ class : "code" }).innerHTML = utils.format(module().module.toString())
      view.add(main,"h3","HTML")
      let html = view.add(main,"pre",{ class : "code" },exampleElemHTML)
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
