export function getTitle() {
  const [h1Node] = document.getElementsByTagName('h1')
  return (h1Node && h1Node.textContent) || null
}

export function getInputList() {
  return document.querySelectorAll('input[type="range"]')
}

export function getOptionsValue() {
  const inputList = getInputList()
  const val = {}
  inputList.forEach((record) => {
    val[record.name] = record.value
  })
  return val
}
