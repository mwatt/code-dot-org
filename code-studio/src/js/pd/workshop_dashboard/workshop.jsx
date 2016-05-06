/* global React TEACHER_DASHBOARD_URL */

var _ = require('lodash');
var ConfirmationDialog = require('./components/confirmation_dialog.jsx');
var WorkshopForm = require('./components/workshop_form.jsx');
var WorkshopDetails = require('./components/workshop_details.jsx');
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
    this.loadRequest = $.ajax({
      method: "GET",
      url: "/api/v1/pd/workshops/" + this.props.params.workshopId,
      dataType: "json"
    }).done(function (data) {
      this.setState({
        loading: false,
        workshop: _.pick(data, [
          'id',
          'organizer',
          'facilitators',
          'location_name',
          'location_address',
          'capacity',
          'enrolled_teacher_count',
          'workshop_type',
          'course',
          'subject',
          'notes',
          'section_id',
          'section_code',
          'sessions',
          'state'
        ])
      });
    }.bind(this));
  },

  componentWillUnmount: function () {
    if (this.loadRequest) {
      this.loadRequest.abort();
    }
    if (this.startRequest) {
      this.startRequest.abort();
    }
    if (this.endRequest) {
      this.endRequest.abort();
    }
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
    this.startRequest = $.ajax({
      method: "POST",
      url: "/api/v1/pd/workshops/" + this.props.params.workshopId + "/start",
      dataType: "json"
    }).done(function (data) {
      this.state.showStartEventConfirmation = false;
      this.state.workshop.state = 'In Progress';
      this.state.workshop.section_id = data.section_id;
      this.state.workshop.section_code = data.section_code;
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
    this.endRequest = $.ajax({
      method: "POST",
      url: "/api/v1/pd/workshops/" + this.props.params.workshopId + "/end",
      dataType: "json"
    }).done(function () {
      this.state.workshop.state = 'Ended';
      this.setState(this.state);
    }.bind(this));
  },

  handleTakeAttendanceClick: function () {
    this.context.router.push('/workshops/' + this.props.params.workshopId + '/attendance');
  },

  handleEditClick: function () {
    this.context.router.push(`/workshops/${this.props.params.workshopId}/edit`);
  },

  handleBackClick: function () {
    this.context.router.push('/workshops');
  },

  handleAfterWorkshopSave: function (workshop) {
    this.context.router.replace(`/workshops/${this.props.params.workshopId}`);
    this.state.workshop = workshop;
    this.setState(this.state);
  },

  getSectionUrl: function () {
    return TEACHER_DASHBOARD_URL + "#/sections/" + this.state.workshop.section_id + "/manage";
  },

  renderSignupContent: function () {
    var signupUrl = location.origin + "/pd/workshops/" + this.props.params.workshopId + '/enroll';
    return (
      <div>
        <p>Share this link with teachers who need to sign up for your workshop.</p>
        <a href={signupUrl} target="_blank">
          {signupUrl}
        </a>
      </div>
    );
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

    switch (this.state.workshop.state) {
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
        var joinUrl = location.origin + "/join/" + this.state.workshop.section_code;
        var joinLink = (<a href={joinUrl} target="_blank">{joinUrl}</a>);
        contents = (
          <div>
            <h3>Join Workshop:</h3>
            <p>
              On the day of the workshop, ask workshop attendees to follow the steps:
            </p>
            <h4>Step 1: Sign into Code Studio</h4>
            <p>
              Tell teachers to sign into their Code Studio accounts. If they do not already have an
              account tell them to create one by going to{' '}
              <a href={location.origin} target="_blank">
                {location.origin}
              </a>
            </p>
            <h4>Step 2: Go to the workshop URL</h4>
            <p>
              After teachers have signed into their Code Studio accounts, ask them to type this
              URL ({joinLink}) into their browsers.
              They will be taken to code.org and see a green box at the top that reads: “You’ve joined…”.
              This will allow you to view their Code Studio progress for different professional development courses.
            </p>
            <p>
              You can also{' '}
              <a href={this.getSectionUrl()} target="_blank">
                view this section in your Teacher Dashboard
              </a>{' '}
              to make sure everyone has joined.
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
            <p>
              We hope you had a great workshop!
            </p>
            <p>
              Teachers will receive an email with survey link from{' '}
              <a href="mailto:hadi_partovi@code.org">
                hadi_partovi@code.org
              </a>.{' '}
              If they do not receive the link ask them to check their spam.
              Many school districts block outside emails.
              You can also recommend they set hadi_partovi and any other @code.org
              addresses to their contacts or safe senders list, so they don't miss
              out on future emails. Lastly, they can check to make sure the email
              went to the correct email address by logging into their Code Studio
              account, navigating to the 'my account' page via the top right corner
              to confirm their email address was typed correctly when they
              first created the account.
            </p>
            <p>
              If they still can’t find the email, have them email{' '}
              <a href="mailto:support@code.org">
                support@code.org
              </a>{' '}
              and we will help them.
            </p>
          </div>
        );
    }

    return contents;
  },

  renderDetailsHeader: function () {
    let button = null;
    switch (this.state.workshop.state) {
      case 'Not Started':
        if (this.props.route.view == 'edit') {
          button = <Button bsSize="xsmall" bsStyle="primary" onClick={this.handleSaveClick}>Save</Button>;
        } else {
          button = <Button bsSize="xsmall" onClick={this.handleEditClick}>Edit</Button>;
        }
        break;
      case 'In Progress':
        break;
      default:
    }

    return (
      <span>
        Workshop Details: {button}
      </span>
    );
  },

  renderDetailsContent: function () {
    if (this.props.route.view == 'edit' ) {
      return (
        <div>
          <WorkshopForm workshop={this.state.workshop} afterSave={this.handleAfterWorkshopSave}/>
        </div>
      );
    }

    return (
      <div>
        <WorkshopDetails workshop={this.state.workshop}/>
        <ButtonToolbar>
          <Button onClick={this.handleEditClick}>Edit</Button>
          <Button onClick={this.handleBackClick}>Back</Button>
        </ButtonToolbar>
      </div>
    );
  },

  render: function () {
    if (this.state.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x" />;
    }
    let enrollmentRatio = `${this.state.workshop.enrolled_teacher_count}/${this.state.workshop.capacity}`;
    return (
      <Grid fluid={true}>
        <Row>
          <Col sm={12}>
            <Panel header="Your workshop sign-up link:">
              {this.renderSignupContent()}
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Panel header={`Workshop State: ${this.state.workshop.state}`}>
              {this.renderIntroContent()}
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Panel header={`Workshop Enrollment: ${enrollmentRatio}`}>
              <WorkshopEnrollment workshopId={this.props.params.workshopId}/>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Panel header={this.renderDetailsHeader()}>
              {this.renderDetailsContent()}
            </Panel>
          </Col>
        </Row>
      </Grid>
    );

    /*


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
     <Col sm={4} >
     <ButtonToolbar>
     <Button onClick={this.handleEditClick}>Edit</Button>
     <Button onClick={this.handleBackClick}>Back</Button>
     </ButtonToolbar>
     </Col>
     </Row>

     */
  }
});
module.exports = Workshop;
