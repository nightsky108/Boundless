import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../services'
import { Loading } from '../components'

@compose(
  connect(state => ({
    grads: state.db.grads,
    filters: state.filters
  })),
  connectRequest(()=> api.get('programs', {
    query: { type: 'New Grad' },
    transform: res => ({ grads: res }),
    update: { grads: (prev, next) => next }
  }))
)
class Grads extends React.Component {
  static defaultProps = {
    grads: PropTypes.array
  }
  static defaultProps = {
    grads: []
  }
  render (
    { params, grads } = this.props
  ) {
    return (
      <article>
        <Helmet title='New Grads' />
        <Loading render={grads.length > 0} title='New Grad Programs' tip='Loading New Grad Programs...'>
          <section>
            {JSON.stringify(grads)}
          </section>
        </Loading>
      </article>
    )
  }
}

export default Grads
