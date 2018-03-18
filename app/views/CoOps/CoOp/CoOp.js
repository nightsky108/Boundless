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
    coop: state.db.coop,
    filters: state.filters
  })),
  connectRequest(() => api.get('programs'))
)
class CoOp extends React.Component {
  static defaultProps = {
    internship: PropTypes.object
  }
  static defaultProps = {
    coop: {}
  }
  render (
    { columns } = this,
    { params, coop } = this.props
  ) {
    return (
      <article>
        <Helmet title='CoOp' />
        <Loading render={Object.keys(coop) > 0} title='CoOp Program' tip='Loading CoOp Program...'>
          <section>
            {JSON.stringify(coop)}
          </section>
        </Loading>
      </article>
    )
  }
}

export default CoOp
