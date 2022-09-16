/**
 * @author heart
 * @description
 * @Date 2022-09-16
 */
export function interact(options) {
  return new Promise((resolve, reject) => {
    let i = 0
    let val = {}
    const { text, value } = options[i]
    console.log(`${text}(${value})`)
    process.stdin.setEncoding('utf-8')
    process.stdin.on('readable', () => {
      const { text, value, field } = options[i++]
      console.log(`${text}(${value})`)
      const data = process.stdin.read().slice(0, -1)
      val[field] = data
      if (i >= options.length) {
        process.stdin.emit('end')
        return
      }
      process.stdin.read()
    })
    process.stdin.on('end', () => {
      resolve(val)
    })
  })
}
