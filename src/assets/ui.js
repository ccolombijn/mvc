'use strict'
// BUG : UI can access model & controller but not view
console.log(model)
console.log(controller)
console.log(view)
const UI = (() => {

  const _ = tool
  const element = {},
  overview = (args) => {
    const overviewTable = _.make( [ 'table',
      { id : `overview_table_${args.module}`}
    ]),
    overviewHeader = _.make( [ 'thead' ] ),
    overviewHeaderRow = _.make( [ 'tr' ] ),
    overviewBody = _.make( [ 'tbody' ] ),
    overviewTitle = _.make( [ 'h2', `${model.length} items` ])

    args.columns = utils.obj(args.columns);
    for( let header of args.columns.properties) {
      overviewHeaderRow.appendChild( _.make( [ 'th', header ]) );
    }
    overviewHeader.appendChild( overviewHeaderRow );
    overviewTable.appendChild( overviewHeader );
    for( let entry of args.model ){
      let overviewRow = _.make( [ 'tr' ] );
      for( let item of args.columns.values){
        let overviewRowField = _.make( [ 'td'] )
        if( typeof item === 'function' ){
          typeof item(entry) === 'object'
          ? overviewRowField.append( item(entry) )
          : overviewRowField.innerHTML = item(entry);
        }else if (typeof item === 'string') {
          overviewRowField.innerHTML = item;
        }

        overviewRow.append( overviewRowField )
      }
      overviewBody.appendChild( overviewRow )
    }
    overviewTable.appendChild( overviewBody )
    controller.add( args.target,'click',()=>{})
    document.querySelector(args.target).appendChild(overviewTable )
    // view.set( args.target, overviewTable )

  },
  view = (args,callback) => {

  },
  add = (args,callback) => {

  },
  edit = (args,callback) => {

  },
  remove = (args,callback) => {

  }
  return {
    element : element,
    overview : overview,
    view : view,
    add : add,
    edit : edit,
    remove : remove
  }
})()
