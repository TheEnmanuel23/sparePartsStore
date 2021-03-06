import logo from '../logo.jpg'
import paypal from './paypal.png'

const footer = `
<div class="container">
	<div class="row">
		<div class="col l6 s12"">
			 <figure class="container-logo">
        <a href="/"><img class="logo" src=${logo} /></a>                
      </figure>
		</div>
		<div class="col l4 offset-l2 s12">
			<p>VENTA DE REPUESTOS PARA MÓBILES, SMARTPHONES, TABLETS, PC Y CONSOLAS</p>
			<p><i>Disponemos de repuestos de pantallas, displays, carcasas, baterías, cargadores...</li></p>
      <p>
        <strong>Opción de pago con</strong>
        <br>
        <br>
        <a class="btn-flat" target="_blank" href="https://www.paypal.com/ni/webapps/mpp/home?gclid=EAIaIQobChMInreamq7n1wIVERuBCh0PUQl4EAAYASAAEgJhfvD_BwE&dclid=CLCYs5uu59cCFZJThgodhlEArw" >
          <img style="width: 150px;" src=${paypal}/>
        </a>
      </p>
		</div>
	</div>
  <div class="row">
    <div class="col l3 s12">
      <h5 class="white-text">Información</h5>
      <ul>
        <li><a class="grey-text text-lighten-3" href="#!">Condiciones Generales</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Política de privacidad</a></li>
      </ul>
    </div>
    <div class="col l3 s12">
      <h5 class="white-text">Servicio al cliente</h5>
      <ul>
        <li><a class="grey-text text-lighten-3" href="/contacto">Contacto</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Tarifa de compra</a></li>
      </ul>
    </div>
    <div class="col l3 s12">
      <h5 class="white-text">Extra</h5>
      <ul>
      </ul>
    </div>
    <div class="col l3 s12">
      <h5 class="white-text">Mi cuenta</h5>
      <ul>
        <li><a class="grey-text text-lighten-3" href="#!">Mis datos personales</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Mis vales</a></li>
      </ul>
    </div>
  </div>
</div>
<div class="footer-copyright">
  <div class="container">
  © 2017 Todos los derechos reservados, Repuestos Ayerdis | Precios con IVA incluidos
  </div>
</div>`

const footerContainer = document.querySelector('.page-footer')

footerContainer.innerHTML = footer