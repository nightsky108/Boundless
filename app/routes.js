import React from 'react'
import { Route, IndexRoute } from 'react-router'

import UI from './views/UI'
/*
CODE SPLITTING:
This weird hackery is the most clean way to split components into different JS
files that are loaded async. Router does not officially support this.
Please note, migration to v4 is a BREAKING change.
https://github.com/reactGo/reactGo/pull/841/files
*/
const SplitFrontPage = (l, c) => require.ensure([], () => c(null, require('./views/FrontPage').default))
const SplitNotFound = (l, c) => require.ensure([], () => c(null, require('./views/NotFound').default))
const SplitInterns = (l, c) => require.ensure([], () => c(null, require('./views/Interns').default))
const SplitGrads = (l, c) => require.ensure([], () => c(null, require('./views/Grads').default))
const SplitCoOps = (l, c) => require.ensure([], () => c(null, require('./views/CoOps').default))
const SplitProgram = (l, c) => require.ensure([], () => c(null, require('./views/Program').default))

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  /*
  Router Props:
  component: Pages included in the core JS bundle.
  getComponent: JS bundles for dynamically loading pages (users who visit the SPA only get the components needed for their route, and the bundle expands as necessary during their session)
  (read up on Code Splitting if this is confusing)
  onEnter: Auth / Permissions enforcement. Redirects unauthorized users
  */
  return (
    <Route path='/' component={UI} >
      <IndexRoute getComponent={SplitFrontPage} />
      <Route path='/interns' getComponent={SplitInterns} />
      <Route path='/grads' getComponent={SplitGrads} />
      <Route path='/coops' getComponent={SplitCoOps} />
      <Route path='/interns/:id' getComponent={SplitProgram} />
      <Route path='/grads/:id' getComponent={SplitProgram} />
      <Route path='/coops/:id' getComponent={SplitProgram} />
      <Route path='*' getComponent={SplitNotFound} />
    </Route>
  )
}
