/* global React */

var moment = require('moment');
var SessionTime = require('./session_time.jsx');

var SessionTimesList = React.createClass({
  propTypes: {
    sessions: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired
      })
    ).isRequired
  },

  render: function () {
    var listItems = this.props.sessions.map(function (session) {
      return (
        <li key={session.id}>
          <SessionTime session={session}/>
        </li>
      );
    });

    return (
      <ul>
        {listItems}
      </ul>
    );
  }
});
module.exports = SessionTimesList;
