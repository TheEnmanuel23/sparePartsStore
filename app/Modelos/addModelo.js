import page from 'page'
import firebase from 'firebase'
import config from '../../config'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const modelosRef = firebase.database().ref('modelos')

page('/modelos/add', () => {
	let content = document.querySelector('#content')
  content.innerHTML = template()

  let modeloImagen = document.querySelector('#modeloImagen')
  modeloImagen.addEventListener('change', selectImage, false)

  let btnSaveModelo = document.querySelector('#saveModelo')
  btnSaveModelo.addEventListener('click', saveModelo)

  loadMarcasForModelo()
})

var modeloImageSelected = null

function template () {
	return `
	<div class="col m10 offset-m1 s12">
    <h4 class="center-align">Agregar nuevo modelo</h4>
    <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input name="nombre" id="nombre" type="text" class="validate">
              <label for="nombre">Nombre</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field file-field col s6">
             <div class="btn">
				        <span>Seleccionar imagen</span>
				        <input id="modeloImagen" type="file">
				      </div>
				      <div class="file-path-wrapper">
				        <input class="file-path validate" type="text">
				      </div>
            </div>
          </div>
          <div class="row">
					    <div class="input-field col s6">
						    <select id="optionsMarcas">
						      <option value="" disabled selected>Cambiar de opción</option>
						    </select>
						    <label>Seleccionar marca</label>
					  </div>
          </div>
          <div class="row">
          	<div class="divider"></div>
          </div>
          <div class="row">
          	<a id="saveModelo" class="waves-effect waves-light btn">Guardar</a>
          </div>
        </form>
    </div>
  </div>
	`
}

function selectImage (e) {
	let target = e.target
  modeloImageSelected = target.files[0]
}

function saveModelo (e) {
	e.preventDefault()

	let optionsMarcas = document.querySelector('#optionsMarcas')
	let idMarca = optionsMarcas.options[optionsMarcas.selectedIndex].value

	if (!idMarca) return alert('Seleccione un marca!')

	if (!modeloImageSelected || !modeloImageSelected.name) {
		saveWithoutImage(idMarca)
	} else {
		saveWithImage(idMarca)
	}	
}

function saveWithImage (idMarca) {
	let storageRef = firebase.storage().ref()
  let thisRef = storageRef.child(modeloImageSelected.name);

	thisRef.put(modeloImageSelected)
	.then((snapshot) => {
 	 	return snapshot.downloadURL
	})
	.then(imgURL => {
		modelosRef.push({
			nombre: document.querySelector('#nombre').value,
			img: imgURL,
			idMarca: idMarca
		})
		Materialize.toast('Modelo guardado!', 3000, 'rounded')
		page.redirect('/modelos/add')
	})
		.catch(err => console.error(err))
}

function saveWithoutImage (idMarca) {
	modelosRef.push({
		nombre: document.querySelector('#nombre').value,
		img: "",
		idMarca: idMarca
	})
	Materialize.toast('Modelo guardado!', 3000, 'rounded')
	page.redirect('/modelos/add')
}

function loadMarcasForModelo () {
	firebase.database().ref('marcas').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let options = '<option value="" disabled selected>Seleccionar marca</option>'
		keys.map(key => {
			options += `<option value=${key}>${store[key].descripcion}</option>`
		})

		let optionsMarcas = document.querySelector('#optionsMarcas')
		optionsMarcas.innerHTML = options
		$('#optionsMarcas').material_select();
	})
}