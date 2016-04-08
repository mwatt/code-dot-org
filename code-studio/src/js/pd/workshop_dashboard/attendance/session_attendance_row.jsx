/* global React */

var SessionAttendanceRow = React.createClass({
  propTypes: {
    attendance: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      email: React.PropTypes.string.isRequired,
      enrolled: React.PropTypes.bool.isRequired,
      user_id: React.PropTypes.number,
      in_section: React.PropTypes.bool.isRequired,
      attended: React.PropTypes.bool.isRequired
    }).isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  renderBoolCell: function (value) {
    var contents = value ? 'Yes' : 'No';
    return (
      <td>
        {contents}
      </td>
    );
  },

  handleClickAttended: function (e) {
    e.preventDefault();

    // TODO - prevent clicking and warn when not in the session

    this.props.onChange();
  },

  renderAttendedCell: function () {
    var checkBox = this.props.attendance.attended ? <i className="fa fa-check-square-o" /> : <i className="fa fa-square-o" />;

    return (
      <td style={{cursor:'pointer'}} onClick={this.handleClickAttended}>
        {checkBox}
      </td>
    );
  },

  render: function () {
    return (
      <tr className={this.props.attendance.attended ? 'success' : null}>
        <td>
          {this.props.attendance.name}
        </td>
        <td>
          {this.props.attendance.email}
        </td>
        {this.renderBoolCell(this.props.attendance.enrolled)}
        {this.renderBoolCell(this.props.attendance.user_id)}
        {this.renderBoolCell(this.props.attendance.in_section)}
        {this.renderAttendedCell(this.props.attendance.attended)}
      </tr>
    );
  }
});
module.exports = SessionAttendanceRow;
