import mongoose from 'mongoose'
import autoref from 'mongoose-autorefs'
import faker from 'faker'
/*
Organization SCHEMA:
Schema for commitee members, includes various role designations and the option to join user refs.
These are deleted if members are no longer associated with the Organization.
*/
const OrganizationSchema = new mongoose.Schema({
  name: String,
  location: String,
  domains: [String],
  targets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }]
})
OrganizationSchema.plugin(autoref, [
  'targets.targets'
])
const Organization = mongoose.model('Organization', OrganizationSchema)
export default Organization

/* *****
FAKE DATA GENERATOR: User
******/
const dummyOrganization = (min, ids, developer) => {
  //  Check the db for existing data satisfying min required
  Organization.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Decision schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new Organization({
          _id: ids.organization[i],
          name: faker.company.companyName(),
          location: faker.address.city(),
          domains: [faker.internet.domainName()],
          targets: [ids.company[i]]
        })
      }
      fakes.push(new Organization({
        _id: developer.organization,
        user: developer._id,
        spectator: true,
        member: true,
        admin: true
      }))
      //  Create will push our fakes into the DB.
      Organization.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake Organization authZ (${fakes.length})`) }
      })
    }
  })
}
export { dummyOrganization }
