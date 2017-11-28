import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'
import addShoppingCar from '../ShoppingCar/addShoppingCar'

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
		let allArticleObject = await db.ref('articulos').once('value').then(snapshot => {
	    return snapshot.val()
	  })

		let allArticleArray = []
		let keysArticle = Object.keys(allArticleObject)
		keysArticle.map(key => {
			let art = allArticleObject[key]
			art.id = key
			allArticleArray.push(art)
		})

		let articulo = allArticleArray.find(art => {
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
		let allInventarioObject = await db.ref('inventario').once('value').then(snapshot => {
	    return snapshot.val()
	  })

		let inventarioArray = []
		let keysInventario = Object.keys(allInventarioObject)
		keysInventario.map(key => {
			let invToAdd = allInventarioObject[key]
			invToAdd.id = key
			inventarioArray.push(invToAdd)
		})

		let articuloInventario = inventarioArray.find(inv => {
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
    let allModelosObject = await db.ref('modelos').once('value').then(snapshot => {
      return snapshot.val()
    })

    let modelosArray = []
    let keysModelos = Object.keys(allModelosObject)

    keysModelos.map(key => {
    	let mod = allModelosObject[key]
    	mod.id = key
    	modelosArray.push(mod)
    })

    let modelo = modelosArray.find(item => {
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
    let allMarcasObject = await db.ref('marcas').once('value').then(snapshot => {
      return snapshot.val()
    })

		let marcasArray = []
		let keysMarcas = Object.keys(allMarcasObject)
		keysMarcas.map(key => {
			let mar = allMarcasObject[key]
			mar.id = key
			marcasArray.push(mar)
		})

    let marca = marcasArray.find(item => {
       return item.id == ctx.articulo.modelo.idMarca
    })
    
    ctx.articulo.modelo.marca = marca
    next()
  } catch (err) {
    console.log(err)
  }
}