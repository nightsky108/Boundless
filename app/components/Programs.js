import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Loading } from './'

// import { Link } from 'react-router'
import FontIcon from 'react-md/lib/FontIcons'
import ReactTable from 'react-table'

const StatusIndicatorCell = (row) =>
  typeof row.value === 'boolean'
    ? <FontIcon style={{ textAlign: 'center' }}>{row.value ? 'check' : 'not_interested'}</FontIcon>
    : null

const ArrayCell = (row) => <span>{Array.isArray(row.value) ? row.value.join(', ') : JSON.stringify(row.value)}</span>

class Programs extends React.Component {
  static defaultProps = {
    programs: PropTypes.arrayOf({
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
    programs: []
  }
  columns = [
    {
      Header: 'Company',
      columns: [
        {
          Header: 'Name',
          accessor: 'company.name',
          Cell: row => <a href={`/interns/${row.original._id}`}>{row.value}</a>
        },
        {
          Header: 'Industry',
          accessor: 'company.industry'
        }
      ]
    },
    {
      Header: 'Pipeline',
      columns: [
        {
          Header: 'Eligible',
          accessor: 'eligible',
          Cell: ArrayCell
        },
        {
          Header: 'Roles',
          accessor: 'roles',
          Cell: ArrayCell
        },
        {
          Header: 'Locations',
          accessor: 'locations',
          Cell: ArrayCell
        }
      ]
    },
    {
      Header: 'Hiring Process',
      columns: [
        {
          Header: 'Interviews',
          accessor: 'interviews',
          Cell: ArrayCell
        },
        {
          Header: 'Challenges',
          accessor: 'challenges',
          Cell: ArrayCell
        }
      ]
    }, {
      Header: 'Offers',
      columns: [
        {
          Header: 'Relocation',
          accessor: 'relocation',
          Cell: StatusIndicatorCell
        },
        {
          Header: 'Sponsorship',
          accessor: 'sponsorship',
          Cell: StatusIndicatorCell
        },
        {
          Header: 'Inclusive',
          accessor: 'inclusive',
          Cell: StatusIndicatorCell
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
    { programs } = this.props
  ) {
    return (
      <article>
        <Helmet title='Internships' />
        <Loading render={programs.length > 0} title='Internship Programs' tip='Loading Internships...'>
          <section>
            <ReactTable
              data={programs}
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
export default Programs
