/* global React */

var Report = require('./report.jsx');

var WorkshopOrganizerReport = React.createClass({
  render: function () {
    return (
      <Report dataUrl="/api/v1/pd/workshop_organizer_report" />
    );
  }
});
module.exports = WorkshopOrganizerReport ;
