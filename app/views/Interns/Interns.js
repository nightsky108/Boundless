import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import { connectRequest } from 'redux-query'
// import api from '../../services'
import { Loading } from '../../components'

import { Link } from 'react-router'
import FontIcon from 'react-md/lib/FontIcons'
import ReactTable from 'react-table'

const example = {
  company: 'T-Mobile',
  industry: 'Telecom',
  standing: ['Juniors'],
  roles: ['DevOps', 'SWE', 'IT'],
  sponsorship: false,
  inclusive: undefined,
  compensation: 3.5,
  interview: 'Behavioral',
  rounds: 1,
  challenges: ['Technical Phone Screen']
}

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
    internships: PropTypes.arrayOf({
      company: PropTypes.string,
      industry: PropTypes.string,
      standing: PropTypes.array,
      roles: PropTypes.array,
      sponsorship: PropTypes.bool,
      inclusive: PropTypes.bool,
      compensation: PropTypes.number,
      interview: PropTypes.string,
      rounds: PropTypes.number,
      challenges: PropTypes.array
    })
  }
  static defaultProps = {
    internships: [example]
  }
  columns = [
    {
      Header: 'Company',
      columns: [
        {
          Header: 'Name',
          accessor: 'company',
          Cell: row => (
            <a href={row.value}>{row.value}</a>
          )
        },
        {
          Header: 'Industry',
          accessor: 'industry'
        }
      ]
    },
    {
      Header: 'Pipeline',
      columns: [
        {
          Header: 'Standing',
          accessor: 'standing',
          Cell: row => (<span>{row.value.join(', ')}</span>)
        },
        {
          Header: 'Roles',
          accessor: 'roles',
          Cell: row => (<span>{row.value.join(', ')}</span>)
        }
      ]
    },
    {
      Header: 'Interviews',
      columns: [
        {
          Header: 'Type',
          accessor: 'interview'
        },
        {
          Header: 'Rounds',
          accessor: 'rounds'
        },
        {
          Header: 'Challenges',
          accessor: 'challenges',
          Cell: row => (<span>{row.value.join(', ')}</span>)
        }
      ]
    }, {
      Header: 'Offers',
      columns: [
        {
          Header: 'Sponsorship',
          accessor: 'sponsorship',
          Cell: row => (
            typeof row.value === 'boolean'
              ? <FontIcon style={{ textAlign: 'center' }}>{row.value ? 'check' : 'not_interested'}</FontIcon>
              : <span>N/A</span>
          )
        },
        {
          Header: 'Inclusive',
          accessor: 'inclusive',
          Cell: row => (
            typeof row.value === 'boolean'
              ? <FontIcon>{row.value ? 'check' : 'not_interested'}</FontIcon>
              : <span>N/A</span>
          )
        },
        {
          Header: 'Compensation',
          accessor: 'compensation'
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
        <Helmet title='Internships' />
        <Loading render={1 > 0} title='Internship Table' tip='Loading Internships...'>
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
