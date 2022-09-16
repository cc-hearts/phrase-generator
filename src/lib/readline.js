/**
 * @author heart
 * @description readline 实现 interact
 * @Date 2022-09-17
 */
import readline from 'readline'
function getQuestions(rl, { text, value }) {
  const question = `${text}(${value})\n`
  return new Promise((resolve, reject) => {
    rl.question(question, (ans) => {
      resolve(ans || value)
    })
  })
}
export async function interact(options) {
  // 创建交互命令行 的实例对象
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const ans = {}
  try {
    for (let i = 0; i < options.length; i++) {
      const { text, value, field } = options[i]
      ans[field] = await getQuestions(rl, { text, value })
    }
    rl.close()
    return ans
  } catch (e) {
    console.log('get ans error:', e)
  }
}
