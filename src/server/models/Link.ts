import mongoose, { Document } from 'mongoose'

export interface ILink extends Document {
  name: string
  url: string
  icon: string
  color: string
  clicks: number
  order: number
  createdAt: Date
}

const linkSchema = new mongoose.Schema<ILink>({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Link = mongoose.model<ILink>('Link', linkSchema) 