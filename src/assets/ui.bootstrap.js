const bs = (function(){
  UI.addComponent({ components : [
    { fn : 'bsBtn', name : 'button', element : 'button', class : 'btn btn-' },
    { fn : 'bsAlert', name : 'alert', element : 'div', class : 'alert alert-', callback : (element)  => {
      setTimeout( () => element.parentElement.removeChild( element ), 5000 )
    } },

  ]})

})()
