import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import autopopulate from 'mongoose-autopopulate'
import faker from 'faker'
import _ from 'lodash'

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
  eligible: { type: [String], default: ['Junior'] },
  roles: [String],
  locations: [String],
  relocation: Boolean,
  sponsorship: Boolean,
  inclusive: Boolean,
  compensation: { type: Number, min: 0, max: 5 },
  // Type of interviews in sequence (['Behavioral', 'Technical On-Site'])
  interviews: [String],
  // Example of "challenges"
  //  http://they.whiteboarded.me/companies-that-whiteboard.html
  challenges: [String],
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
export const dummyPrograms = (min, ids) => {
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
          type: _.sample(['Intern', 'CoOp', 'New Grad']),
          eligible: [
            _.sample(['Sophomores', 'Juniors', 'Seniors', 'New Grads']),
            _.sample(['Sophomores', 'Juniors', 'Seniors', 'New Grads'])
          ],
          roles: [
            _.sample(['SWE', 'SDET', 'Security', 'UI/UX']),
            _.sample(['SWE', 'SDET', 'Security', 'UI/UX'])
          ],
          locations: [
            faker.address.city(),
            faker.address.city()
          ],
          relocation: (i % 2 === 0) ? faker.random.boolean() : undefined,
          sponsorship: (i % 2 === 0) ? faker.random.boolean() : undefined,
          inclusive: (i % 2 === 0) ? faker.random.boolean() : undefined,
          compensation: (i % 2 === 0) ? 0 : 5,
          interviews: [
            faker.hacker.verb(),
            faker.hacker.verb()
          ],
          challenges: [
            _.sample(['Online Challenge', 'Whiteboarding', 'Live Coding', 'Homework', 'Code Review']),
            _.sample(['Online Challenge', 'Whiteboarding', 'Live Coding', 'Homework', 'Code Review'])
          ],
          reviews: [
            ids.review[i],
            ids.review[i]
          ]
        })
      }
      //  Create will push our fakes into the DB.
      Program.create(fakes, (error) => error
        ? console.error(`SEED: Creating Program failed - ${error}`)
        : console.log(`SEED: Created fake Program (${fakes.length})`)
      )
    }
  })
}
