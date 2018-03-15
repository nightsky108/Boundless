import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import { connectRequest } from 'redux-query'
// import api from '../../../services'
import { Loading } from '../../../components'

@compose(
  connect(state => ({
    internship: state.db.internship,
    filters: state.filters
  }))
  // connectRequest(()=> {
  //
  // })
)
class Internship extends React.Component {
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
        <Helmet title='Home' />
        <Loading render={Object.keys(internship) > 0} title='CVE Table' tip='Loading CVE...'>
          <section>
            {JSON.stringify(internship)}
          </section>
        </Loading>
      </article>
    )
  }
}

export default Internship
