/* global React */

var Link = require('react-router').Link;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;


var WorkshopDashboardIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <Grid>
        <Row>
          <Col offset={1}>
            <Link to="/workshops">
                <h3>Workshops</h3>
            </Link>
            <Link to="/reports/district">
              <h3>District Report</h3>
            </Link>
            <Link to="/reports/organizer">
              <h3>Workshop Organizer Report</h3>
            </Link>
            <Link to="/reports/teacher_progress">
              <h3>Teacher Progress Report</h3>
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  }
});
module.exports = WorkshopDashboardIndex;
