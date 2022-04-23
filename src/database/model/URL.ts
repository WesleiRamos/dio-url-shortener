import { prop, getModelForClass } from '@typegoose/typegoose'

export class URL {
  @prop({ required: true })
  hash: string

  @prop({ required: true })
  url: string

  @prop({ required: true })
  shortURL: string
}

export const URLModel = getModelForClass(URL)