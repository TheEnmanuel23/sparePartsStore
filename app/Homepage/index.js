import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'
import addEventClickToArticles from '../ArticleCard/addEventArticle'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/', PreLoading, loadInventario, loadArticulos, (ctx, next) => {
  let content = document.querySelector('#content')

  let html = template(ctx.articulos)
  content.innerHTML = html
  addEventClickToArticles(ctx.articulos)
})

async function loadInventario (ctx, next) {
  try {
    let inventario = await db.ref('inventario').once('value').then(snapshot => {
      return snapshot.val()
    })

    let keys = Object.keys(inventario)
    let inventarioArray = []

    keys.map(key => {
      inventarioArray.push(inventario[key])
    })

    ctx.inventario = inventarioArray.filter(item => item.nuevo == true)
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

      let keysArticle = Object.keys(allArticles)

      keysArticle.map(key => {
        let articuloItem = allArticles[key]

        if (articuloItem) {
          if (key == idArticulo && articuloItem.tipo.id == 1) {
            articuloItem.id = key
            articuloItem.nuevo = ctx.inventario[invIndex].nuevo
            articuloItem.precio = ctx.inventario[invIndex].precio_venta
            articuloItem.inventario = ctx.inventario[invIndex]
            articulos.push(articuloItem)
          }
        }
      }) 
    }
    console.log(articulos)
    ctx.articulos = articulos
    next()
  } catch (err) {
    console.error(err)
  }
}