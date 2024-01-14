import {ContactStruct, MeCardStruct} from "./types";

const ENUM_NIL = -1 as const;
const ENUM_STRING = 0 as const;
const ENUM_ARRAY = 1 as const;
const ENUM_DATE = 2 as const;

const ENUM_NAME = 0 as const;
const ENUM_KANA = 1 as const;

type EnumeratedType = typeof ENUM_NIL | typeof ENUM_STRING | typeof ENUM_ARRAY | typeof ENUM_DATE;
type EnumeratedNameType = typeof ENUM_NAME | typeof ENUM_KANA;

function getEnumType(value: unknown): EnumeratedType {
  if(value === undefined || value === null) {
    return ENUM_NIL;
  }
  if(typeof value === "string"){
    if(value === "") {
      return ENUM_NIL;
    }
    return ENUM_STRING;
  }
  if(value instanceof Array){
    if(value.length == 0) {
      return ENUM_NIL;
    }
    if(value.some(v => typeof v !== "string")){
      return ENUM_NIL;
    }
    else return ENUM_ARRAY;
  }
  if(value instanceof Date) {
    if(isNaN(value.getDate())) {
      return ENUM_NIL;
    }
    return ENUM_DATE;
  }
  return ENUM_NIL
}
function padWithZero(length: number, number: string|number): string {
  return number.toString().slice(0, length).padStart(length, "0")
}

function formatDate(date: Date): string {
  const year = padWithZero(4, date.getFullYear())
  const month = padWithZero(2, date.getMonth() + 1)
  const day = padWithZero(2, date.getDate())
  return year+month+day
}

function formatName(name: string, type: EnumeratedNameType): string {
  if(name.includes(",")) {
    return name;
  }
  return formatNameArray(name.split(" "), type);
}

function formatNameArray(nameArray: string[], type: EnumeratedNameType) {
  if(nameArray.length < 2) {
    return nameArray[0]
  }
  switch (type) {
    case ENUM_NAME: return `${nameArray[nameArray.length -1]},${nameArray[0]}`
    case ENUM_KANA: return `${nameArray[0]},${nameArray[nameArray.length -1]}`
  }
}

function isString(_: unknown, enumType: EnumeratedType): _ is string {
  return enumType === ENUM_STRING
}
function isArray(_: unknown, enumType: EnumeratedType): _ is string[] {
  return enumType === ENUM_ARRAY
}
function isDate(_: unknown, enumType: EnumeratedType): _ is Date {
  return enumType === ENUM_DATE
}

export function contactToMeCard(contact: ContactStruct): MeCardStruct {
  const meCard: MeCardStruct = {};

  const addressType = getEnumType(contact.address)
  if(isString(contact.address, addressType)) {
    meCard.ADR = contact.address;
  }

  const birthdayType = getEnumType(contact.birthday)
  if(isString(contact.birthday, birthdayType)) {
    const parsedBirthday = new Date(contact.birthday)
    if(getEnumType(parsedBirthday) !== ENUM_NIL) {
      meCard.BDAY = formatDate(parsedBirthday);
    }
  }
  if(isDate(contact.birthday, birthdayType)){
    meCard.BDAY = formatDate(contact.birthday);
  }

  const emailType = getEnumType(contact.birthday)
  if(isString(contact.email, emailType)){
    if(contact.email.includes("@")) {
      meCard.EMAIL = contact.email;
    }
  }

  const nameType = getEnumType(contact.name)
  if(isString(contact.name, nameType)) {
    meCard.N = formatName(contact.name, ENUM_NAME)
  }
  if(isArray(contact.name, nameType)) {
    meCard.N = formatNameArray(contact.name, ENUM_NAME)
  }

  const nicknameType = getEnumType(contact.nickname)
  if(isString(contact.nickname, nicknameType)) {
    meCard.NICKNAME = contact.nickname
  }

  const noteType = getEnumType(contact.note)
  if(isString(contact.note, noteType)) {
    meCard.NOTE = contact.note
  }

  const kanaNameType = getEnumType(contact.kanaName)
  if(isString(contact.kanaName, kanaNameType)) {
    meCard.SOUND = formatName(contact.kanaName, ENUM_KANA)
  }
  if(isArray(contact.kanaName, kanaNameType)) {
    meCard.SOUND = formatNameArray(contact.kanaName, ENUM_KANA)
  }

  const telType = getEnumType(contact.telephoneNumber)
  if(isString(contact.telephoneNumber, telType)) {
    meCard.TEL = contact.telephoneNumber
  }

  const telAvType = getEnumType(contact.videophoneNumber)
  if(isString(contact.videophoneNumber, telAvType)){
    meCard["TEL-AV"] = contact.videophoneNumber
  }

  const urlType = getEnumType(contact.homePage)
  if(isString(contact.homePage, urlType)){
    if(URL.canParse(contact.homePage)) {
      meCard.URL = contact.homePage
    }
  }

  return meCard
}

export function formatAsMeCardString(input: MeCardStruct): string {
  const START = "MECARD:" as const
  const END = ";;" as const

  const data = Object.entries(input)
    .map(([key, value]) => `${key}:${value}`)
    .join(";")

  return `${START}${data}${END}`
}