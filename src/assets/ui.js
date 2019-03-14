'use strict'
const UI = (() => {

  const make = tool.make
  const set = view.set
  const add = view.add
  return {

  //...........................................................................

    overview : (args) => {
      const overviewTable = make( [
        'table', { id : `overview_table_${args.component}`}
      ] ),
      overviewHeader = make( [ 'thead' ] ),
      overviewHeaderRow = make( [ 'tr' ] ),
      overviewBody = make( [ 'tbody' ] ),
      overviewTitle = make( [ 'h2', `${args.model.length} items` ] );

      args.fields = utils.obj(args.fields);
      for( let header of args.fields.properties) set( overviewHeaderRow, make( [ 'th', header ]) );
      set( overviewTable,
        set( overviewHeader, overviewHeaderRow )
      );

      for( let entry of args.model ){
        let overviewRow = make( [ 'tr', { id : entry.id } ] );
        if( args.controller ) controller.add(overviewRow,'click',args.controller)
        for( let item of args.fields.values){
          let overviewRowField = make( [ 'td'] )
          add( overviewRow,
            set( overviewRowField, item(entry) )
          );
        }
        add( overviewBody, overviewRow )
      }

      set( args.target, '')
      set( args.target, overviewTitle )
      set( args.target,
        set( overviewTable, overviewBody )
      )
    },

  //...........................................................................

    add : () => {},
  //...........................................................................

    edit : () =>{},
    remove : () =>{}
  }
})()
window['UI'] = UI
