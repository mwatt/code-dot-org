/* global React */

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

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

  isValid: function () {
    // Must have a user account and join the section before being marked attended.
    return this.props.attendance.user_id && this.props.attendance.in_section;
  },

  handleClickAttended: function (e) {

    if (this.isValid()) {
      this.props.onChange();
    }
  },

  renderAttendedCell: function () {
    var checkBox = this.props.attendance.attended ? <i className="fa fa-check-square-o" /> : <i className="fa fa-square-o" />;
    var cell = (
      <td style={{cursor:'pointer'}} onClick={this.handleClickAttended}>
        {checkBox}
      </td>
    );

    if (!this.isValid()) {
      var tooltop = (
        <Tooltip id={0}>
          Teachers must have a Code Studio account and join the section before they can be marked attended.
        </Tooltip>
      );
      return (
        <OverlayTrigger overlay={tooltop} placement="left" delayShow={500}>
          {cell}
        </OverlayTrigger>
      );
    }
    return cell;
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
