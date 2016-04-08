/* global React WORKSHOP_CONSTANTS */

var moment = require('moment');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var SessionListFormPart = require('./components/session_list_form_part.jsx');
var FacilitatorListFormPart = require('./components/facilitator_list_form_part.jsx');

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

  getInitialState: function () {
    if (this.props.params.workshopId) {
      return {loading: true};
    }

    return {
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
    }
  },

  // Convert from [start, end] to [date, startTime, endTime]
  prepareSessionsForForm: function (sessions) {
    return sessions.map(function (session) {
      return {
        id: session.id,
        date: moment(session.start).format('MM/DD/YY'),
        startTime: moment(session.start).format('HH:mm'),
        endTime: moment(session.end).format('HH:mm')
      };
    });
  },

  // Convert from [date, startTime, endTime] to [start, end] and merge destroyedSessions
  prepareSessionsForApi: function (sessions, destroyedSessions) {
    return sessions.map(function (session) {
      return {
        id: session.id,
        start: moment(session.date + ' ' + session.startTime, 'MM/DD/YY HH:mm').format(),
        end: moment(session.date + ' ' + session.endTime, 'MM/DD/YY HH:mm').format()
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

  renderCourseSelect: function () {
    var options = WORKSHOP_CONSTANTS.COURSES.map(function (course, i) {
      return (<option key={i} value={course}>{course}</option>);
    });
    var placeHolder = this.state.course ? null : <option />;
    return (
      <select className="span2" valueLink={this.linkState('course')}>
        {placeHolder}
        {options}
      </select>
    );
  },
  renderWorkshopTypeSelect: function () {
    var options = WORKSHOP_CONSTANTS.TYPES.map(function (workshopType, i) {
      return (<option key={i} value={workshopType}>{workshopType}</option>);
    });
    var placeHolder = this.state.course ? null : <option />;
    return (
      <select className="span2" valueLink={this.linkState('workshop_type')}>
        {placeHolder}
        {options}
      </select>
    );
  },
  renderSaveButton: function () {
    var valid = (
      this.state.sessions.length > 0
      && this.state.sessions.every(function (session) {
        return session.date && session.startTime && session.endTime;
      })
      && this.state.location_name
      && this.state.location_address
      && this.state.capacity
      && this.state.workshop_type
      && this.state.course
    );

    return valid ?
      <button type="submit" className="btn" onClick={this.handleSaveClick}>Save</button> :
      <button type="submit" className="btn" disabled>Save</button>;
 },

  handleSaveClick: function (e) {
    e.preventDefault();

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
      this.context.router.push('/' + data.id);
    }.bind(this));
  },
  handleCancelClick: function (e) {
    e.preventDefault();
    this.context.router.goBack();
  },

  render: function () {
    if (this.state.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x" />;
    }
    return this.renderForm();
  },

  renderForm: function () {
    return (
      <form>
        <SessionListFormPart sessions={this.state.sessions} onChange={this.handleSessionsChange}/>
        <div className="row">
          <div className="span4">
            <label className="control-label">Location name</label>
          </div>
          <div className="span6">
            <label className="control-label">Location address (enter the full address)</label>
          </div>
        </div>
        <div className="controls-row">
          <input className="span4" type="text" valueLink={this.linkState('location_name')}/>
          <input className="span6" type="text" valueLink={this.linkState('location_address')}/>
        </div>
        <div className="row">
          <div className="span2">
            <label className="control-label">Capacity</label>
          </div>
          <div className="span2">
            <label className="control-label">Workshop type</label>
          </div>
          <div className="span2">
            <label className="control-label">Course</label>
          </div>
          <div className="span2">
            <label className="control-label">Subject</label>
          </div>
        </div>
        <div className="controls-row">
          <input className="span2" type="text" valueLink={this.linkState('capacity')}/>
          {this.renderWorkshopTypeSelect()}
          {this.renderCourseSelect()}
          <input className="span4" type="text" valueLink={this.linkState('subject')}/>
        </div>
        <div className="row">
          <div className="span8">
            <label className="control-label">Notes (optional)</label>
          </div>
        </div>
        <div className="controls-row">
          <textarea className="span8" rows="5" valueLink={this.linkState('notes')}/>
        </div>
        <FacilitatorListFormPart facilitators={this.state.facilitators} onChange={this.handleFacilitatorsChange}/>
        <br/>
        <div className="controls-row">
          {this.renderSaveButton()}
          <button className="btn btn-link" onClick={this.handleCancelClick}>Cancel</button>
        </div>
      </form>
    );
  }
});
module.exports = WorkshopForm;
