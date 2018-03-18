import mongoose from 'mongoose'
import config from 'config'

import { restDummies } from './models'

export default function () {
  const min = config.has('lorem-ipsum')
    ? config.get('lorem-ipsum')
    //  Default: 5 models of each type
    : 5
  console.log(`SEED: Lorem Ipsum Mode enabled. Seeding up to ${min} documents each...`)
  //  Activate dummy data generators, with specified minimums document counts.

  //  Generate an object containing ObjectIds for dummy objects.
  const ids = {
    user: [],
    organization: [],
    company: [],
    program: [],
    review: []
  }
  Object.keys(ids).forEach((key) => {
    for (let i = 0; i < min; i++) {
      ids[key].push(new mongoose.Types.ObjectId())
    }
  })
  let developer_id = new mongoose.Types.ObjectId()
  let organization_id = new mongoose.Types.ObjectId()
  //  For testing purposes
  const developer = {
    _id: developer_id,
    organization: organization_id,
    name: 'Web Developer',
    username: 'webdev',
    email: 'rykeller@uw.edu',
    reviews: [ids.review[0]],
    experience: [ids.program[0]]
  }
  const school = {
    _id: organization_id,
    name: 'University of Washington',
    location: 'Seattle, WA',
    domains: ['uw.edu', 'u.washington.edu', 'washington.edu'],
    targets: []
  }
  //  Create dummies for all RESTful models
  restDummies.map((model) => model(min, ids, developer, school))
}
