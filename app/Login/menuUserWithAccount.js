const newMenu = `  <li><a href="/miscompras">Mis compras</a></li>`

const addMenuUserAccount = () => {
	let div = document.createElement('div')
	div.setAttribute('id', 'userAccountMenu')
	div.innerHTML = newMenu

	let mainMenu = document.querySelector('#mainMenu')
	mainMenu.appendChild(div)
}

const removemenuUserAccount= () => {
	let adminMenu = document.querySelector('#userAccountMenu')

	let mainMenu = document.querySelector('#mainMenu')
	mainMenu.removeChild(adminMenu)
}

export { addMenuUserAccount, removemenuUserAccount }