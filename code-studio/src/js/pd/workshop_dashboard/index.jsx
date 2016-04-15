/* global React WORKSHOP_CONSTANTS */


// FINDME!
var React = require('react');


var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var useRouterHistory = require('react-router').useRouterHistory;
var createHistory = require('history').createHistory;
var WorkshopForm = require('./workshop_form.jsx');
var Workshop = require('./workshop.jsx');
var WorkshopIndex = require('./workshop_index.jsx');
var WorkshopAttendance = require('./attendance/workshop_attendance.jsx');

var ROOT_PATH = '/pd/workshop_dashboard';
var browserHistory = useRouterHistory(createHistory)({
  basename: ROOT_PATH
});

var WorkshopDashboard = (
  <Router history={browserHistory} >
    <Route path="/">
      <IndexRoute component={WorkshopIndex} />
      <Route path="new" component={WorkshopForm} />
      <Route path=":workshopId" component={Workshop} />
      <Route path=":workshopId/edit" component={WorkshopForm} />
      <Route path=":workshopId/attendance(/:sessionIndex)" component={WorkshopAttendance} />
    </Route>
  </Router>
);

module.exports = WorkshopDashboard;

window.WorkshopDashboard = WorkshopDashboard;
