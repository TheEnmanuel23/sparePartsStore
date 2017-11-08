let newMenu = `
  <li id="menuMarca"><a href="/marcas/add">Agregar Marca</a></li>
  <li id="menuModel"><a href="/modelos/add">Agregar Modelo</a></li>
  <li id="menuArticulo"><a href="/article/add">Agregar Artículo</a></li>
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