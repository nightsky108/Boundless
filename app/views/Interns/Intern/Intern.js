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
    intern: state.db.intern,
    filters: state.filters
  })),
  connectRequest((props) => api.get('program', {
    id: props.params.id,
    transform: res => ({ intern: res }),
    update: { intern: (prev, next) => next }
  }))
)
class Internship extends React.Component {
  static defaultProps = {
    intern: PropTypes.object
  }
  static defaultProps = {
    intern: {}
  }
  render (
    { columns } = this,
    { params, intern } = this.props
  ) {
    return (
      <article>
        <Helmet title='Internship' />
        <Loading render={Object.keys(intern) > 0} title='Internship Program' tip='Loading Internship Details...'>
          <section>
            {JSON.stringify(intern)}
          </section>
        </Loading>
      </article>
    )
  }
}

export default Internship
