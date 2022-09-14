/**
 * @author heart
 * @description
 * @Date 2022-09-14
 */

// 随机长度
export function randomInt(min, max) {
  const randomLength = Math.random()
  // 控制在min - max之间的字数
  return ~~(min * (1 - randomLength) + max * randomLength)
}

// 防止重复 取length - 2 项 在将取到的值与最后一位互换
// 随机的时候 第一次末尾的值永远无法取到 需要改进
export function randomPick(arrayList) {
  const length = arrayList.length - 1
  const index = randomInt(0, length)
  ;[arrayList[index], arrayList[length]] = [arrayList[length], arrayList[index]]
  return arrayList[index]
}

// 改进方法
export function createRandomPick(arrayList) {
  arrayList = [...arrayList]
  function randomPickFunc() {
    const length = arrayList.length - 1
    const index = randomInt(0, length)
    ;[arrayList[index], arrayList[length]] = [arrayList[length], arrayList[index]]
    return arrayList[index]
  }
  randomPickFunc() // 取消第一次选取 保证末尾能够取到
  return randomPickFunc
}
