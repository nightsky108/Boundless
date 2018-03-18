import REST from './restify'
import { Organization } from '../models'

export default class Organizations extends REST {
  constructor () {
    super(Organization)
  }
}
