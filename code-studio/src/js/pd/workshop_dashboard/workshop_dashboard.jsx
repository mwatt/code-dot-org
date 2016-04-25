/* global React WORKSHOP_CONSTANTS */

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var useRouterHistory = require('react-router').useRouterHistory;
var createHistory = require('history').createHistory;
var WorkshopForm = require('./workshop_form.jsx');
var Workshop = require('./workshop.jsx');
var Header = require('./header.jsx');
var WorkshopDashboardIndex = require('./workshop_dashboard_index.jsx');
var WorkshopIndex = require('./workshop_index.jsx');
var WorkshopAttendance = require('./attendance/workshop_attendance.jsx');
var DistrictReport = require('./reports/district_report.jsx');
var WorkshopOrganizerReport = require('./reports/workshop_organizer_report.jsx');
var TeacherProgressReport = require('./reports/teacher_progress_report.jsx');

var ROOT_PATH = '/pd/workshop_dashboard';
var browserHistory = useRouterHistory(createHistory)({
  basename: ROOT_PATH
});

var WorkshopDashboard = (
  <Router history={browserHistory} >
    <Route path="/" component={Header}>
      <IndexRoute component={WorkshopDashboardIndex}/>
      <Route path="workshops" breadcrumbs="Workshops" component={WorkshopIndex}/>
      <Route path="workshops/new" breadcrumbs="Workshops,New Workshop" component={WorkshopForm}/>
      <Route path="workshops/:workshopId" breadcrumbs="Workshops,View Workshop" component={Workshop}/>
      <Route path="workshops/:workshopId/edit" breadcrumbs="Workshops,Edit Workshop" component={WorkshopForm}/>
      <Route
        path="workshops/:workshopId/attendance(/:sessionIndex)"
        breadcrumbs="Workshops,Workshop,Take Attendance"
        component={WorkshopAttendance}
      />
      <Redirect from="reports" to="/" />
      <Route
        path="reports/district"
        breadcrumbs="Reports,District Report"
        component={DistrictReport}
      />
      <Route
        path="reports/organizer"
        breadcrumbs="Reports,Workshop Organizer Report"
        component={WorkshopOrganizerReport}
      />
      <Route
        path="reports/teacher_progress"
        breadcrumbs="Reports,Teacher Progress Report"
        component={TeacherProgressReport}
      />
    </Route>
  </Router>
);

module.exports = WorkshopDashboard;

window.WorkshopDashboard = WorkshopDashboard;
