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
    coops: state.db.coops,
    filters: state.filters
  })),
  connectRequest(()=> api.get('programs', {
    query: { type: 'CoOp' },
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
    { params, coops } = this.props
  ) {
    return (
      <article>
        <Helmet title='CoOp Programs' />
        <Loading render={coops.length > 0} title='CoOp Programs' tip='Loading CoOp Programs...'>
          <section>
            <ReactTable
              data={coops}
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

export default CoOps
