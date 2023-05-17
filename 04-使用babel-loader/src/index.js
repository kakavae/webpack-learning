import add from './a.js'
import imgSrc from './assets/IMG20190909165000.jpg'
import tvSvg from './assets/tv.svg'
import txt from './static/test.txt'
import imgPng from './assets/test.png'
import './css/index.css'
import './less/index.less'
import intro from './static/intro.json'
import person from './static/person.json5'
/* 验证babel-loader */
import helloWorld from './js/hello.js'

const img = document.createElement('img')
img.src = imgSrc
img.style.width = '200px'
img.style.height = '100px'

const imgA = document.createElement('img')
imgA.src = tvSvg

const div = document.createElement('div')
div.style.background = `url(${tvSvg}) no-repeat`
div.style['background-size'] = 'contain'
div.style.width = '50px'
div.style.height = '50px'

div.textContent = txt

const imgB = document.createElement('img')
imgB.src = imgPng
imgB.style.width = '100px'

document.body.appendChild(img)
document.body.appendChild(div)
document.body.appendChild(imgA)
document.body.appendChild(imgB)

console.log(add(3, 4))
console.log(intro)
console.log('@@@@', person)
helloWorld()