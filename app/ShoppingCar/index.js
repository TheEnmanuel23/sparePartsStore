import page from 'page'
import template from './template'

page('/shoppingcar',  () => {
	let content = document.querySelector('#content')

  let html = template()
  content.innerHTML = html

  let vaciarCarrito = document.querySelector('#vaciar-carrito')

  vaciarCarrito.addEventListener('click', () => {
  	if (confirm('¿Está seguro de vaciar el carrito?') ==  true) {
  		document.Car.articles = []
  		page.redirect('/shoppingcar')
  	}  	
  })
})

