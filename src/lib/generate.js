import { randomInt, createRandomPick } from './random.js'

// 随机生成文章
export function generateArticle(title, obj = {}) {
  const contents = []
  const { pMax = 11, pMin = 5, cMax = 21, cMin = 10, entry } = obj
  if (Object.prototype.toString.call(entry) !== '[object Object]') return []
  const { famous, bosh_before, bosh, conclude, said } = entry
  // const saidRandomPick = createRandomPick(said)
  // const concludeRandomPick = createRandomPick(conclude)
  // const famousRandomPick = createRandomPick(famous)
  // const boshBeforeRandomPick = createRandomPick(bosh_before)
  // const boshRandomPick = createRandomPick(bosh)
  // 优化写法
  const [famousRandomPick, boshBeforeRandomPick, boshRandomPick, concludeRandomPick, saidRandomPick] = [
    famous,
    bosh_before,
    bosh,
    conclude,
    said,
  ].map((item) => {
    return createRandomPick(item)
  })

  // 多少个段落
  const pLength = randomInt(pMin, pMax)
  for (let i = 0; i <= pLength; i++) {
    // 每个段落的句子
    let content = ''
    const cLength = randomInt(cMin, cMax)
    for (let j = 0; j <= cLength; j++) {
      const selectionContents = ['famous', 'bosh']
      const index = ~~randomInt(0, 2)
      const field = selectionContents[index]
      switch (field) {
        case 'famous': {
          const articleSaid = saidRandomPick()
          let articleConclude = concludeRandomPick()
          if (i === pLength) {
            while (/：\s*$/.test(articleConclude)) {
              articleConclude = concludeRandomPick()
            }
          }
          const articleFamous = famousRandomPick()
          content += articleFamous
            .replace(/{{said}}/g, articleSaid)
            .replace(/{{conclude}}/g, articleConclude)
            .replace(/{{title}}/g, title)
          break
        }
        case 'bosh': {
          const articleBosh = boshBeforeRandomPick() + boshRandomPick()
          content += articleBosh.replace(/{{title}}/g, title)
          break
        }
      }
    }
    contents.push(content)
  }
  return contents
}

// 句子生成
function sentence(pick, replacer) {
  let ret = pick()
  for (const key in replacer) {
    ret = ret.replace(new RegExp(`{{${key}}}`, 'g'), typeof replacer[key] === 'function' ? replacer[key]() : replacer[key])
  }
  return ret
}

/**
 * 规定每个段落的字数在 200~500 字之间。每个段落包含 20%的名人名言（famous），80% 的废话（bosh)。
 * 其中，废话里带前置从句（bosh_before）的废话占文章句子的 30%，不带前置从句的废话占文章句子的 50%；
 */
export function generateArticleSeEdition(title, entry, obj = {}) {
  const { articleLMax = 10000, articleLMin = 6000, sectionLMin = 200, sectionLMax = 500 } = obj
  const { famous, bosh_before, bosh, conclude, said } = entry
  const [famousRandomPick, boshBeforeRandomPick, boshRandomPick, concludeRandomPick, saidRandomPick] = [
    famous,
    bosh_before,
    bosh,
    conclude,
    said,
  ].map((item) => {
    return createRandomPick(item)
  })
  const articleLength = randomInt(articleLMin, articleLMax)
  let totalLength = 0
  const contents = [] // 保存文章段落
  // 总字数不超过文章规定的次数
  while (totalLength <= articleLength) {
    let sections = '' // 段落生成
    const sectionLength = randomInt(sectionLMin, sectionLMax)
    while (sections.length <= sectionLength) {
      const n = randomInt(0, 101) // [0-100]
      let section = ''
      if (n < 20) {
        // 名言
        section += sentence(famousRandomPick, { said: saidRandomPick, conclude: concludeRandomPick })
      } else if (n < 50) {
        // 带有bosh_before 的废话
        section += sentence(boshBeforeRandomPick, { title }) + sentence(boshRandomPick, { title })
      } else {
        // 直接废话
        section += sentence(boshRandomPick, { title })
      }
      if (sections.length + section.length > sectionLength && /：\s*$/.test(section)) continue
      sections += section
    }
    totalLength += sections.length
    contents.push(sections)
  }
  return contents
}
