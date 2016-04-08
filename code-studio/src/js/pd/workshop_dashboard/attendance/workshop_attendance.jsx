/* global React */

var SessionTime = require('../components/session_time.jsx');
var SessionAttendance = require('./session_attendance.jsx');

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

  handleNavClick: function (sessionIndex) {
    this.context.router.replace('/1/attendance/' + sessionIndex);
    this.setState(this.state);
  },

  handleCancelClick: function (e) {
    e.preventDefault();
    this.context.router.push("/" + this.props.params.workshopId);
  },

  handleSaveClick: function (e) {
    e.preventDefault();
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
    return this.props.params.sessionIndex || 0;
  },

  render: function () {
    if (this.state.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x" />;
    }

    var sessionTabs = this.state.sessionAttendances.map(function (sessionAttendance, i) {
      var session = sessionAttendance.session;
      var className = i == this.activeSessionIndex() ? "active" : null;
      return (
        <li key={i} className={className}>
          <a href="#" onClick={this.handleNavClick.bind(null, i)}>
            <SessionTime session={session}/>
          </a>
        </li>
      );
    }.bind(this));

    return (
      <div>
        <h1>Workshop Session Attendance</h1>
        <ul className="nav nav-tabs">
          {sessionTabs}
        </ul>
        <SessionAttendance
          attendances={this.state.sessionAttendances[this.activeSessionIndex()].attendances}
          onChange={this.handleAttendanceChange}
        />
        <br />
        <div className="controls-row">
          <button type="submit" className="btn" onClick={this.handleSaveClick}>Save</button>
          <button className="btn btn-link" onClick={this.handleCancelClick}>Cancel</button>
        </div>
      </div>
    );
  }
});
module.exports = WorkshopAttendance;
