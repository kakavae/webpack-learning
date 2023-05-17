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
/* 测试静态导入，模块拆分 */
import _ from 'lodash'
/* 测试动态导入 */
import './js/async-module'

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

console.log(_.join(['index', 'module'], '@'))

/* 测试懒加载 */
const btn = document.createElement('button')
btn.textContent = '加法'
btn.addEventListener('click', () => {
  /* webpack魔法注释，告诉webpack，动态导入的bundle的名字 */
  // import(/*webpackChunkName: 'math'*/ './js/math.js').then(({ add }) => {
  //   btn.textContent = add(4, 5)
  // })

  /* 预加载，webpackPrefetch会在刚开始浏览器最近的空闲时间就加载动态导入的模块 */
  /* 首先会在页面的head部分引入Link指示页面在空闲时间加载动态导入的js文件 */
  import(/*webpackChunkName: 'math', webpackPrefetch: true*/ './js/math.js').then(({ add }) => {
    btn.textContent = add(4, 5)
  })
})
document.body.appendChild(btn)

/* 测试webpackPreload */
const button2 = document.createElement('button')
button2.textContent = '点击执行字符串打印'
button2.addEventListener('click', () => {
  /* 与上面不同，webpackPreload会在父chunk加载的时候并行加载动态导入的模块 */
  import(/* webpackChunkName: 'print', webpackPreload: true */
    './js/print.js').then(({ print }) => {
      print(4, 5)
    })
})
document.body.appendChild(button2)

import(/* webpackChunkName: 'print', webpackPreload: true */
  './js/print.js').then(({ print }) => {
    print(4, 5)
  })