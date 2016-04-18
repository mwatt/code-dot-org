/* global React */

var SessionTime = require('../components/session_time.jsx');
var SessionAttendance = require('./session_attendance.jsx');
var Row = require('react-bootstrap').Row;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var Col = require('react-bootstrap').Col;

var WorkshopAttendance = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  propTypes: {
    params: React.PropTypes.shape({
      workshopId: React.PropTypes.string.isRequired,
      sessionIndex: React.PropTypes.string
    }).isRequired
  },

  getInitialState: function () {
    return {
      loading: true
    };
  },

  componentDidMount: function () {
    // Response format:
    // [
    //   session: {id. start, end},
    //   attendances: [{name, email, enrolled, user_id, in_section, attended}]
    // ]
    $.ajax({
      method: "GET",
      url: "/api/v1/pd/workshops/" + this.props.params.workshopId + "/session_attendances",
      dataType: "json"
    }).done(function (data) {
      this.setState({
        loading: false,
        sessionAttendances: data
      });
    }.bind(this));
  },

  handleNavSelect: function (sessionIndex) {
    this.context.router.replace('/' + this.props.params.workshopId + '/attendance/' + sessionIndex);
    this.setState(this.state);
  },

  handleCancelClick: function (e) {
    this.context.router.push("/" + this.props.params.workshopId);
  },

  handleSaveClick: function (e) {
    var url = "/api/v1/pd/workshops/" + this.props.params.workshopId + "/session_attendances";
    var data = this.prepareDataForApi();
    $.ajax({
      method: 'PATCH',
      url: url ,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({pd_workshop: data})
    }).done(function () {
      this.context.router.push('/' + this.props.params.workshopId);
    }.bind(this));
  },

  prepareDataForApi: function () {
    // Convert to {session_attendances: [session_id, attendances: [user_id]]}
    return {
      session_attendances: this.state.sessionAttendances.map(function (sessionAttendance) {
        return {
          session_id: sessionAttendance.session.id,
          attendances: sessionAttendance.attendances.filter(function (attendance) {
            return attendance.attended;
          }).map(function (attendance) {
            return attendance.user_id;
          })
        };
      })
    };
  },

  handleAttendanceChange: function (i, value) {
    this.state.sessionAttendances[this.activeSessionIndex()].attendances[i].attended = value;
    this.setState(this.state);
  },

  activeSessionIndex: function () {
    return parseInt(this.props.params.sessionIndex, 10) || 0;
  },

  render: function () {
    if (this.state.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x" />;
    }

    var sessionTabs = this.state.sessionAttendances.map(function (sessionAttendance, i) {
      var session = sessionAttendance.session;
      return (
        <Tab key={i} eventKey={i} title={<SessionTime session={session}/>}>
          <SessionAttendance
            attendances={sessionAttendance.attendances}
            onChange={this.handleAttendanceChange}
          />
        </Tab>
      );
    }.bind(this));

    return (
      <div>
        <h1>Workshop Session Attendance</h1>
        <Tabs activeKey={this.activeSessionIndex()} onSelect={this.handleNavSelect}>
          {sessionTabs}
        </Tabs>
        <br />
        <Row>
          <Col sm={4}>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.handleSaveClick}>Save</Button>
              <Button onClick={this.handleCancelClick}>Cancel</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </div>
    );
  }
});
module.exports = WorkshopAttendance;
