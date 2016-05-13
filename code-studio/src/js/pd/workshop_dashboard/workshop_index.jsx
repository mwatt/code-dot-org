/* global React */

var WorkshopTable = require('./components/workshop_table.jsx');
// var WorkshopTableRow = require('./components/workshop_table_row.jsx');
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;

var WorkshopIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleNewWorkshopClick: function (e) {
    this.context.router.push('/workshops/new');
  },

  render: function () {
    return (
      <div>
        <h1>Your Workshops</h1>
        <p>
          <Button onClick={this.handleNewWorkshopClick}>New Workshop</Button>
        </p>
        <h2>In Progress:</h2>
        <WorkshopTable
          queryUrl="/api/v1/pd/workshops/?state=In%20Progress"
          canDelete
        />
        <h2>Upcoming:</h2>
        <WorkshopTable
          queryUrl="/api/v1/pd/workshops/?state=Not%20Started"
          canEdit
          canDelete
        />
        <h2>Past:</h2>
        <WorkshopTable
          queryUrl="/api/v1/pd/workshops/?state=Ended"
          canDelete
        />
      </div>
    );
  }
});
module.exports = WorkshopIndex;
