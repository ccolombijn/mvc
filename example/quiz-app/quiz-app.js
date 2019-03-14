'use strict'
const quizApp = (function(){
  const config = {
    main : 'main#main',
    menu : 'ul#menu',
    default : 'start'
  }
  const call = application.call;

  //----------------------------------------------------------------------------
  const start = () => {


    //model.apiRequest({component:'items'})
    model.data['items'] = [
      { id : 0, name : 'example #0', category: 2 },
      { id : 1, name : 'example #1', category: 0 },
      { id : 2, name : 'example #2', category: 1 },
      { id : 3, name : 'example #3', category: 1 },
      { id : 4, name : 'example #4', category: 2 },
      { id : 5, name : 'example #5', category: 0 },
      { id : 6, name : 'example #6', category: 1 }
    ]
    //model.apiRequest({component:'category'})
    model.data['category'] = [
      {id : 0, category : 'category #1'},
      {id : 1, category : 'category #2'},
      {id : 2, category : 'category #3'}
    ]

    const getCategory = (id) => {
      for( let category of model.data.category ){
        if( id === category.id ) return category
      }
    }

    // .........................................................................

    const overview = () => call('UI','overview',{
      component : 'items',
      controller : (event) => {
        console.log(`row #${event.target.parentElement.id} clicked`)
      },
      fields : {
        'Name' : (item) => item.name,
        'Category' : (item) => getCategory( item.category ).category
      }
    });

  // .........................................................................

    return {
      label : 'Start',
      overview : overview,
      default : overview
    }
  }

  return {
    config : config,
    start : start
  }

})()
application.init( exampleApplication );
