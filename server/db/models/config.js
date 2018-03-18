import mongoose from 'mongoose'

/*
CONFIG SCHEMA:
Contains top-level data and enums

This approach allows us to configure the site
via the config panel and DB SaaS in real time
*/
const ConfigSchema = new mongoose.Schema({
  year: { type: Number, default: 2018 },
})
const Config = mongoose.model('Config', ConfigSchema)
export default Config

/* *****
FAKE DATA GENERATOR: Contact
***** */
//  NOTE: Min should = 1
export const dummyConfigs = (min, ids) => {
  Config.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Config schema: ${err}`)
    } else if (count < 1) {
      let fake = new Config({
        year: 2018
      })
      Config.create(fake, (error) => {
        if (!error) { console.log(`SEED: Created fake Config scheme`) }
      })
    }
  })
}
