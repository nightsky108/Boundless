import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../../services'
import { Loading } from '../../components'

import { Link } from 'react-router'
import ReactTable from 'react-table'

@compose(
  connect(state => ({
    grads: state.db.grads,
    filters: state.filters
  })),
  connectRequest(() => api.get('programs'))
)
class Grads extends React.Component {
  static defaultProps = {
    grads: PropTypes.array
  }
  static defaultProps = {
    grads: []
  }
  columns = [
    {
      Header: 'Overview',
      columns: [
        {
          Header: 'CVE',
          accessor: 'CVE',
          Cell: row => (
            <Link to={`/cve/${row.value}`}>{row.value}</Link>
          )
        },
        {
          Header: 'CWE',
          accessor: 'CWE'
        }
      ]
    },
    {
      Header: 'Severity',
      columns: [
        {
          Header: 'Level',
          accessor: 'severity'
        },
        {
          Header: 'Score',
          accessor: 'cvss3_score'
        }
      ]
    },
    {
      Header: 'Description',
      columns: [
        {
          Header: 'Bugzilla',
          accessor: 'bugzilla_description'
        },
        {
          Header: 'API Source',
          accessor: 'resource_url'
        }
      ]
    }
  ]
  render (
    { columns } = this,
    { params, grads } = this.props
  ) {
    return (
      <article>
        <Helmet title='New Grads' />
        <Loading render={grads.length > 0} title='New Grad Programs' tip='Loading New Grad Programs...'>
          <section>
            <ReactTable
              data={grads}
              columns={columns}
              defaultPageSize={20}
              className='-striped -highlight'
            />
          </section>
        </Loading>
      </article>
    )
  }
}

export default Grads
