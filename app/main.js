import page from 'page'

import './Header'
import './Footer'
import loadMarcas from './Marcas'
loadMarcas()
import './Homepage'
import './Marcas/addMarca'
import './Modelos/addModelo'
import './AddArticle'
import './Modelos'
import './ArticleDetail'
import './ShoppingCar'
import Car from './ShoppingCar/Car'
import './SearchArticle'
import './Accesorios'
import './Top'
import './Login'
import './Contacto'
import './Emails'
import './EmailDetail'
import './MisCompras'
import './main.css'

document.Car = new Car()

page()