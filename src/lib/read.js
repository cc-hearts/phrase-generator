/**
 * @author heart
 * @description
 * @Date 2022-09-14
 */
import { readFile, readFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
// 相对路径./src/article/data.json是相对于脚本的运行目录 而不是脚本文件的目录
readFile('./src/article/data.json', (err, file) => {
  // 如果读取成功 则err为null
  if (err) {
    console.log(err)
    return
  }
  // file是一个buffer流 可以调用toString 转成utf8的形式
  // 或者readFile第二个参数设置{encoding: 'utf-8}
  // console.log(file.toString('utf8'))
})

// import.meta.url表示获得当前脚本文件的 URL 地址，因为ES Modules是通过 URL 规范来引用文件的（这就统一了浏览器和 Node.js 环境）
console.log(import.meta.url)

// fileURLToPath 可以将 url 转为文件路径
console.log(fileURLToPath(import.meta.url))

// resolve方法可以将 JS 文件目录和相对路径 拼接
console.log(resolve(fileURLToPath(import.meta.url), '../../article/data.json'))

export function readArticleSync() {
  const data = readFileSync(resolve(fileURLToPath(import.meta.url), '../../article/data.json'), {
    encoding: 'utf-8',
  })
  // console.log(typeof data === 'string') // true
  return JSON.parse(data)
}
