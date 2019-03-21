const exampleApplication = (() => {
  const config = {
    main : 'div#main',
    menu : 'ul#menu',
    default : 'main',
    api : 'localhost:8081/api',
    components : [
      { endpoint : 'products' },
      { endpoint : 'categories' }
     ]
  },
  //shorthands
  make = tool.make,
  obj = utils.obj,
  element = view.element,
  set = view.set,
  call = application.call,
  hook = application.hook,
  before = application.before,
  data = model.data,
  get = model.get,
  overview = (args) => call('UI','overviewTable',args);

  hook( 'UI', 'overviewTable' , () => {
    // hook function to any call instance of UI.overviewTable
    console.log('UI.overviewTable call hook')
  })

  before( 'UI', 'overviewTable' , () => {
    // before function to any call instance of UI.overviewTable
    console.log('UI.overviewTable call before')
  })

  //----------------------------------------------------------------------------

  const main = () => {

    // display product dummmy data
    const component = 'products',
          //getCategory = (id) => get( id,'categories'),
          //getProduct = (id) =>  get( id,'products'),

    // .........................................................................


    overviewProducts = () => overview({
      title : 'Products',
      component : component, // data model component
      controller : (event) => {
        // controller event ; addEventListener function added to overviewTable row click event
        console.log( get( event.target.parentElement.id, component ).description ) // display description in console
      },
      fields : {
        'Name' : (item) => make( [ 'a', { href : `${config.navMenuItemPrefix}${component}/view/${item.id}` },item.name ] ),
        'Price' : (item) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(item.price),
        'Category' : (item) => get( item.category_id, 'categories' ).name
      },
      callback : () => {
        console.log('overviewProducts is loaded')
      }
    }),

    // .........................................................................

    viewProduct = (id) =>{
      const viewProductElement = element('viewProduct'),
      product = obj(get(id,component))
      viewProductElement.id = `product_${id}`
      for( let value of product.properties ){
        if( element(`product_${value}`) ) element(`product_${value}`).innerHTML = get(id,component)[ value ]
      }
      element('productImg').attr('src',`img/${id}.jpg`)
      set( config.main, viewProductElement )
    }

    // .........................................................................

    return {
      label : 'Main',
      overview : overviewProducts,
      view : viewProduct,
      default : overviewProducts
    }
  }

  //----------------------------------------------------------------------------

  const secondary = () => {
    const overview = () =>{
      set(config.main,'')
    }

    return{
      label : 'Secondary',
      overview : overview,
      default : overview
    }
  }

  //----------------------------------------------------------------------------

  return {
    config : config,
    components : model.components,
    main : main,
    secondary : secondary
  }
})()

application.init( exampleApplication );
