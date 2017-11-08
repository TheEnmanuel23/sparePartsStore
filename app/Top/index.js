import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/top', PreLoading, loadInventario, loadArticulos, (ctx, next) => {
  let content = document.querySelector('#content')

  let html = template(ctx.articulos)
  content.innerHTML = html
})

async function loadInventario (ctx, next) {
  try {
    let inventarioObject = await db.ref('inventario').once('value').then(snapshot => {
      return snapshot.val()
    })

    let inventarioArray = []
    let keys = Object.keys(inventarioObject)
    keys.map(key => {
      inventarioArray.push(inventarioObject[key])
    })

    ctx.inventario = inventarioArray
    next()

  } catch (err) {
    console.error(err)
  }
}

async function loadArticulos (ctx, next) {
  try {
    let articulos = []
    let allArticlesObject = await db.ref('articulos').once('value').then(snapshot => {
      return snapshot.val()
    })

    let allArticlesArray = []
    let keysArticles = Object.keys(allArticlesObject)
    keysArticles.map(key => {
      let art = allArticlesObject[key]
      art.id = key
      allArticlesArray.push(art)
    })

    for (let invIndex = 0; invIndex < ctx.inventario.length; invIndex ++) {
      let idArticulo = ctx.inventario[invIndex].idArticulo
      
      for (let i = 0; i < allArticlesArray.length; i++) {
        let articuloItem = allArticlesArray[i]
        if (articuloItem) {
          if (articuloItem.id == idArticulo) {
            articuloItem.inventario = ctx.inventario[invIndex]
            articulos.push(articuloItem)
          }
        }
      }
    }

    let top = articulos.sort((a, b) => b.inventario.cantidad_vendida-a.inventario.cantidad_vendida)

    ctx.articulos = top.slice(0, 10)
    next()
  } catch (err) {
    console.error(err)
  }
}