import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import { connectRequest } from 'redux-query'
// import api from '../../services'
import { Loading } from '../../components'

import { Link } from 'react-router'
import ReactTable from 'react-table'

@compose(
  connect(state => ({
    internships: state.db.internships,
    filters: state.filters
  }))
  // connectRequest(()=> {
  //
  // })
)
class CVETable extends React.Component {
  static defaultProps = {
    internships: PropTypes.array
  }
  static defaultProps = {
    internships: []
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
    { params, internships } = this.props
  ) {
    return (
      <article>
        <Helmet title='Home' />
        <Loading render={internships.length > 0} title='CVE Table' tip='Loading CVE...'>
          <section>
            <ReactTable
              data={internships}
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

export default CVETable
