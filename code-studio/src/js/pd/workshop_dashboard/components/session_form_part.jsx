/* global React */

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;


var SessionFormPart = React.createClass({
  propTypes: {
    session: React.PropTypes.shape({
      date: React.PropTypes.string,
      startTime: React.PropTypes.string,
      endTime: React.PropTypes.string
    }).isRequired,
    onAdd: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    shouldValidate: React.PropTypes.bool
  },

  handleDateChange: function (e) {
    this.props.session.date = e.target.value;
    this.props.onChange(this.props.session);
  },
  handleStartTimeChange: function (e) {
    this.props.session.startTime = e.target.value;
    this.props.onChange(this.props.session);
  },
  handleEndTimeChange: function (e) {
    this.props.session.endTime = e.target.value;
    this.props.onChange(this.props.session);
  },
  handleRemoveClick: function (e) {
    e.preventDefault();
    this.props.onRemove();
  },
  handleAddClick: function (e) {
    e.preventDefault();
    this.props.onAdd();
  },

  renderAddButton: function () {
    if (this.props.onAdd && this.props.session.date &&
      this.props.session.startTime && this.props.session.endTime) {
      return (
        <Button onClick={this.handleAddClick} >
          <i className="fa fa-plus" />
        </Button>
      );
    }
    return null;
  },
  renderRemoveButton: function () {
    if (this.props.onRemove) {
      return (
        <Button onClick={this.handleRemoveClick}>
          <i className="fa fa-minus"/>
        </Button>
      );
    }
    return null;
  },

  render: function () {
    var style = {};
    var help = {};
    if (this.props.shouldValidate) {
      if (!this.props.session.date) {
        style.date = "error";
        help.date = "Required.";
      }
      if (!this.props.session.startTime) {
        style.startTime = "error";
        help.startTime = "Required.";
      }
      if (!this.props.session.endTime) {
        style.endTime = "error";
        help.endTime = "Required.";
      } else if (this.props.session.endTime <= this.props.session.startTime) {
        style.endTime = "error";
        help.endTime = "Must end after it starts.";
      }
    }

    return (
      <Row>
        <Col sm={4}>
          <Input
            type="text"
            className="date-picker"
            value={this.props.session.date}
            onChange={this.handleDateChange}
            addonAfter={<i className="fa fa-calendar" />}
            bsStyle={style.date}
            help={help.date}
          />
        </Col>
        <Col sm={3}>
          <Input
            type="time"
            placeholder="hh:mm"
            value={this.props.session.startTime}
            onChange={this.handleStartTimeChange}
            addonAfter={<i className="fa fa-clock-o" />}
            bsStyle={style.startTime}
            help={help.startTime}
          />
        </Col>
        <Col sm={3}>
          <Input
            type="time"
            placeholder="hh:mm"
            value={this.props.session.endTime}
            onChange={this.handleEndTimeChange}
            addonAfter={<i className="fa fa-clock-o" />}
            bsStyle={style.endTime}
            help={help.endTime}
          />
        </Col>
        <Col sm={2}>
          {this.renderAddButton()}
          {this.renderRemoveButton()}
        </Col>
      </Row>
    );
  },

  componentDidMount: function () {
    $(ReactDOM.findDOMNode(this)).find('.date-picker').datepicker({
      minDate: 0,
      dateFormat: 'mm/dd/y',
      onSelect: function (dateText) {
        this.props.session.date = dateText;
        this.props.onChange(this.props.session);
      }.bind(this)
    });
  }
});
module.exports = SessionFormPart;
