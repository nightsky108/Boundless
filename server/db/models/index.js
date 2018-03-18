/*
MODEL INITIALIZER
Uses require() to pass the imports around as a func.
NOTE: Do not change this to ES6, please - loading must be async
*/
export default function loadModels () {
  //  Config, Auth and User data
  require('./config')
  require('./user')
  require('./organization')
  //  Business logic models
  require('./company')
  require('./program')
  require('./review')
}

/*
RESTful MODELS (and their dummy data generators)
For express-restify-mongoose
*/
import Config, { dummyConfigs } from './config'
import User, { dummyUsers } from './user'
import Organization, { dummyOrganizations } from './organization'
import Company, { dummyCompanies } from './company'
import Program, { dummyPrograms } from './program'
import Review, { dummyReviews } from './review'

export {
  Config, User, Organization,
  Company, Program, Review
}
export const restDummies = [
  dummyConfigs, dummyUsers, dummyOrganizations,
  dummyCompanies, dummyPrograms, dummyReviews
]
