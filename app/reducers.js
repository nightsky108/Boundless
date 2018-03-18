import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
//  db is referred to as "entities" in redux-query docs
import { entitiesReducer as db, queriesReducer as queries } from 'redux-query'
import {responsiveStateReducer as screen} from 'redux-responsive'

import { authentication as user, config, filter } from './services'

const rootReducer = combineReducers({
  //  Store enhancements
  screen,
  routing,
  db,
  queries,
  // Isomorphic reducers (authN/Z)
  user,
  config,
  //  Client side reducers
  filter
})

export default rootReducer
