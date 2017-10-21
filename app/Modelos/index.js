import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/marcas/:id', PreLoading, loadModelos, loadArticulos, loadInventario, (ctx, next) => {
  let html = template(ctx.modelos, ctx.articulos)
  let content = document.querySelector('#content')
  content.innerHTML = html

  $('.collapsible').collapsible()
})

async function loadModelos (ctx, next) {
  try {
    let modelos = await db.ref('modelos').once('value').then(snapshot => {
      return snapshot.val()
    })

    let modelosPorMarca = []
    modelos.find(item => {
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
    let articulos = await db.ref('articulos').once('value').then(snapshot => {
      return snapshot.val()
    })

    let articulosPorModelos = []

    articulos.find(art => {
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
     let inventario = await db.ref('inventario').once('value').then(snapshot => {
      return snapshot.val()
    })

    let articulosPorInventario = []

    inventario.find(inv => {
      let articulo = ctx.articulos.find(art => {
        return art.id == inv.idArticulo
      })

      if (articulo) {
        articulo.precio = inv.precio_venta
        articulo.nuevo = inv.nuevo
        articulosPorInventario.push(articulo)
      }
    })

    ctx.articulos = articulosPorInventario
    next()
  } catch (err) {
    console.log(err)
  }
}
