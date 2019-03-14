const exampleApplication = (() => {
  const config = {
    main : 'main#main',
    menu : 'nav#menu'
  }
  model.data['items'] = [
    { id : 0, name : 'example #0', category: 2 },
    { id : 1, name : 'example #1', category: 0 },
    { id : 2, name : 'example #2', category: 1 },
    { id : 3, name : 'example #3', category: 1 },
    { id : 4, name : 'example #4', category: 2 },
    { id : 5, name : 'example #5', category: 0 },
    { id : 6, name : 'example #6', category: 1 }

  ]
  model.data['category'] = [
    {id : 0, category : 'category #1'},
    {id : 1, category : 'category #2'},
    {id : 2, category : 'category #3'}


  ]
  const main = () => {
    const getCategory = (id) => {
      for( let category of model.data.category ){
        if( id === category.id ) return category
      }
    }/*
    const overview = () => application.call('UI','overview',{
      component : 'items',
      fields : {
        'Name' : (item) => item.name,
        'Category' : (item) => getCategory( item.category )
      }
    });
    */

    const overview = () => console.log('overview')
    return {
      label : 'Main',
      overview : overview,
      default : overview
    }
  }
  const secondary = () => {
    const overview = () => application.call('UI','overview',{

    })


    return{
      label : 'Secondary',
      overview : overview,
      default : overview
    }
  }
  return {
    config : config,
    main : main,
    default : main
  }
})()
application.init( exampleApplication );
