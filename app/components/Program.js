import React from 'react'
import PropTypes from 'prop-types'

class Program extends React.Component {
  static defaultProps = {
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
  }
  static defaultProps = {
    company: 'Company',
    industry: 'Technology',
    eligible: undefined,
    roles: [],
    relocation: undefined,
    sponsorship: undefined,
    inclusive: undefined,
    compensation: 0,
    interviews: [],
    challenges: []
  }
  render () {
    return (
      <div>
        <h2>Program Component</h2>
        {JSON.stringify(this.props)}
      </div>
    )
  }
}
export default Program
