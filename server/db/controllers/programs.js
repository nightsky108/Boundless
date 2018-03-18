import REST from './restify'
import { Program } from '../models'

export default class Programs extends REST {
  constructor () {
    super(Program)
  }
}
