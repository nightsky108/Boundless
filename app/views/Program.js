import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../services'
import { Loading, Program } from '../components'

@compose(
  connect(state => ({
    program: state.db.program,
    filters: state.filters
  })),
  connectRequest((props) =>
    api.get('program', { id: props.params.id })
  )
)
class ProgramPage extends React.Component {
  static defaultProps = {
    program: PropTypes.shape({
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
    program: {}
  }
  render (
    { params, program } = this.props
  ) {
    return (
      <article>
        <Helmet title='Program' />
        <Loading render={program._id} title='Program' tip='Loading Program...'>
          <section>
            <Program {...program} />
          </section>
        </Loading>
      </article>
    )
  }
}

export default ProgramPage
