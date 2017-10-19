import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import loadMarcas from '../Marcas'
import template from './template'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/', preLoading, loadMarcas, loadData, (ctx, next) => {
  let menu = document.querySelector('#menu')
  let content = document.querySelector('#content')

  let html = template(ctx.data)
  menu.innerHTML = ctx.marcas
  content.innerHTML = html
})

function preLoading (ctx, next) {
  let loading = `
  <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`

  let content = document.querySelector('#content')
  content.innerHTML = loading
  next()
}

async function loadData (ctx, next) {
  try {
    let inventario = await db.ref('inventario').orderByChild('nuevo').equalTo(true).once('value').then(snapshot => {
      return snapshot.val()
    })

    let articulos = []

    for (let item = 0; item < inventario.length; item ++) {
      let idArticulo = inventario[item].idArticulo

      await db.ref('articulos').orderByChild('id').equalTo(idArticulo).once('value').then(arts => {
        let arrayData = arts.val()

        for (let i = 0; i < arrayData.length; i++) {
          if (arrayData[i]) {
            let articuloItem = arrayData[i]
            articuloItem.nuevo = inventario[item].nuevo
            articuloItem.precio = inventario[item].precio_venta
            articulos.push(articuloItem)
          }
        }
      }) 
    }

    ctx.data = articulos
    next()

  } catch (err) {
    console.error(err)
  }
}
