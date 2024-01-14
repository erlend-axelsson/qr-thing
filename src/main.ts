import './style.css'
import {renderMeCard, renderDialog, renderTitle, renderButton } from "./render";
import {loadDataAsObject} from "./storage";
import {contactToMeCard} from "./models";
import {updateSvgElement} from "./render/qr.ts";

function getData(key: string) {
  return loadDataAsObject(key)
}
function getQr(data: Record<string, string>) {
  return renderMeCard(contactToMeCard(data))
}


const store: {data: Record<string, string>} = {
  data: {}
}

const children: Record<string, HTMLElement> = {
}

function updateStore() {
  store.data = getData("qrThing")
}

function initializeChildren() {
  children.title = renderTitle("QR-thing")
  children.qr = getQr(store.data)
  children.dialog = renderDialog("qrThing", store.data)
  children.options = renderButton("options", () => {(children.dialog as HTMLDialogElement).showModal()})
}

function appendChildren(container: HTMLDivElement) {
  container.append(children.title, children.options, children.qr, children.dialog)
}

const appContainer = document.querySelector<HTMLDivElement>('#app')!

updateStore()
initializeChildren()
appendChildren(appContainer)
appContainer.onsubmit = () => {
  updateStore()
  updateSvgElement(children.qr, contactToMeCard(store.data))
}
