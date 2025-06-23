import mongoose from 'mongoose'
import schema from './schema.js'

// create mongoose model from the schema
const model = mongoose.model('QuizModel', schema)

// export so it can be used elsewhere
export default model
