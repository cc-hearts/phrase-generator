// 采用ES Modules 规范
import { readArticleSync } from './lib/read.js'
import { createRandomPick } from './lib/random.js'
import { generateArticle, generateArticleSeEdition } from './lib/generate.js'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { resolve } from 'path'
;(() => {
  const relativePath = resolve(fileURLToPath(import.meta.url), '../output')
  const entry = readArticleSync()
  const { title } = entry
  const randomPick = createRandomPick(title)
  // 随机生成title
  const articleTitle = randomPick()
  // const contents = generateArticle(articleTitle, { entry })
  const contents = generateArticleSeEdition(articleTitle, entry).join('\n')
  writeFileSync(relativePath + `/${articleTitle}|${Date.now()}.txt`, contents, { encoding: 'utf-8' })
})((0, eval)('this'))
