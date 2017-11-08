import page from 'page'
import logo from '../logo.jpg'

const info = `
    <div class="row info-row">
      <div class="col s12">
        <div class="card-panel card-info">
          <div class="row">
            <div class="col s12 m8">
              <figure class="container-logo">
                <a href="/"><img class="logo" src=${logo} /></a>                
              </figure>
            </div>
            <div class="col s12 m4">
              <div class="row account-section">              
                <div class="right-align">
                  <div >
                    <ul>                 
                      <li style="cursor: pointer;" class="right">
                        <a id="dropdownAccount" class="dropdown-button" data-activates="loginDropdown">
                          <i class="material-icons">perm_identity</i>
                          <i class="material-icons right">arrow_drop_down</i>
                        </a>
                      </li>
                    </ul>
                    <ul id="loginDropdown" class="dropdown-content">
                      <li><a href="/login">Entrar</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row datos-contacto">
                <div class="row row-email">
                  <i class="dato-icon material-icons">email</i> <span class="dato">info@repuestosayerdis.com</span> 
                </div>
                <div class="row row-nums">
                  <i class="dato-icon material-icons">phone</i> <span class="dato"><strong>Tel:</strong> 2222-2222</span>
                  </br>
                  <i class="dato-icon material-icons">phone_android</i> <span class="dato"><strong>Mob:</strong> (505) + 87654321</span>
                </div>
                <div class="row row-direccion">
                  <i class="dato-icon material-icons">home</i> <span class="dato"><strong>Tienda física:</strong> Jinotepe, Carazo Nicaragua</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>`

const menu = `
    <ul class="hide-on-med-and-down" id="mainMenu">
    	<li class="right"><a class="dropdown-button" href="#!" data-activates="dropdown1">
	  		<i class="icon-shopping-car mi mi-shopping-cart"></i>
	  		<i class="material-icons right">arrow_drop_down</i></a>
  		</li>
     	<li class="right">    
     		<div class="center row container-browser-article">
       		<div class="col s12 " >
          	<div class="row search-article" id="topbarsearch">
	            	<div class="input-field col s6 s12 white-text">
	              <i class="white-text material-icons prefix">search</i>
	              <input class="input-search-article" type="text" placeholder="Buscar artículo" id="input-search-article" >
              </div>
            </div>
          </div>
        </div>          
    	</li>
      <li><a href="/">Inicio</a></li>
      <li><a href="/accesorios">Accesorios</a></li>
      <li><a href="/top">Top 10</a></li>
      <li><a href="/contacto">Contáctanos</a></li>
      <li id="menuMarca"><a href="/marcas/add">Agregar Marca</a></li>
      <li id="menuModel"><a href="/modelos/add">Agregar Modelo</a></li>
      <li id="menuArticulo"><a href="/article/add">Agregar Artículo</a></li>
    </ul>
<ul id="dropdown1" class="dropdown-content">
  <li><a href="/shoppingcar">Ver</a></li>
</ul>
`
let menuTop = document.querySelector('#menu-top')
let informacionContainer = document.querySelector('#informacion')

menuTop.innerHTML = menu
informacionContainer.innerHTML = info

let inputSearch = document.querySelector('#input-search-article')
inputSearch.addEventListener('keypress', (e) => {
	if (e.keyCode == 13) {
    let value = e.target.value
    
    if (!value) {
      return alert('El campo de búsqueda no debe estar vacío.')
    }

		page.redirect(`/search/${value}`);
	}
})
