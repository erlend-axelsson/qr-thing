export type MeCardStruct = {
  ADR?: string
  BDAY?: string
  EMAIL?: string
  N?: string
  NICKNAME?: string
  NOTE?: string
  SOUND?: string
  TEL?: string
  "TEL-AV"?: string
  "URL"?: string
};

export type ContactStruct = {
  address?: string
  birthday?: Date | string
  email?: string
  name?: string | string[]
  nickname?: string
  note?: string
  kanaName?: string | string[]
  telephoneNumber?: string
  videophoneNumber?: string
  homePage?: string
};