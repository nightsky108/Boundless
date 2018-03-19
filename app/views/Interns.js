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
    interns: state.db.interns,
    filters: state.filters
  })),
  connectRequest(() => api.get('programs', {
    query: { type: 'Intern' },
    populate: ['company'],
    transform: res => ({ interns: res }),
    update: { interns: (prev, next) => next }
  }))
)
class Interns extends React.Component {
  static defaultProps = {
    interns: PropTypes.arrayOf({
      company: PropTypes.string,
      industry: PropTypes.string,
      eligible: PropTypes.array,
      roles: PropTypes.array,
      relocation: PropTypes.bool,
      sponsorship: PropTypes.bool,
      inclusive: PropTypes.bool,
      compensation: PropTypes.number,
      interviews: PropTypes.array,
      challenges: PropTypes.array
    })
  }
  static defaultProps = {
    interns: []
  }
  render (
    { params, interns } = this.props
  ) {
    return (
      <article>
        <Helmet title='Internships' />
        <Loading render={interns.length > 0} title='Internship Programs' tip='Loading Internships...'>
          <section>
            <Programs data={interns} />
          </section>
        </Loading>
      </article>
    )
  }
}

export default Interns
