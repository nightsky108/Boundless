import REST from './restify'
import { Company } from '../models'

export default class Companies extends REST {
  constructor () {
    super(Company)
  }
}
