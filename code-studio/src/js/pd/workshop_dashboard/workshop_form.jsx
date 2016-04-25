/* global React WORKSHOP_CONSTANTS */

var moment = require('moment');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var SessionListFormPart = require('./components/session_list_form_part.jsx');
var FacilitatorListFormPart = require('./components/facilitator_list_form_part.jsx');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Alert = require('react-bootstrap').Alert;


var WorkshopForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  propTypes: {
    params: React.PropTypes.shape({
      workshopId: React.PropTypes.string
    }).isRequired
  },

  mixins: [LinkedStateMixin],

  autocomplete: null,

  getInitialState: function () {
    if (this.props.params.workshopId) {
      return {loading: true};
    }

    return {
      errors: [],
      shouldValidate: false,
      facilitators: [{name: '', email: ''}],
      location_name: '',
      location_address: '',
      capacity: '',
      workshop_type: '',
      course: '',
      subject: '',
      notes:'',
      sessions: [{placeholderId: '_0'}],
      destroyedSessions: []
    };
  },

  componentDidMount: function () {
    if (this.state.loading) {
      $.ajax({
        method: 'GET',
        url: '/api/v1/pd/workshops/' + this.props.params.workshopId,
        dataType: 'json'
      }).done(function (data) {
        this.setState({
          loading: false,
          errors: [],
          organizer: data.organizer,
          facilitators: data.facilitators,
          location_name: data.location_name,
          location_address: data.location_address,
          capacity: data.capacity,
          workshop_type: data.workshop_type,
          course: data.course,
          subject: data.subject,
          notes: data.notes,
          sessions: this.prepareSessionsForForm(data.sessions),
          destroyedSessions: []
        });
      }.bind(this));
    } else {
      this.enableAutocompleteLocation();
    }
  },

  componentWillUnmount: function () {
    if (this.isGoogleMapsLoaded()) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  },

  componentDidUpdate: function () {
    if (!this.state.loading) {
      this.enableAutocompleteLocation();
    }
  },

  isGoogleMapsLoaded: function() {
    return (typeof google === 'object' && typeof google.maps === 'object');
  },

  enableAutocompleteLocation: function () {
    if (!this.autocomplete && this.isGoogleMapsLoaded()) {
      this.autocomplete = new google.maps.places.Autocomplete($(ReactDOM.findDOMNode(this)).find('.location-autocomplete')[0]);
      google.maps.event.addListener(this.autocomplete, 'place_changed', function () {
        var place = this.autocomplete.getPlace();
        this.state.location_address = place.formatted_address;
        this.setState(this.state);
      }.bind(this));
    }
  },

  // Convert from [start, end] to [date, startTime, endTime]
  prepareSessionsForForm: function (sessions) {
    return sessions.map(function (session) {
      return {
        id: session.id,
        date: moment.utc(session.start).format('MM/DD/YY'),
        startTime: moment.utc(session.start).format('HH:mm'),
        endTime: moment.utc(session.end).format('HH:mm')
      };
    });
  },

  // Convert from [date, startTime, endTime] to [start, end] and merge destroyedSessions
  prepareSessionsForApi: function (sessions, destroyedSessions) {
    return sessions.map(function (session) {
      return {
        id: session.id,
        start: moment.utc(session.date + ' ' + session.startTime, 'MM/DD/YY HH:mm').format(),
        end: moment.utc(session.date + ' ' + session.endTime, 'MM/DD/YY HH:mm').format()
      };
    }).concat(destroyedSessions.map(function (destroyedSession) {
      return {
        id: destroyedSession.id,
        _destroy: true
      };
    }));
  },

  handleSessionsChange: function (sessions, removedSession) {
    this.state.sessions = sessions;
    if (removedSession && removedSession.id) {
      this.state.destroyedSessions.push(removedSession);
    }
    this.setState(this.state);
  },
  handleFacilitatorsChange: function (facilitators) {
    this.state.facilitators = facilitators;
    this.setState(this.state);
  },

  renderCourseSelect: function (validation) {
    var options = WORKSHOP_CONSTANTS.COURSES.map(function (course, i) {
      return (<option key={i} value={course}>{course}</option>);
    });
    var placeHolder = this.state.course ? null : <option />;
    return (
      <Input
        type="select"
        label="Course"
        valueLink={this.linkState('course')}
        bsStyle={validation.style.course}
        help={validation.help.course}
      >
        {placeHolder}
        {options}
      </Input>
    );
  },

  renderWorkshopTypeSelect: function (validation) {
    var options = WORKSHOP_CONSTANTS.TYPES.map(function (workshopType, i) {
      return (<option key={i} value={workshopType}>{workshopType}</option>);
    });
    var placeHolder = this.state.workshop_type ? null : <option />;
    return (
      <Input
        type="select"
        label="Workshop Type"
        valueLink={this.linkState('workshop_type')}
        bsStyle={validation.style.workshop_type}
        help={validation.help.workshop_type}
      >
        {placeHolder}
        {options}
      </Input>
    );
  },

  shouldRenderSubject() {
    return this.state.course && WORKSHOP_CONSTANTS.SUBJECTS[this.state.course];
  },

  renderSubjectSelect: function (validation) {
    if (this.shouldRenderSubject()) {
      var options = WORKSHOP_CONSTANTS.SUBJECTS[this.state.course].map(function (subject, i) {
        return (<option key={i} value={subject}>{subject}</option>);
      });
      var placeHolder = this.state.subject ? null : <option />;
      return (
        <Input
          type="select"
          label="Subject"
          valueLink={this.linkState('subject')}
          bsStyle={validation.style.subject}
          help={validation.help.subject}
        >
          {placeHolder}
          {options}
        </Input>
      );
    } else {
      this.state.subject = null;
    }
  },

  handleErrorClick: function (i) {
    this.state.errors.splice(i,1);
    this.setState(this.state);
  },

  renderErrors: function() {
    if (!this.state.errors || this.state.errors.length == 0) {
      return null;
    }
    return this.state.errors.map(function (error, i) {
      return (
        <Alert
          bsStyle="danger"
          key={i}
          onDismiss={this.handleErrorClick.bind(null, i)}
        >
          {error}
        </Alert>
      );
    }.bind(this));
  },

  handleSaveClick: function (e) {
    var validation = this.validate();
    if (validation.isValid) {
      this.save();
    } else {
      this.state.shouldValidate = true;
      this.setState(this.state);
    }
  },

  save: function () {
    var data = {
      facilitators: this.state.facilitators,
      location_name: this.state.location_name,
      location_address: this.state.location_address,
      capacity: this.state.capacity,
      workshop_type: this.state.workshop_type,
      course: this.state.course,
      subject: this.state.subject,
      notes: this.state.notes,
      sessions_attributes: this.prepareSessionsForApi(this.state.sessions, this.state.destroyedSessions)
    };

    var method, url;
    if (this.props.params.workshopId) {
      data.id = this.props.params.workshopId;
      method = 'PATCH';
      url = '/api/v1/pd/workshops/' + this.props.params.workshopId;
    } else {
      method = 'POST';
      url = '/api/v1/pd/workshops';
    }

    $.ajax({
      method: method,
      url: url,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({pd_workshop: data})
    }).done(function (data) {
      this.context.router.push('/workshops/' + data.id);
    }.bind(this)).fail(function (data) {
      if (data.responseJSON.errors) {
        this.state.errors = data.responseJSON.errors;
        this.setState(this.state);
      }
    }.bind(this));
  },

  handleCancelClick: function (e) {
    this.context.router.goBack();
  },

  render: function () {
    if (this.state.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x" />;
    }
    return this.renderForm();
  },

  validate: function (shouldValidate = true) {
    var validation = {isValid: true, style: {}, help: {}};
    if (shouldValidate) {
      for (var i = 0; i < this.state.sessions.length; i++) {
        var session = this.state.sessions[i]
        if (!session.date || !session.startTime || !session.endTime) {
          validation.isValid = false;
        }
      }
      if (!this.state.location_name) {
        validation.isValid = false;
        validation.style.location_name = "error";
        validation.help.location_name = "Required.";
      }
      if (!this.state.location_address) {
        validation.isValid = false;
        validation.style.location_address = "error";
        validation.help.location_address = "Required.";
      }
      if (!this.state.capacity) {
        validation.isValid = false;
        validation.style.capacity = "error";
        validation.help.capacity = "Required.";
      } else if (!/^[1-9]\d*$/.test(this.state.capacity)) {
        validation.isValid = false;
        validation.style.capacity = "error";
        validation.help.capacity = "Must be a positive integer.";
      }
      if (!this.state.workshop_type) {
        validation.isValid = false;
        validation.style.workshop_type = "error";
        validation.help.workshop_type = "Required.";
      }
      if (!this.state.course) {
        validation.isValid = false;
        validation.style.course = "error";
        validation.help.course = "Required.";
      }
      if (this.shouldRenderSubject() && !this.state.subject) {
        validation.isValid = false;
        validation.style.subject = "error";
        validation.help.subject = "Required.";
      }
    }
    return validation;
  },

  renderForm: function () {
    var validation = this.validate(this.state.shouldValidate);
    return (
      <Grid fluid={true}>
        <form>
          <SessionListFormPart
            sessions={this.state.sessions}
            onChange={this.handleSessionsChange}
            shouldValidate={this.state.shouldValidate}
          />
          <Row>
            <Col sm={4}>
              <Input
                type="text"
                label="Location Name"
                valueLink={this.linkState('location_name')}
                bsStyle={validation.style.location_name}
                help={validation.help.location_name}
              />
            </Col>
            <Col sm={6}>
              <Input
                type="text"
                className="location-autocomplete"
                label="Location Address"
                valueLink={this.linkState('location_address')}
                bsStyle={validation.style.location_address}
                help={validation.help.location_address}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <Input
                type="text"
                label="Capacity"
                valueLink={this.linkState('capacity')}
                bsStyle={validation.style.capacity}
                help={validation.help.capacity}
              />
            </Col>
            <Col sm={2}>
              {this.renderWorkshopTypeSelect(validation)}
            </Col>
            <Col sm={2}>
              {this.renderCourseSelect(validation)}
            </Col>
            <Col sm={4}>
              {this.renderSubjectSelect(validation)}
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <Input type="textarea" label="Notes (optional)" rows="5"/>
            </Col>
          </Row>
          <FacilitatorListFormPart
            facilitators={this.state.facilitators}
            onChange={this.handleFacilitatorsChange}
            shouldValidate={this.state.shouldValidate}
          />
          <br/>
          <Row>
            <Col sm={12}>
              {this.renderErrors()}
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.handleSaveClick}>Save</Button>
                <Button onClick={this.handleCancelClick}>Cancel</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </form>
      </Grid>
    );
  }
});
module.exports = WorkshopForm;
