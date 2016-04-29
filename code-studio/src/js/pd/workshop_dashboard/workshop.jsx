/* global React TEACHER_DASHBOARD_URL */

var SessionTimesList = require('./components/session_times_list.jsx');
var FacilitatorsList = require('./components/facilitators_list.jsx');
var ConfirmationDialog = require('./components/confirmation_dialog.jsx');
var WorkshopEnrollment = require('./components/workshop_enrollment.jsx');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Panel = require('react-bootstrap').Panel;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;


var Workshop = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  propTypes: {
    params: React.PropTypes.shape({
      workshopId: React.PropTypes.string.isRequired
    }).isRequired
  },

  getInitialState: function () {
    if (this.props.params.workshopId) {
      return {loading: true};
    }
  },

  componentDidMount: function () {
    $.ajax({
      method: "GET",
      url: "/api/v1/pd/workshops/" + this.props.params.workshopId,
      dataType: "json"
    }).done(function (data) {
      this.setState({
        loading: false,
        organizer: data.organizer,
        facilitators: data.facilitators,
        location_name: data.location_name,
        location_address: data.location_address,
        capacity: data.capacity,
        workshop_type: data.workshop_type,
        course: data.course,
        subject: data.subject,
        notes: data.notes,
        section_id: data.section_id,
        section_code: data.section_code,
        sessions: data.sessions,
        state: data.state
      });
    }.bind(this));
  },

  handleStartEventClick: function () {
    this.state.showStartEventConfirmation = true;
    this.setState(this.state);
  },

  handleStartEventCancel: function () {
    this.state.showStartEventConfirmation = false;
    this.setState(this.state);
  },

  handleStartEventConfirmed: function (e) {
    $.ajax({
      method: "POST",
      url: "/api/v1/pd/workshops/" + this.props.params.workshopId + "/start",
      dataType: "json"
    }).done(function (data) {
      this.state.showStartEventConfirmation = false;
      this.state.state = 'In Progress';
      this.state.section_id = data.section_id;
      this.state.section_code = data.section_code;
      this.setState(this.state);
    }.bind(this));
  },

  handleEndEventClick: function () {
    this.state.showEndEventConfirmation = true;
    this.setState(this.state);
  },

  handleEndEventCancel: function () {
    this.state.showEndEventConfirmation = false;
    this.setState(this.state);
  },

  handleEndEventConfirmed: function (e) {
    $.ajax({
      method: "POST",
      url: "/api/v1/pd/workshops/" + this.props.params.workshopId + "/end",
      dataType: "json"
    }).done(function () {
      this.state.state = 'Ended';
      this.setState(this.state);
    }.bind(this));
  },

  handleTakeAttendanceClick: function () {
    this.context.router.push('/workshops/' + this.props.params.workshopId + '/attendance');
  },

  handleEditClick: function () {
    this.context.router.push('/workshops/' + this.props.params.workshopId + '/edit');
  },

  handleBackClick: function () {
    this.context.router.push('/workshops');
  },

  getSectionUrl: function () {
    return TEACHER_DASHBOARD_URL + "#/sections/" + this.state.section_id + "/manage";
  },

  renderSignupLink: function () {
    var signupUrl = location.origin + "/pd/workshops/" + this.props.params.workshopId + '/enroll';
    return (<a href={signupUrl} target="_blank">{signupUrl}</a>);
  },

  renderPanel: function (width, header, content) {
    return (
      <Col sm={width}>
        <Panel header={header}>
          {content}
        </Panel>
      </Col>
    );
  },

  renderIntroContent: function () {
    var contents = null;

    switch (this.state.state) {
      case 'Not Started':
        contents = (
          <div>
            <p>
              On the day of your workshop, click the Start Event button below to
              create a section for teachers attending the workshop to join.
            </p>
            <Button onClick={this.handleStartEventClick}>Start Event</Button>
            <ConfirmationDialog
              show={this.state.showStartEventConfirmation}
              onOk={this.handleStartEventConfirmed}
              onCancel={this.handleStartEventCancel}
              headerText="Start Event"
              bodyText="Are you sure you want to start this event?"
            />
          </div>
        );
        break;
      case 'In Progress':
        var joinUrl = location.origin + "/join/" + this.state.section_code;
        var joinLink = (<a href={joinUrl}>{joinUrl}</a>);
        contents = (
          <div>
            <p>
              Please ask teachers at the workshop to join your workshop
              section by doing the following:
            </p>
            <p>
              If they don't have a teacher account yet:
            </p>
            <ul>
              <li>
                Create a teacher account at <a href={location.origin}>{location.origin}</a>
              </li>
            </ul>
            <p>
              Then:
            </p>
            <ul>
              <li>
                Make sure they're logged into their account and then have them type this URL
                ({joinLink})
                into their browser. Once they hit enter, they'll have joined the workshop section.
              </li>
            </ul>
            <p>
              You can <a href={this.getSectionUrl()} target="_blank">
              view this section in your Teacher Dashboard
            </a> to make sure everyone has joined.
            </p>
            <p>
              After your workshop is done, click the End Event button below to close the workshop.
            </p>
            <ButtonToolbar>
              <Button onClick={this.handleTakeAttendanceClick}>Take Attendance</Button>
              <Button onClick={this.handleEndEventClick}>End Event</Button>
              <ConfirmationDialog
                show={this.state.showEndEventConfirmation}
                onOk={this.handleEndEventConfirmed}
                onCancel={this.handleEndEventCancel}
                headerText="End Event"
                bodyText="Are you sure? Once ended, the workshop cannot be restarted."
              />
            </ButtonToolbar>
          </div>
        );
        break;
      default:
        contents = (
          <div>
            We hope you had a great workshop!
          </div>
        );
    }

    return contents;
  },

  render: function () {
    if (this.state.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x" />;
    }
    return (
      <Grid fluid={true}>
        <Row>
          {this.renderPanel(12, "Current State: " + this.state.state, this.renderIntroContent())}
        </Row>
        <Row>
          {this.renderPanel(4, "Date and Time", <SessionTimesList sessions={this.state.sessions}/>)}
          {this.renderPanel(8, "Location", this.state.location_name + ', ' + this.state.location_address)}
        </Row>
        <Row>
          {this.renderPanel(2, "Capacity", this.state.capacity)}
          {this.renderPanel(3, "Workshop Type", this.state.workshop_type)}
          {this.renderPanel(7, "Notes", this.state.notes)}
        </Row>
        <Row>
          {this.renderPanel(6, "Facilitators", <FacilitatorsList facilitators={this.state.facilitators}/>)}
          {this.renderPanel(6, "Organizer", this.state.organizer.name + " (" + this.state.organizer.email + ")")}
        </Row>
        <Row>
          {this.renderPanel(7, "Signup URL", this.renderSignupLink())}
        </Row>
        <Row>
          {this.renderPanel(12, "Enrollment", <WorkshopEnrollment workshopId={this.props.params.workshopId}/>)}
        </Row>
        <Row>
          <Col sm={4} >
            <ButtonToolbar>
              <Button onClick={this.handleEditClick}>Edit</Button>
              <Button onClick={this.handleBackClick}>Back</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Grid>
    );
  }
});
module.exports = Workshop;
