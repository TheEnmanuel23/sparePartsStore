const menu = `
<nav class="grey lighten-3 menu">
  <div class="nav-wrapper">
    <ul class="hide-on-med-and-down">
      <li><a href="/">Inicio</a></li>
      <li><a href="/marcas">Buscar</a></li>
  		<li class="right"><a class="dropdown-button" href="#!" data-activates="dropdown1"><i class="icon-shopping-car mi mi-shopping-cart"></i><i class="material-icons right">arrow_drop_down</i></a></li>
    </ul>
  </div>
</nav>
<ul id="dropdown1" class="dropdown-content">
  <li><a href="#!">Ver</a></li>
</ul>
`
let header = document.querySelector('header')
header.innerHTML = menu