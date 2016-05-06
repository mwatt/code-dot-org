/* global React WORKSHOP_CONSTANTS */

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Redirect = require('react-router').Redirect;
const IndexRoute = require('react-router').IndexRoute;
const useRouterHistory = require('react-router').useRouterHistory;
const createHistory = require('history').createHistory;
const NewWorkshop = require('./new_workshop.jsx');
const Workshop = require('./workshop.jsx');
const Header = require('./header.jsx');
const WorkshopDashboardIndex = require('./workshop_dashboard_index.jsx');
const WorkshopIndex = require('./workshop_index.jsx');
const WorkshopAttendance = require('./attendance/workshop_attendance.jsx');
const DistrictReport = require('./reports/district_report.jsx');
const WorkshopOrganizerReport = require('./reports/workshop_organizer_report.jsx');
const TeacherProgressReport = require('./reports/teacher_progress_report.jsx');

const ROOT_PATH = '/pd/workshop_dashboard';
const browserHistory = useRouterHistory(createHistory)({
  basename: ROOT_PATH
});

const WorkshopDashboard = (
  <Router history={browserHistory} >
    <Route path="/" component={Header}>
      <IndexRoute component={WorkshopDashboardIndex}/>
      <Route
        path="workshops"
        breadcrumbs="Workshops"
        component={WorkshopIndex}
      />
      <Route
        path="workshops/new"
        breadcrumbs="Workshops,New Workshop"
        component={NewWorkshop}
      />
      <Route
        path="workshops/:workshopId"
        breadcrumbs="Workshops,View Workshop"
        component={Workshop}
        view="show"
      />
      <Route
        path="workshops/:workshopId/edit"
        breadcrumbs="Workshops,Edit Workshop"
        component={Workshop}
        view="edit"
      />
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
