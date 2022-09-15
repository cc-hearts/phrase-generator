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
// 选择到1-n-1的概率为 (n-2)/(n-1)^2 即第一次没有选到的概率为n-2/n-1 第二次选到的概率为1/n-1
// 选择到末位的情况的概率为1/(n-1) 即 第一次都会把 末尾带出 则第二次选择到末尾的概率为1/n-1
// 当 n 趋近足够大的时候 则这两个等式趋近相等概率
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
