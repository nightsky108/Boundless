import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../../../services'
import { Loading } from '../../../components'

@compose(
  connect(state => ({
    grad: state.db.grad,
    filters: state.filters
  })),
  connectRequest((props) => api.get('program', {
    id: props.params.id,
    transform: res => ({ grad: res }),
    update: { grad: (prev, next) => next }
  }))
)
class Grad extends React.Component {
  static defaultProps = {
    grad: PropTypes.object
  }
  static defaultProps = {
    grad: {}
  }
  render (
    { columns } = this,
    { params, grad } = this.props
  ) {
    return (
      <article>
        <Helmet title='New Grad' />
        <Loading render={Object.keys(grad) > 0} title='New Grad Program' tip='Loading New Grad Program...'>
          <section>
            {JSON.stringify(grad)}
          </section>
        </Loading>
      </article>
    )
  }
}

export default Grad
