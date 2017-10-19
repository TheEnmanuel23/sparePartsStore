const menu = `
    <ul class="hide-on-med-and-down">
      <li><a href="/">Inicio</a></li>
  		<li class="right"><a class="dropdown-button" href="#!" data-activates="dropdown1"><i class="icon-shopping-car mi mi-shopping-cart"></i><i class="material-icons right">arrow_drop_down</i></a></li>
    </ul>
<ul id="dropdown1" class="dropdown-content">
  <li><a href="#!">Ver</a></li>
</ul>
`
let menuTop = document.querySelector('#menu-top')
menuTop.innerHTML = menu