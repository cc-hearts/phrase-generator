import { createRandomPick } from '../lib/random.js'
import { generateArticleSeEdition } from '../lib/generate.js'
import { getTitle, getOptionsValue } from './getter.js'
import data from '../article/data.json' assert { type: 'json' }

function generateTitle() {
  return createRandomPick(data.title || [])
}
export function parseSection(contents) {
  return (
    contents instanceof Array &&
    contents.reduce((pre, cur) => {
      const pNode = document.createElement('p')
      pNode.textContent = cur
      pre.push(pNode)
      return pre
    }, [])
  )
}

export function generateArticle() {
  const title = getTitle() || generateTitle()
  const otherOptions = getOptionsValue()
  const contents = generateArticleSeEdition(title, data, otherOptions)
  // 持久化存储 使得更换标题不替换文章
  generateArticle.contents = contents
  const pSections = parseSection(contents)
  const app = document.getElementById('app')
  app.innerHTML = ''
  if (app && pSections instanceof Array) {
    for (let i = 0; i < pSections.length; i++) {
      app.appendChild(pSections[i])
    }
  }
}

export function generateArticleTitle() {
  const randomTitle = generateTitle()
  // 随机生成标题
  let title = randomTitle()
  const [h1Node] = document.getElementsByTagName('h1')
  if (h1Node) {
    h1Node.textContent = title
  }
  return title
}

// 重新生成标题
export function reGeneratorArticleTitle() {
  const preTitle = getTitle()
  let title = generateArticleTitle()
  while (title === preTitle) {
    title = generateArticleTitle()
  }
  const app = document.getElementById('app')
  if (app) {
    const contents = generateArticle.contents
    const newContents =
      contents instanceof Array &&
      contents.map((val) => {
        return val.replace(new RegExp(preTitle, 'g'), title)
      })
    generateArticle.contents = newContents
    const pSections = parseSection(newContents)
    app.innerHTML = ''
    if (app && pSections instanceof Array) {
      for (let i = 0; i < pSections.length; i++) {
        app.appendChild(pSections[i])
      }
    }
  }
}
