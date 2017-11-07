const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()
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

app.get('/marcas/:id', function(req, res){
	res.render('index')
})

app.get('/article/:id', function(req, res){
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

app.listen(PORT, (err) => {
	if (err) return console.log(err)

	console.log(`Server listening ${PORT}`)
})