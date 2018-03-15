import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Template from './views/Template/Template'
/*
CODE SPLITTING:
This weird hackery is the most clean way to split components into different JS
files that are loaded async. Router does not officially support this.
Please note, migration to v4 is a BREAKING change.
https://github.com/reactGo/reactGo/pull/841/files
*/
const SplitFrontPage = (l, c) => require.ensure([], () => c(null, require('./views/FrontPage/FrontPage').default))
const SplitInterns = (l, c) => require.ensure([], () => c(null, require('./views/Interns/Interns').default))
const SplitIntern = (l, c) => require.ensure([], () => c(null, require('./views/Interns/Intern/Intern').default))
const SplitGrads = (l, c) => require.ensure([], () => c(null, require('./views/Grads/Grads').default))
const SplitGrad = (l, c) => require.ensure([], () => c(null, require('./views/Grads/Grad/Grad').default))
const SplitCoOps = (l, c) => require.ensure([], () => c(null, require('./views/CoOps/CoOps').default))
const SplitCoOp = (l, c) => require.ensure([], () => c(null, require('./views/CoOps/CoOp/CoOp').default))
const SplitNotFound = (l, c) => require.ensure([], () => c(null, require('./views/NotFound/NotFound').default))

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
    <Route path='/' component={Template} >
      <IndexRoute getComponent={SplitFrontPage} />
      <Route path='/interns' getComponent={SplitInterns} />
      <Route path='/interns/:id' getComponent={SplitIntern} />
      <Route path='/grads' getComponent={SplitGrads} />
      <Route path='/grads/:id' getComponent={SplitGrad} />
      <Route path='/coops' getComponent={SplitCoOps} />
      <Route path='/coops/:id' getComponent={SplitCoOp} />
      <Route path='*' getComponent={SplitNotFound} />
    </Route>
  )
}
