function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello world~~~')
    }, 2000)
  })
}

/* async await属于es6新语法，低版本浏览器无法识别，webpack不能转换为其他形式 */
/* 只有用babel-loader才可以转换 */
async function helloWorld() {
  let string = await getString()
  console.log(string)
}

// 导出函数模块
export default helloWorld