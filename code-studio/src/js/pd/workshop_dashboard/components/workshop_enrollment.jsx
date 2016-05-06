/* global React */

var Table = require('react-bootstrap').Table;

var WorkshopEnrollment = React.createClass({
  propTypes: {
    workshopId: React.PropTypes.string.isRequired
  },

  styles: {
    th: {
      backgroundImage: 'none',
      padding: 0,
      backgroundColor: 'white',
      fontFamily: '"Gotham 4r"',
      fontSize: 14
    }
  },

  getInitialState: function () {
    return {loading: true};
  },

  componentDidMount: function () {
    this.loadRequest = $.ajax({
      method: "GET",
      url: "/api/v1/pd/workshops/" + this.props.workshopId + '/enrollments',
      dataType: "json"
    }).done(function (data) {
      this.setState({
        loading: false,
        enrollments: data
      });
    }.bind(this));
  },

  componentWillUnmount: function () {
    if (this.loadRequest) {
      this.loadRequest.abort();
    }
  },

  render: function () {
    if (this.state.loading) {
      return <i className="fa fa-spinner fa-pulse fa-3x" />;
    }

    if (this.state.enrollments.length == 0) {
      let signupUrl = location.origin + "/pd/workshops/" + this.props.workshopId + '/enroll';
      let signupLink = <a href={signupUrl} target="_blank">{signupUrl}</a>;
      return (
        <div>
          No one is currently signed up for your workshop. Share your workshop sign-up
          link {signupLink} for teachers to enroll.
        </div>
      );
    }

    var enrollmentRows = this.state.enrollments.map(function (enrollment, i) {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{enrollment.name}</td>
          <td>{enrollment.email}</td>
          <td>{enrollment.district_name}</td>
          <td>{enrollment.school}</td>
          <td>{enrollment.user_id ? 'Yes' : 'No'}</td>
        </tr>
      );
    });

    return (
      <Table condensed striped>
        <thead>
        <tr>
          <th style={this.styles.th}>#</th>
          <th style={this.styles.th}>Name</th>
          <th style={this.styles.th}>Email</th>
          <th style={this.styles.th}>District</th>
          <th style={this.styles.th}>School</th>
          <th style={this.styles.th}>Code Studio Account?</th>
        </tr>
        </thead>
        <tbody>
        {enrollmentRows}
        </tbody>
      </Table>
    );
  }
});

module.exports = WorkshopEnrollment;
