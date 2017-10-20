const menu = `
    <ul class="hide-on-med-and-down">
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
	              <input class="input-search-article" type="text" placeholder="Buscar artículo" id="autocomplete-input" >
              </div>
            </div>
          </div>
        </div>          
    	</li>
      <li><a href="/">Inicio</a></li>  	
    </ul>
<ul id="dropdown1" class="dropdown-content">
  <li><a href="/shoppingcar">Ver</a></li>
</ul>
`
let menuTop = document.querySelector('#menu-top')
menuTop.innerHTML = menu