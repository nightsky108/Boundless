import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import faker from 'faker'

/*
COMPANY SCHEMA:
*/
const CompanySchema = new mongoose.Schema({
  name: String,
  industry: String,
  description: String,
  programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
  targets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }]
})
/*
Metadata
Contacts
Body (Overview / Project Plan)
Manifests
Stynax: <parent-to-child prop>.<child-to-parent prop>
*/
CompanySchema.plugin(autoref, [
  'programs.company',
  'targets.targets'
])
const Company = mongoose.model('Company', CompanySchema)
export default Company

/* *****
FAKE DATA GENERATOR: Company
******/
const dummyCompanys = (min, ids) => {
  //  Check the db for existing data satisfying min required
  Company.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Company schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new Company({
          _id: ids.company[i],
          name: faker.company.companyName(),
          industry: faker.company.catchPhraseNoun(),
          description: faker.company.catchPhraseDescriptor(),
          programs: [ids.program[i]],
          targets: [ids.organization[i]]
        })
      }
      //  Create will push our fakes into the DB.
      Company.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Company (${fakes.length})`) }
      })
    }
  })
}

export { dummyCompanys }
