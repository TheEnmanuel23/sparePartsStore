import page from 'page'

page('/modelos/add', () => {
	let content = document.querySelector('#content')
  content.innerHTML = '<h1>Agregar modelo</h1>'
})