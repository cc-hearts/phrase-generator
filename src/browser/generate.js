export function parseSection(contents) {
  return (
    contents instanceof Array &&
    contents.reduce((pre, cur) => {
      const pNode = document.createElement('p')
      pNode.textContent = cur
      pre.push(pNode)
      return pre
    }, [])
  )
}
