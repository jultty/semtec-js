import mongoose from 'mongoose'

export const termSchema = new mongoose.Schema({
  term: { type: String, required: true, unique: true },
  definition: { type: String, required: true },
  source: { type: String, required: true },
})

export const term = mongoose.model('Term', termSchema)
