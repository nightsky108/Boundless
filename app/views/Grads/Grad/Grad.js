import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../../../services'
import { Loading } from '../../../components'

import { Link } from 'react-router'
import ReactTable from 'react-table'

@compose(
  connect(state => ({
    grad: state.db.grad,
    filters: state.filters
  })),
  connectRequest(() => api.get('programs'))
)
class Grad extends React.Component {
  static defaultProps = {
    internship: PropTypes.object
  }
  static defaultProps = {
    internship: {}
  }
  render (
    { columns } = this,
    { params, internship } = this.props
  ) {
    return (
      <article>
        <Helmet title='New Grad' />
        <Loading render={Object.keys(internship) > 0} title='New Grad Program' tip='Loading New Grad Program...'>
          <section>
            {JSON.stringify(internship)}
          </section>
        </Loading>
      </article>
    )
  }
}

export default Internship
