import { controllers } from '../db'
// import config from 'config'
// const version = config.get('version')

//  GENERATE ROUTES
export default (app) => {
  console.log('REST: Initializing rest API routes')
  /*
  RESTful APIs
  */
  app.use(new controllers.Configs().API())
  app.use(new controllers.Users().API())
  app.use(new controllers.Organizations().API())
  app.use(new controllers.Companies().API())
  app.use(new controllers.Programs().API())
  app.use(new controllers.Reviews().API())
  console.log(`REST: API live for all ${Object.keys(controllers).length - 1} core models.`)
}
