/* global React */

var SessionAttendanceRow = require('./session_attendance_row.jsx');
var Table = require('react-bootstrap').Table;

var SessionAttendance = React.createClass({
  propTypes: {
    attendances: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange: function (i) {
    this.props.onChange(i, !this.props.attendances[i].attended);
  },

  render: function () {
    var tableRows = this.props.attendances.map(function (attendance, i) {
      return (<SessionAttendanceRow key={i} attendance={attendance} onChange={this.handleChange.bind(null,i)}/>);
    }.bind(this));
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Enrolled</th>
              <th>Code Studio Account</th>
              <th>Joined Section</th>
              <th>Attended</th>
            </tr>
          </thead>
          <tbody>
          {tableRows}
          </tbody>
        </Table>
      </div>
    );
  }
});
module.exports = SessionAttendance;
