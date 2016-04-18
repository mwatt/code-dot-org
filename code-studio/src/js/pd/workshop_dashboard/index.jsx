/* global React WORKSHOP_CONSTANTS */

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var useRouterHistory = require('react-router').useRouterHistory;
var createHistory = require('history').createHistory;
var WorkshopForm = require('./workshop_form.jsx');
var Workshop = require('./workshop.jsx');
var WorkshopIndex = require('./workshop_index.jsx');
var WorkshopAttendance = require('./attendance/workshop_attendance.jsx');
var WorkshopBreadcrumbs = require('./workshop_breadcrumbs.jsx');

var ROOT_PATH = '/pd/workshop_dashboard';
var browserHistory = useRouterHistory(createHistory)({
  basename: ROOT_PATH
});

var WorkshopDashboard = (
  <Router history={browserHistory} >
    <Route path="/" component={WorkshopBreadcrumbs}>
      <IndexRoute component={WorkshopIndex} />
      <Route
        path="new"
        breadcrumbs={["New Workshop"]}
        component={WorkshopForm}
      />
      <Route
        path=":workshopId"
        breadcrumbs={["Workshop"]}
        component={Workshop}
      />
      <Route
        path=":workshopId/edit"
        breadcrumbs={["Workshop", "Edit"]}
        component={WorkshopForm}
      />
      <Route
        path=":workshopId/attendance(/:sessionIndex)"
        breadcrumbs={["Workshop", "Take Attendance"]}
        component={WorkshopAttendance}
      />
    </Route>
  </Router>
);

module.exports = WorkshopDashboard;

window.WorkshopDashboard = WorkshopDashboard;
