import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'
import addShoppingCar from './addShoppingCar'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/article/:id', PreLoading, loadArticle, loadInventario, loadModelo, loadMarca, (ctx, next) => {
	let html = template(ctx.articulo)
  let content = document.querySelector('#content')
  content.innerHTML = html

  let btnAddToCar = document.querySelector('#addToCard')
  let cantidad = document.querySelector('#cantArticle')
	btnAddToCar.addEventListener('click', function (e) {
		addShoppingCar(ctx.articulo, cantidad.value)
	})
})

async function loadArticle (ctx, next) {
	try {
		let articulos = await db.ref('articulos').once('value').then(snapshot => {
	    return snapshot.val()
	  })

		let articulo = articulos.find(art => {
			return art.id == ctx.params.id
		})

		ctx.articulo = articulo
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

		let articuloInventario = inventario.find(inv => {
			return inv.idArticulo == ctx.params.id
		})

		ctx.articulo.inventario = articuloInventario
		next()	
	} catch (err) {
		console.log(err)
	}
}

async function loadModelo (ctx, next) {
	try {
    let modelos = await db.ref('modelos').once('value').then(snapshot => {
      return snapshot.val()
    })

    let modelo = modelos.find(item => {
       return item.id == ctx.articulo.idModelo
    })
    
    ctx.articulo.modelo = modelo
    next()
  } catch (err) {
    console.log(err)
  }
}

async function loadMarca (ctx, next) {
	try {
    let marcas = await db.ref('marcas').once('value').then(snapshot => {
      return snapshot.val()
    })

    let marca = marcas.find(item => {
       return item.id == ctx.articulo.modelo.idMarca
    })
    
    ctx.articulo.modelo.marca = marca
    next()
  } catch (err) {
    console.log(err)
  }
}