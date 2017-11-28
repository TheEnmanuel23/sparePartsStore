let newMenu = `
  <li>
    <ul>                 
      <li style="cursor: pointer;" class="right">
        <a id="agregarDropdownButton" class="dropdown-button" data-activates="agregarDropdown">
          Agregar
          <i class="material-icons right">arrow_drop_down</i>
        </a>
      </li>
    </ul>
    <ul id="agregarDropdown" class="dropdown-content">
      <li><a href="/marcas/add">Marca</a></li>
      <li><a href="/modelos/add">Modelo</a></li>
      <li><a href="/article/add">Artículo</a></li>
    </ul>
  </li>
  <li>
  	 <ul>                 
      <li style="cursor: pointer;" class="right">
        <a id="verDropdownButton" class="dropdown-button" data-activates="verDropdown">
          Ver
          <i class="material-icons right">arrow_drop_down</i>
        </a>
      </li>
    </ul>
    <ul id="verDropdown" class="dropdown-content">
      <li><a href="/emails">Correos</a></li>
      <li><a href="/ventas">Ventas</a></li>
    </ul>
  </li>
`
const addAdminMenu = () => {
	let div = document.createElement('div')
	div.setAttribute('id', 'adminMenu')
	div.innerHTML = newMenu

	let mainMenu = document.querySelector('#mainMenu')
	mainMenu.appendChild(div)
	$('#agregarDropdownButton').dropdown()
	$('#verDropdownButton').dropdown()
}

const removeAdminMenu = () => {
	let adminMenu = document.querySelector('#adminMenu')

	let mainMenu = document.querySelector('#mainMenu')
	mainMenu.removeChild(adminMenu)
}

export { addAdminMenu, removeAdminMenu }