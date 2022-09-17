import { createRandomPick } from '../lib/random.js'
import { generateArticleSeEdition } from '../lib/generate.js'
import { parseSection } from './generate.js'
import data from '../article/data.json' assert { type: 'json' }
;((globalThis) => {
  const randomTitle = createRandomPick(data.title || [])
  // 随机生成标题
  let title = randomTitle()
  const [h1Node] = document.getElementsByTagName('h1')
  if (h1Node) {
    h1Node.textContent = title
  }
  // 生成内容
  // TODO: 修改文章段落长度 文章总长度
  let otherOptions = {}
  const contents = generateArticleSeEdition(title, data, otherOptions)
  const pSections = parseSection(contents)
  const app = document.getElementById('app')
  if (app && pSections instanceof Array) {
    for (let i = 0; i < pSections.length; i++) {
      app.appendChild(pSections[i])
    }
  }
})((0, eval)('this'))
