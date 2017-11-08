import page from 'page'

page('/article/add', () => {
	let content = document.querySelector('#content')
  content.innerHTML = '<h1>Agregar articulo</h1>'
})