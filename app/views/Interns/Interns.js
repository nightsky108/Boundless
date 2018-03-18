import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import api from '../../services'
import { Loading } from '../../components'

import { Link } from 'react-router'
import FontIcon from 'react-md/lib/FontIcons'
import ReactTable from 'react-table'

const StatusIndicatorCell = (value) =>
  value === 'boolean'
    ? <FontIcon style={{ textAlign: 'center' }}>{row.value ? 'check' : 'not_interested'}</FontIcon>
    : <span>N/A</span>

const example = {
  company: 'T-Mobile',
  industry: 'Telecom',
  candidates: ['Juniors'],
  roles: ['DevOps', 'SWE', 'IT'],
  sponsorship: false,
  inclusive: undefined,
  compensation: 3.5,
  interviews: ['Technical Phone Screen', 'Behavioral']
}

@compose(
  connect(state => ({
    interns: state.db.interns,
    filters: state.filters
  })),
  connectRequest(()=> api.get('programs', {
    query: { type: 'Intern' },
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
          Header: 'Eligible',
          accessor: 'eligible',
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
        }
      ]
    }, {
      Header: 'Offers',
      columns: [
        {
          Header: 'Relocation',
          accessor: 'relocation',
          Cell: row => <StatusIndicatorCell value={row.value} />
        },
        {
          Header: 'Sponsorship',
          accessor: 'sponsorship',
          Cell: row => <StatusIndicatorCell value={row.value} />
        },
        {
          Header: 'Inclusive',
          accessor: 'inclusive',
          Cell: row => <StatusIndicatorCell value={row.value} />
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
    { params, interns } = this.props
  ) {
    return (
      <article>
        <Helmet title='Internships' />
        <Loading render={1 > 0} title='Internship Programs' tip='Loading Internships...'>
          <section>
            {JSON.stringify(interns)}
          </section>
        </Loading>
      </article>
    )
  }
}

// <ReactTable
//   data={interns}
//   columns={columns}
//   defaultPageSize={20}
//   className='-striped -highlight'
// />

export default Interns
