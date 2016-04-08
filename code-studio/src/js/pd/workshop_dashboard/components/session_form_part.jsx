/* global React */

var moment = require('moment');

var SessionFormPart = React.createClass({
  propTypes: {
    session: React.PropTypes.shape({
      date: React.PropTypes.string,
      startTime: React.PropTypes.string,
      endTime: React.PropTypes.string
    }).isRequired,
    onAdd: React.PropTypes.func,
    onRemove: React.PropTypes.func
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
    if (this.props.onAdd) {
      return (
        <button className="btn btn-mini" onClick={this.handleAddClick} >
          <i className="fa fa-plus" />
        </button>
      );
    }
    return null;
  },
  renderRemoveButton: function () {
    if (this.props.onRemove) {
      return (
        <button className="btn btn-mini" onClick={this.handleRemoveClick}>
          <i className="fa fa-minus"/>
        </button>
      );
    }
    return null;
  },

  render: function () {
    return (
      <div className="row">
        <div className="span4 input-append">
          <input
            type="text"
            className="date"
            value={this.props.session.date}
            onChange={this.handleDateChange}
          />
          <span className="add-on">
            <i className="fa fa-calendar" />
          </span>
        </div>
        <div className="span3 input-append">
          <input
            type="time"
            className="span2"
            placeholder="hh:mm"
            value={this.props.session.startTime}
            onChange={this.handleStartTimeChange}
          />
          <span className="add-on">
            <i className="fa fa-clock-o" />
          </span>
        </div>
        <div className="span3 input-append">
          <input
            type="time"
            className="span2"
            placeholder="hh:mm"
            value={this.props.session.endTime}
            onChange={this.handleEndTimeChange}
          />
          <span className="add-on">
            <i className="fa fa-clock-o" />
          </span>
        </div>
        <div className="span2">
          {this.renderAddButton()}
          {this.renderRemoveButton()}
        </div>
      </div>
    );
  },

  componentDidMount: function () {
    $(ReactDOM.findDOMNode(this)).find('.date').datepicker({
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
