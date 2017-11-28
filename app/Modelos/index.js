import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'
import addEventClickToArticles from '../ArticleCard/addEventArticle'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/marcas/:id', PreLoading, loadModelos, loadArticulos, loadInventario, (ctx, next) => {
  let html = template(ctx.modelos, ctx.articulos)
  let content = document.querySelector('#content')
  content.innerHTML = html

  addEventClickToArticles(ctx.articulos)
  $('.collapsible').collapsible()
})

async function loadModelos (ctx, next) {
  try {
    let modelosObject = await db.ref('modelos').once('value').then(snapshot => {
      return snapshot.val()
    })

    let modelosArray = []
    let keys = Object.keys(modelosObject)
    keys.map(key => {
      let mod = modelosObject[key]
      mod.id = key
      modelosArray.push(mod)
    })

    let modelosPorMarca = []
    modelosArray.find(item => {
       if(item.idMarca == ctx.params.id) {
        modelosPorMarca.push(item)
       }
    })
    
    ctx.modelos = modelosPorMarca
    next()
  } catch (err) {
    console.log(err)
  }
}

async function loadArticulos (ctx, next) {
  try {
    let articulosObject = await db.ref('articulos').once('value').then(snapshot => {
      return snapshot.val()
    })

    let articulosPorModelos = []
    let articulosArray = []

    let keys = Object.keys(articulosObject)
    keys.map(key => {
      let art = articulosObject[key]
      art.id = key
      articulosArray.push(art)
    })

    articulosArray.find(art => {
      let modelo = ctx.modelos.find(mod => {
        return mod.id == art.idModelo
      })
      
      if(modelo) {
        articulosPorModelos.push(art)
       }
    })
    
    ctx.articulos = articulosPorModelos
    next()
  } catch (err) {
    console.log(err)
  }
}

async function loadInventario (ctx, next) {
  try {
     let inventarioObject = await db.ref('inventario').once('value').then(snapshot => {
      return snapshot.val()
    })

    let articulosPorInventario = []
    let inventarioArray = []

    let keys = Object.keys(inventarioObject)
    keys.map(key => {
      let invToAdd = inventarioObject[key]
      invToAdd.id = key
      inventarioArray.push(invToAdd)
    })

    inventarioArray.find(inv => {
      let articulo = ctx.articulos.find(art => {
        return art.id == inv.idArticulo
      })

      if (articulo) {
        articulo.precio = inv.precio_venta
        articulo.nuevo = inv.nuevo
        articulo.inventario = inv
        articulosPorInventario.push(articulo)
      }
    })

    ctx.articulos = articulosPorInventario
    next()
  } catch (err) {
    console.log(err)
  }
}
