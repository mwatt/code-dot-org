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


var Dialog = require('@cdo/apps/templates/DialogComponent');

var ConfirmDialog = React.createClass({
  getInitialState: function() {
    return {isOpen: false}
  },

  openDialog: function() {
    this.setState({isOpen: true});
  },

  handleClose: function () {
    this.setState({isOpen: false});
  },

  render: function () {
    return (
      <div>
        <h1>I am a heading!</h1>
        <button onClick={this.openDialog}>Click me</button>
        <Dialog isOpen={this.state.isOpen} handleClose={this.handleClose} style={{width: 200, height: 100}}>
          <h1 style={{width: 200, height: 100}}>
            I am a dialog!
          </h1>
        </Dialog>
      </div>
    );
  }
});
WorkshopDashboard = React.createElement(ConfirmDialog);


module.exports = WorkshopDashboard;

window.WorkshopDashboard = WorkshopDashboard;
