/* global React */

var Report = require('./report.jsx');

var TeacherProgressReport = React.createClass({
  render: function () {
    return (
      <Report dataUrl="/api/v1/pd/teacher_progress_report" />
    )
  }
});
module.exports = TeacherProgressReport ;
