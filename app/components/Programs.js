import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router'
import {
  DataTable,
  TableHeader,
  TableCardHeader,
  TableBody,
  TableRow,
  TableColumn
} from 'react-md'

const arrayString = (arr) => Array.isArray(arr)
  ? arr.join(', ')
  : JSON.stringify(arr)

class Programs extends React.Component {
  static defaultProps = {
    data: PropTypes.arrayOf({
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
    data: []
  }
  columns = [
    'Company / Program',
    'Size',
    'Industry',
    'Roles',
    'Eligibility',
    'Interviews',
    'Offers'
  ]
  render (
    { columns } = this,
    { data } = this.props
  ) {
    console.log(data)
    return (
      <DataTable baseId='simple-selectable-table' indeterminate>
        <TableHeader>
          <TableRow>
            {columns.map(col => (
              <TableColumn key={col} grow>{col}</TableColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((program, i) => (
            <TableRow key={i}>
              <TableColumn>
                {program.company.name}
                {program.name ? ` - ${program.name}` : ''}
              </TableColumn>
              <TableColumn>
                {'(size)'}
              </TableColumn>
              <TableColumn>
                {program.company.industry}
              </TableColumn>
              <TableColumn>
                {arrayString(program.roles)}
                <br />
                <em>{`Industry: ${program.company.industry}`}</em>
              </TableColumn>
              <TableColumn>
                {arrayString(program.eligible)}
              </TableColumn>
              <TableColumn>
                {arrayString(program.interviews)}
                <br />
                {arrayString(program.challenges)}
              </TableColumn>
              <TableColumn>
                {`${program.compensation} stars`}
              </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    )
  }
}
export default Programs
