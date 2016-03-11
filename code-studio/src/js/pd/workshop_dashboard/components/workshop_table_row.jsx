/* global React */

var SessionTimesList = require('./session_times_list.jsx');
var FacilitatorsList = require('./facilitators_list.jsx');

var WorkshopTableRow = React.createClass({
  propTypes: {
    workshop: React.PropTypes.shape({
      sessions: React.PropTypes.array.isRequired,
      location_name: React.PropTypes.string.isRequired,
      workshop_type: React.PropTypes.string.isRequired,
      enrolled_teacher_count: React.PropTypes.number.isRequired,
      capacity: React.PropTypes.number.isRequired,
      facilitators: React.PropTypes.array.isRequired,
      state: React.PropTypes.string.isRequired
    }).isRequired,
    onView: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  handleViewClick: function (e) {
    e.preventDefault();
    this.props.onView(this.props.workshop);
  },
  handleEditClick: function (e) {
    e.preventDefault();
    this.props.onEdit(this.props.workshop);
  },
  handleDeleteClick: function (e) {
    e.preventDefault();
    this.props.onDelete(this.props.workshop);
  },

  render: function () {
    return (
      <tr>
        <td>
          <SessionTimesList sessions={this.props.workshop.sessions} />
        </td>
        <td>
          {this.props.workshop.location_name}
        </td>
        <td>
          {this.props.workshop.workshop_type}
        </td>
        <td>
          {this.props.workshop.enrolled_teacher_count} / {this.props.workshop.capacity}
        </td>
        <td>
          <FacilitatorsList facilitators={this.props.workshop.facilitators} />
        </td>
        <td>
          {this.props.workshop.state}
        </td>
        <td>
          <button className="btn btn-mini" onClick={this.handleViewClick}>View</button>
          <button className="btn btn-mini" onClick={this.handleEditClick}>Edit</button>
          <button className="btn btn-mini" onClick={this.handleDeleteClick}>Delete</button>
        </td>
      </tr>
    );
  }
});
module.exports = WorkshopTableRow;
