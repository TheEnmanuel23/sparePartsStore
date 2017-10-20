import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/search/:value', PreLoading, loadData, (ctx, next) => {
  let content = document.querySelector('#content')

  let html = template(ctx.data)
  content.innerHTML = html
})

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
            
            if (articuloItem.descripcion.toLowerCase().includes(ctx.params.value) || articuloItem.detalle.toLowerCase().includes(ctx.value)) {
            	articuloItem.nuevo = inventario[item].nuevo
	            articuloItem.precio = inventario[item].precio_venta
	            articulos.push(articuloItem)
            }
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
