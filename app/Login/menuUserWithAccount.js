const newMenu = `  <li><a href="/miscompras">Mis compras</a></li>`

const menuUserAccount = () => {
	let div = document.createElement('div')
	div.setAttribute('id', 'userAccountMenu')
	div.innerHTML = newMenu

	let mainMenu = document.querySelector('#mainMenu')
	mainMenu.appendChild(div)
}

export default menuUserAccount