import page from 'page'
import firebase from 'firebase'
import config from '../../config'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const marcasRef = firebase.database().ref('marcas')

page('/marcas/add', () => {
	let content = document.querySelector('#content')
  content.innerHTML = template()

  let marcaImage = document.querySelector('#marcaImage')
  marcaImage.addEventListener('change', selectImage, false)

  let btnSaveMarca = document.querySelector('#saveMarca')
  btnSaveMarca.addEventListener('click', saveMarca)
})

var marcaImageSelected = null

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
				        <input id="marcaImage" type="file">
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

function selectImage (e) {
	let target = e.target
  marcaImageSelected = target.files[0]
}

function saveMarca (e) {
	e.preventDefault()	
	var storageRef = firebase.storage().ref()
  var thisRef = storageRef.child(marcaImageSelected.name);

	thisRef.put(marcaImageSelected)
	.then((snapshot) => {
 	 	return snapshot.downloadURL
	})
	.then(imgURL => {
		marcasRef.push({
			descripcion: document.querySelector('#descripcion').value,
			img: imgURL
		})
		Materialize.toast('Marca guardada!', 3000, 'rounded')
		page.redirect('/')
	})
	.catch(err => console.error(err))
}