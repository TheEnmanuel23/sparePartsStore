import page from 'page'
import firebase from 'firebase'
import config from '../../config'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database().ref('marcas')

page('/marcas/add', () => {
	let content = document.querySelector('#content')
  content.innerHTML = template()
})

function template () {
	return `
	<div class="col m10 offset-m1 s12">
    <h4 class="center-align">Agregar nueva marca</h4>
    <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input name="descripcion" id="descripcion" type="text" class="validate">
              <label for="descripcion">Descripción</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field file-field col s6">
             <div class="btn">
				        <span>Seleccionar imagen</span>
				        <input type="file">
				      </div>
				      <div class="file-path-wrapper">
				        <input class="file-path validate" type="text">
				      </div>
            </div>
          </div>
          <div class="row">
          	<div class="divider"></div>
          </div>
          <div class="row">
          	<a id="saveMarca" class="waves-effect waves-light btn">Guardar</a>
          </div>
        </form>
    </div>
  </div>
	`
}