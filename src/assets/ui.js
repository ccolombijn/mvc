'use strict'

const UI = (() => {

  const _ = tool
  const element = {},
  overview = (args) => {
    const overviewTable = _.make( [
      'table', { id : `overview_table_${args.module}`}
    ] ),
    overviewHeader = _.make( [ 'thead' ] ),
    overviewHeaderRow = _.make( [ 'tr' ] ),
    overviewBody = _.make( [ 'tbody' ] ),
    overviewTitle = _.make( [ 'h2', `${args.model.length} items` ] );
    args.columns = utils.obj(args.columns);
    for( let header of args.columns.properties) {
      view.set( overviewHeaderRow, _.make( [ 'th', header ]) );
    }
    view.set( overviewHeader, overviewHeaderRow );
    view.set( overviewTable, overviewHeader );
    for( let entry of args.model ){
      let overviewRow = _.make( [ 'tr' ] );
      for( let item of args.columns.values){
        let overviewRowField = _.make( [ 'td'] )
        view.set( overviewRowField, item(entry) )
        view.set( overviewRow, overviewRowField )
      }
      view.set( overviewBody, overviewRow )
    }
    view.set( overviewTable, overviewBody )
    view.set( args.target, overviewTable )

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
    add : add,
    edit : edit,
    remove : remove
  }
})()
window['UI'] = UI