import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/marcas/:id', PreLoading, loadModelos, loadArticulos, (ctx, next) => {
  let html = template(ctx.modelos, ctx.articulos)
  let content = document.querySelector('#content')
  content.innerHTML = html

  $('.collapsible').collapsible('open', 0)
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

