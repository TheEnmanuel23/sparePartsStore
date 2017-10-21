import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/', PreLoading, loadInventario, loadArticulos, (ctx, next) => {
  let content = document.querySelector('#content')

  let html = template(ctx.articulos)
  content.innerHTML = html
})

async function loadInventario (ctx, next) {
  try {
    let inventario = await db.ref('inventario').once('value').then(snapshot => {
      return snapshot.val()
    })

    ctx.inventario = inventario.filter(item => item.nuevo)
    next()

  } catch (err) {
    console.error(err)
  }
}

async function loadArticulos (ctx, next) {
  try {
    let articulos = []
    let allArticles = await db.ref('articulos').once('value').then(snapshot => {
      return snapshot.val()
    })

    for (let invIndex = 0; invIndex < ctx.inventario.length; invIndex ++) {
      let idArticulo = ctx.inventario[invIndex].idArticulo
      
      for (let i = 0; i < allArticles.length; i++) {
        let articuloItem = allArticles[i]
        if (articuloItem) {
          if (articuloItem.id == idArticulo) {
            articuloItem.nuevo = ctx.inventario[invIndex].nuevo
            articuloItem.precio = ctx.inventario[invIndex].precio_venta
            articulos.push(articuloItem)
          }
        }
      }
    }

    ctx.articulos = articulos
    next()
  } catch (err) {
    console.error(err)
  }
}