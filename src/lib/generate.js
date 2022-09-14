import { randomInt, createRandomPick } from './random.js'

// 随机生成文章
export function generateArticle(title, obj = {}) {
  const contents = []
  const { pMax = 11, pMin = 5, cMax = 21, cMin = 10, entry } = obj
  if (Object.prototype.toString.call(entry) !== '[object Object]') return []
  const { famous, bosh_before, bosh, conclude, said } = entry

  const saidRandomPick = createRandomPick(said)
  const concludeRandomPick = createRandomPick(conclude)
  const famousRandomPick = createRandomPick(famous)
  const boshBeforeRandomPick = createRandomPick(bosh_before)
  const boshRandomPick = createRandomPick(bosh)
  // 多少个段落
  for (let i = 0; i <= randomInt(pMin, pMax); i++) {
    // 每个段落的句子
    let content = ''
    for (let j = 0; j <= randomInt(cMin, cMax); j++) {
      const selectionContents = ['famous', 'bosh']
      const index = ~~randomInt(0, 2)
      const field = selectionContents[index]
      switch (field) {
        case 'famous': {
          const articleSaid = saidRandomPick()
          const articleConclude = concludeRandomPick()
          const articleFamous = famousRandomPick()
          content += articleFamous
            .replace(/{{said}}/g, articleSaid)
            .replace(/{{conclude}}/g, articleConclude)
            .replace(/{{title}}/g, title)
          break
        }
        case 'bosh': {
          const articleBosh = boshBeforeRandomPick() + boshRandomPick(bosh)()
          content += articleBosh.replace(/{{title}}/g, title)
          break
        }
      }
    }
    contents.push(content)
  }
  return contents
}
