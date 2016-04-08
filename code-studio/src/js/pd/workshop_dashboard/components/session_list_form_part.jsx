/* global React */

var SessionFormPart = require('./session_form_part.jsx');
var MAX_SESSIONS = 10;

var SessionListFormPart = React.createClass({
  propTypes: {
    sessions: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func
  },

  nextPlaceholderId: 1,

  handleChange: function (i, session) {
    this.props.sessions[i] = session;
    this.props.onChange(this.props.sessions);
  },

  handleAdd: function () {
    this.props.sessions.push({placeholderId: '_' + (this.nextPlaceholderId++)});
    this.props.onChange(this.props.sessions);
  },

  handleRemove: function (i) {
    var sessions = this.props.sessions;
    var removedSession = sessions.splice(i, 1)[0];
    this.props.onChange(sessions, removedSession);
  },

  render: function () {
    var sessionForms = this.props.sessions.map(function (session, i, sessions) {
      var handleAdd = i == sessions.length-1 && sessions.length < MAX_SESSIONS ? this.handleAdd : null;
      var handleRemove = sessions.length > 1 ? this.handleRemove.bind(null, i) : null;
      return (
        <SessionFormPart
          session={session}
          key={session.id || session.placeholderId}
          onChange={this.handleChange.bind(null, i)}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      );
    }.bind(this));

    return (
      <div className="sessionList">
        <div className="row">
          <div className="span4">
            <label className="control-label">Date</label>
          </div>
          <div className="span3">
            <label className="control-label">Start Time</label>
          </div>
          <div className="span3">
            <label className="control-label">End Time</label>
          </div>
        </div>
        {sessionForms}
      </div>
    );
  }
});
module.exports = SessionListFormPart;
