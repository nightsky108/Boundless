import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import autopopulate from 'mongoose-autopopulate'
import faker from 'faker'

/*
MANIFEST SCHEMA:
Contains an ask for a proposal of a certain type
(original proposal, request for supplemental funding, partial/alternate budgets...)
NOTE: This is cruicial - often we're concerned with budgets that HAVE ONE proposal,
but a proposal HAS MANY budgets.
Thus, when voting on A MANIFEST, you're not just voting on A PROPOSAL.
*/
const ProgramSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', autopopulate: true },
  type: { type: String, default: 'Intern' },
  candidates: { type: [String], default: ['Junior'] },
  roles: [String],
  locations: [String],
  relocation: Boolean,
  sponsorship: Boolean,
  inclusive: Boolean,
  compensation: { type: Number, min: 0, max: 5 },
  interviews: [String]
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
})
ProgramSchema.plugin(autoref, [
  'company.programs',
  'reviews.program',
])
ProgramSchema.plugin(autopopulate)
const Program = mongoose.model('Program', ProgramSchema)
export default Program

/* *****
FAKE DATA GENERATOR: Contact
***** */
const dummyPrograms = (min, ids) => {
  //  Check the db for existing data satisfying min required
  Program.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Program schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new Program({
          _id: ids.program[i],
          company: ids.company[i],
          type: (i % 2 === 0) ? 'Intern' : 'Grad',
          candidates: [(i % 2 === 0) ? 'Junior' : 'Grad'],
          roles: [
            (i % 2 === 0) ? 'SWE' : 'SDET',
            (i % 2 === 0) ? 'Security' : 'UI/UX'
          ],
          locations: [
            faker.address.city(),
            faker.address.city()
          ],
          relocation: (i % 2 === 0) ? faker.random.boolean() : undefined,
          sponsorship: (i % 2 === 0) ? faker.random.boolean() : undefined,
          inclusive: (i % 2 === 0) ? faker.random.boolean() : undefined,
          compensation: faker.random.number(),
          interviews: [
            faker.hacker.verb(),
            faker.hacker.verb()
          ],
          reviews: [
            ids.review[i],
            ids.review[i]
          ]
        })
      }
      //  Create will push our fakes into the DB.
      Program.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Program (${fakes.length})`) }
      })
    }
  })
}

export { dummyPrograms }
