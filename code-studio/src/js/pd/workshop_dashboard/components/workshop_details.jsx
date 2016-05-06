/* global React WORKSHOP_CONSTANTS google */

var moment = require('moment');
var SessionTimesList = require('./session_times_list.jsx');
var FacilitatorsList = require('./facilitators_list.jsx');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var WorkshopDetails = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  propTypes: {
    workshop: React.PropTypes.shape({
      facilitators: React.PropTypes.array.isRequired,
      location_name: React.PropTypes.string.isRequired,
      location_address: React.PropTypes.string.isRequired,
      capacity: React.PropTypes.number.isRequired,
      workshop_type: React.PropTypes.string.isRequired,
      course: React.PropTypes.string.isRequired,
      subject: React.PropTypes.string,
      notes: React.PropTypes.string,
      sessions: React.PropTypes.array.isRequired
    }).isRequired
  },

  render: function () {
    return (
      <Grid fluid={true}>
        <Row>
          <Col sm={12}>
            <h4>Sessions</h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <SessionTimesList sessions={this.props.workshop.sessions} />
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm={4}>
            <h4>Location Name</h4>
          </Col>
          <Col sm={6}>
            <h4>Location Address</h4>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            {this.props.workshop.location_name}
          </Col>
          <Col sm={6}>
            {this.props.workshop.location_address}
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm={2}>
            <h4>Capacity</h4>
          </Col>
          <Col sm={2}>
            <h4>Type</h4>
          </Col>
          <Col sm={2}>
            <h4>Course</h4>
          </Col>
          <Col sm={4}>
            <h4>Subject</h4>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            {this.props.workshop.capacity}
          </Col>
          <Col sm={2}>
            {this.props.workshop.workshop_type}
          </Col>
          <Col sm={2}>
            {this.props.workshop.course}
          </Col>
          <Col sm={4}>
            {this.props.workshop.subject}
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm={12}>
            <h4>Notes</h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {this.props.workshop.notes}
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm={12}>
            <h4>Facilitators</h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FacilitatorsList facilitators={this.props.workshop.facilitators}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});
module.exports = WorkshopDetails;
