import page from 'page'
import template from './template'

page('/shoppingcar',  () => {
	let content = document.querySelector('#content')

  let html = template()
  content.innerHTML = html

  let vaciarCarrito = document.querySelector('#vaciar-carrito')

  vaciarCarrito.addEventListener('click', () => {
  	document.Car.articles = []
  	window.location.reload()
  })
})

