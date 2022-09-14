// 采用ES Modules 规范
import { readArticleSync } from './lib/read.js'
import { createRandomPick } from './lib/random.js'
import { generateArticle } from './lib/generate.js'
;(() => {
  const entry = readArticleSync()
  const { title } = entry
  const randomPick = createRandomPick(title)
  // 随机生成title
  const articleTitle = randomPick()
  const contents = generateArticle(articleTitle, { entry })
  console.log(contents)
})((0, eval)('this'))
