import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../services'
import { Loading, Programs } from '../components'

@compose(
  connect(state => ({
    coops: state.db.coops,
    filters: state.filters
  })),
  connectRequest(() => api.get('programs', {
    query: { type: 'CoOp' },
    populate: ['company'],
    transform: res => ({ coops: res }),
    update: { coops: (prev, next) => next }
  }))
)
class CoOps extends React.Component {
  static defaultProps = {
    coops: PropTypes.array
  }
  static defaultProps = {
    coops: []
  }
  render (
    { params, coops } = this.props
  ) {
    return (
      <article>
        <Helmet title='CoOp Programs' />
        <Loading render={coops.length > 0} title='CoOp Programs' tip='Loading CoOp Programs...'>
          <section>
            <Programs data={coops} />
          </section>
        </Loading>
      </article>
    )
  }
}

export default CoOps
