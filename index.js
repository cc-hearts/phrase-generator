// 采用ES Modules 规范
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { resolve } from 'path'
import { readArticleSync } from './src/lib/read.js'
import { createRandomPick } from './src/lib/random.js'
import { generateArticleSeEdition } from './src/lib/generate.js'
import { parseCmdParams, showUsage } from './src/lib/cmd.js'
import { interact } from './src/lib/interact.js'
;(async () => {
  showUsage()
  // 通过命令行参数拿到数据
  // const argv = parseCmdParams()
  const relativePath = resolve(fileURLToPath(import.meta.url), '../src/output')
  const entry = readArticleSync()
  const { title } = entry

  console.log(process.argv)

  const randomPick = createRandomPick(title)

  // 随机生成title
  const articleTitle = randomPick()
  // const contents = generateArticle(articleTitle, { entry }, {...argv})

  // 通过命令行交互拿到数据
  const argvList = [
    { text: '请输入文章主题', value: articleTitle, field: 'title' },
    { text: '请输入文章最大字数', value: 10000, field: 'articleLMax' },
    { text: '请输入文章最小字数', value: 6000, field: 'articleLMin' },
    { text: '请输入段落最大字数', value: 500, field: 'sectionLMax' },
    { text: '请输入段落最小字数 ', value: 200, field: 'sectionLMin' },
  ]
  const argv = await interact(argvList)
  const contents = generateArticleSeEdition(articleTitle, entry, { ...argv }).join('\n')
  writeFileSync(relativePath + `/${articleTitle}|${Date.now()}.txt`, contents, { encoding: 'utf-8' })
})((0, eval)('this'))
