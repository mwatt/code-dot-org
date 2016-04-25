/* global React */

var Report = require('./report.jsx');

var DistrictReport = React.createClass({
  render: function () {
    return (
      <Report dataUrl="/api/v1/pd/district_report" />
    );
  }
});
module.exports = DistrictReport;
