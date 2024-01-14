import {ContactStruct} from "../models/types";
import {renderButton} from "./button.ts";
import {storeDataAsJson} from "../storage";

function notEmpty(val: unknown): val is NonNullable<unknown> {
  if(val === undefined || val === null) {
    return false
  }
  if(typeof val === "string" && val.length === 0) {
    return false
  }
  if(val instanceof Array && val.length === 0) {
    return false
  }
  return true
}

export function renderDialog(storageKey: string, data?: Record<string, string>) {
  const contactData = parseData(data)
  const dialog = document.createElement("dialog")
  const form = document.createElement("form")


  form.method = "dialog"

  form.append(...textInputElement("name", undefined, contactData.name?.toString()))
  form.append(...textInputElement("nickname", undefined, contactData.nickname))
  form.append(...textInputElement("telephoneNumber", "phone number", contactData.telephoneNumber))
  form.append(...textInputElement("email", undefined, contactData.email))
  form.append(...textInputElement("address", undefined, contactData.address))
  //form.append(...textInputElement("birthday", undefined, contactData.birthday?.toString()))
  form.append(...textInputElement("note", undefined, contactData.note))
  form.append(...textInputElement("homePage", "home page", contactData.homePage))

  const button = renderButton("Save", () => {
    const data = [...form.elements]
      .filter(e => e instanceof HTMLInputElement && notEmpty(e.value))
      .reduce((acc, cur) => {
        if(cur instanceof HTMLInputElement) {
          const key = cur.getAttribute("x-data-key")
          const value = cur.value
          if(notEmpty(key) && notEmpty(value)) {
            acc[key] = value
          }
        }
        return acc
      }, {} as Record<string, string>)
    storeDataAsJson(storageKey, data)
  })

  form.append(button)
  dialog.append(form)
  dialog.id = "dialog"

  return dialog
}

function textInputElement(key: string, title?: string, prefill?: string): HTMLElement[] {
  const label = document.createElement("label")
  const input = document.createElement("input")
  label.htmlFor = `input-${key}`
  label.innerText = title ? title : key
  label.title = title ? title : key

  input.type = "text";
  if(notEmpty(prefill)) {
    input.defaultValue = prefill
  }
  input.name = `input-${key}`
  input.setAttribute("x-data-key", key)
  return [ label, input ]
}
function parseData(data?: Record<string, string>) {
  const contactData: ContactStruct = {}
  if(notEmpty(data)) {
    if(notEmpty(data.address)) {
      contactData.address = data.address
    }
    if(notEmpty(data.birthday)) {
      contactData.birthday = data.birthday
    }
    if(notEmpty(data.email)) {
      contactData.email = data.email
    }
    if(notEmpty(data.name)) {
      contactData.name = data.name
    }
    if(notEmpty(data.nickname)) {
      contactData.nickname = data.nickname
    }
    if(notEmpty(data.note)) {
      contactData.note = data.note
    }
    if(notEmpty(data.kanaName)) {
      contactData.kanaName = data.kanaName
    }
    if(notEmpty(data.telephoneNumber)) {
      contactData.telephoneNumber = data.telephoneNumber
    }
    if(notEmpty(data.videophoneNumber)) {
      contactData.videophoneNumber = data.videophoneNumber
    }
    if(notEmpty(data.homePage)) {
      contactData.homePage = data.homePage
    }
  }
  return contactData;
}