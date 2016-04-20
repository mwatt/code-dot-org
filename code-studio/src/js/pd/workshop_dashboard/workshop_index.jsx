/* global React */

var WorkshopTableRow = require('./components/workshop_table_row.jsx');
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;

var WorkshopIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      loading: true,
      workshops: null
    };
  },

  componentDidMount: function () {
    $.ajax({
        method: 'GET',
        url: '/api/v1/pd/workshops',
        dataType: 'json'
      })
      .done(function (data) {
        this.setState({
          loading: false,
          workshops: data
        });
      }.bind(this));
  },

  handleView: function (workshop) {
    this.context.router.push('/Workshops/' + workshop.id);
  },
  handleEdit: function (workshop) {
    this.context.router.push('/Workshops/' + workshop.id + '/edit');
  },
  handleDelete: function (workshop_index, workshop) {
    $.ajax({
        method: 'DELETE',
        url: '/api/v1/pd/workshops/' + workshop.id
      })
      .done(function () {
        this.state.workshops.splice(workshop_index, 1);
        this.setState(this.state);
      }.bind(this));
  },

  handleNewWorkshopClick: function (e) {
    e.preventDefault();
    this.context.router.push('/Workshops/new');
  },

  renderTable: function () {
    if (this.state.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x" />;
    }
    var tableRows = this.state.workshops.map(function (workshop, i) {
      return <WorkshopTableRow
        workshop={workshop}
        key={workshop.id}
        onView={this.handleView}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete.bind(this, i)}
      />;
    }.bind(this));
    return (
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Date and Time</th>
          <th>Location</th>
          <th>Type</th>
          <th>Signups</th>
          <th>Facilitators</th>
          <th>Current State</th>
          <th>Manage</th>
        </tr>
        </thead>
        <tbody>
        {tableRows}
        </tbody>
      </Table>
    );
  },

  render: function () {
    return (
      <div>
        <h1>Your Workshops</h1>
        <p>
          <Button onClick={this.handleNewWorkshopClick}>New Workshop</Button>
        </p>
        {this.renderTable()}
      </div>
    );
  }
});
module.exports = WorkshopIndex;
