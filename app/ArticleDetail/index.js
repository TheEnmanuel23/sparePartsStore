import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/article/:id', PreLoading, loadArticle, loadInventario, (ctx, next) => {
	let html = template(ctx.articulo)
  let content = document.querySelector('#content')
  content.innerHTML = html
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