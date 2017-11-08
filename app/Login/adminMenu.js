let newMenu = `
  <li id="menuMarca"><a href="/contacto">Agregar Marca</a></li>
  <li id="menuModel"><a href="/contacto">Agregar Modelo</a></li>
  <li id="menuArticulo"><a href="/contacto">Agregar Artículo</a></li>
`
const addAdminMenu = () => {
	let div = document.createElement('div')
	div.setAttribute('id', 'adminMenu')
	div.innerHTML = newMenu

	let mainMenu = document.querySelector('#mainMenu')
	mainMenu.appendChild(div)
}

const removeAdminMenu = () => {
	let adminMenu = document.querySelector('#adminMenu')

	let mainMenu = document.querySelector('#mainMenu')
	mainMenu.removeChild(adminMenu)
}

export { addAdminMenu, removeAdminMenu }