/**
 * @author heart
 * @description
 * @Date 2022-09-17
 */
import { generateArticle, reGeneratorArticleTitle } from './generate.js'
function stopPropagation(e) {
  e.stopPropagation()
}

function cancelPopupClick() {
  const [popupLayer] = document.getElementsByClassName('popup-layer')
  if (popupLayer) {
    const width = popupLayer.getAttribute('width') || '200px'
    popupLayer.style.transform = `translateX(${width})`
    changeMaskVisible()
  }
}

function changeMaskVisible(bool = false) {
  const [maskNode] = document.getElementsByClassName('mask')
  if (maskNode) {
    maskNode.style.display = bool ? 'block' : 'none'
  }
}

function showPopupClick(event) {
  event.stopPropagation instanceof Function && event.stopPropagation()
  const [popupLayer] = document.getElementsByClassName('popup-layer')
  if (popupLayer) {
    popupLayer.style.transform = `translateX(0px)`
    popupLayer.style.width = popupLayer.getAttribute('width')
    changeMaskVisible(true)
    if (showPopupClick._isListener) return
    showPopupClick._isListener = true
    popupLayer.addEventListener('click', stopPropagation, false)
    document.body.addEventListener('click', cancelPopupClick, false)
  }
}

function rangeChange(event) {
  const value = event.target.value
  const spanNode = event.target.nextElementSibling
  spanNode && (spanNode.textContent = value)
}

function getInputList() {
  return document.querySelectorAll('input[type="range"]')
}

function listenerInputRangeChange() {
  const inputList = getInputList()
  inputList.forEach((val) => {
    val.addEventListener('change', rangeChange, false)
  })
}

export function addEvent() {
  const [showPopupBtn] = document.getElementsByClassName('show-popup-layer')
  if (showPopupBtn) {
    showPopupBtn.addEventListener('click', showPopupClick, false)
  }
  listenerInputRangeChange()
  listenerGeneratorBtn()
  listenerGenerateTitle()
}

export function getOptionsValue() {
  const inputList = getInputList()
  const val = {}
  inputList.forEach((record) => {
    val[record.name] = record.value
  })
  return val
}

function listenerGeneratorBtn() {
  const btn = document.getElementById('generator')
  if (btn) {
    btn.addEventListener('click', generateArticle, false)
  }
}

export function getArticleTitle() {
  const [h1Node] = document.getElementsByTagName('h1')
  return (h1Node && h1Node.textContent) || null
}

function listenerGenerateTitle() {
  const btn = document.getElementById('generator-title')
  if (btn) {
    btn.addEventListener('click', reGeneratorArticleTitle, false)
  }
}
