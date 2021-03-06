const express = require('express')
const bodyParser = require('body-parser')
const email = require('./email')
const PORT = 8080

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/accesorios', (req, res) => {
	res.render('index')
})

app.get('/top', (req, res) => {
	res.render('index')
})

app.get('/contacto', (req, res) => {
	res.render('index')
})

app.get('/marcas/add', function(req, res){
	res.render('index')
})

app.get('/marcas/:id', function(req, res){
	res.render('index')
})

app.get('/article/add', function(req, res){
	res.render('index')
})

app.get('/article/:id', function(req, res){
	res.render('index')
})

app.get('/modelos/add', function(req, res){
	res.render('index')
})

app.get('/search/:value', function(req, res){
	res.render('index')
})

app.get('/login', function(req, res){
	res.render('index')
})

app.get('/shoppingcar', function(req, res){
	res.render('index')
})

app.post('/sendemail', (req, res) => {
	try {	
		email(req.body)
		res.status(200).send('Done')
	}
	catch (err) {
		res.status(500).send("Fail")
	}
})

app.get('/emails', function(req, res){
	res.render('index')
})

app.get('/emails/:id', function(req, res){
	res.render('index')
})

app.get('/miscompras', function(req, res){
	res.render('index')
})

app.get('/miscompras/:id', function(req, res){
	res.render('index')
})

app.get('/ventas', function(req, res){
	res.render('index')
})

app.get('/ventas/:id', function(req, res){
	res.render('index')
})

app.listen(PORT, (err) => {
	if (err) return console.log(err)

	console.log(`Server listening ${PORT}`)
})