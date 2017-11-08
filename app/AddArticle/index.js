import page from 'page'
import firebase from 'firebase'
import config from '../../config'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const articulosRef = firebase.database().ref('articulos')

page('/article/add', () => {
	let content = document.querySelector('#content')
  content.innerHTML = template()

  let articuloImagen = document.querySelector('#articuloImagen')
  articuloImagen.addEventListener('change', selectImage, false)

  let btnSaveArticulo = document.querySelector('#saveArticulo')
  btnSaveArticulo.addEventListener('click', saveArticulo)

  loadModelosForArticulo()
})

var articuloImageSelected = null

function template () {
	return `
	<div class="col m10 offset-m1 s12">
    <h4 class="center-align">Agregar nuevo artículo</h4>
    <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input name="descripcion" id="descripcion" type="text" class="validate">
              <label for="descripcion">Descripcion</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="detalle" id="detalle" type="text" class="validate">
              <label for="detalle">Detalle</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field file-field col s6">
             <div class="btn">
				        <span>Seleccionar imagen</span>
				        <input id="articuloImagen" type="file">
				      </div>
				      <div class="file-path-wrapper">
				        <input class="file-path validate" type="text">
				      </div>
            </div>
          </div>
          <div class="row">
					    <div class="input-field col s6">
						    <select id="optionsModelos">
						      <option value="" disabled selected>Cambiar de opción</option>
						    </select>
						    <label>Seleccionar modelo</label>
					  </div>
          </div>
          <div class="row">
          	<div class="divider"></div>
          </div>
          <div class="row">
          	<a id="saveArticulo" class="waves-effect waves-light btn">Guardar</a>
          </div>
        </form>
    </div>
  </div>
	`
}

function selectImage (e) {
	let target = e.target
  articuloImageSelected = target.files[0]
}

function saveArticulo (e) {
	e.preventDefault()

	let optionsModelos = document.querySelector('#optionsModelos')
	let idModelo = optionsModelos.options[optionsModelos.selectedIndex].value

	if (!idModelo) return alert('Seleccione un modelo!')

	if (!articuloImageSelected || !articuloImageSelected.name) {
		alert('Seleccione una imagen!')
	} else {
		saveWithImage(idModelo)
	}	
}

function saveWithImage (idModelo) {
	let storageRef = firebase.storage().ref()
  let thisRef = storageRef.child(articuloImageSelected.name);

	thisRef.put(articuloImageSelected)
	.then((snapshot) => {
 	 	return snapshot.downloadURL
	})
	.then(imgURL => {
		articulosRef.push({
			descripcion: document.querySelector('#descripcion').value,
			detalle: document.querySelector('#detalle').value,
			img: imgURL,
			idModelo: idModelo,
			tipo : {
	      descripcion : "Repuesto",
	      id : 1
	    }
		})

		Materialize.toast('Artículo guardado!', 3000, 'rounded')
		page.redirect('/article/add')
	})
		.catch(err => console.error(err))
}

function loadModelosForArticulo () {
	firebase.database().ref('modelos').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let options = '<option value="" disabled selected>Seleccionar modelo</option>'
		keys.map(key => {
			options += `<option value=${key}>${store[key].nombre}</option>`
		})

		let optionsModelos = document.querySelector('#optionsModelos')
		optionsModelos.innerHTML = options
		$('#optionsModelos').material_select();
	})
}