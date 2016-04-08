/* global React */

var MAX_FACILITATORS = 10;

var FacilitatorListFormPart = React.createClass({
  propTypes: {
    facilitators: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        email: React.PropTypes.string
      })
    ).isRequired,
    onChange: React.PropTypes.func
  },

  handleNameChange: function (facilitator, e) {
    facilitator.name = e.target.value;
    this.props.onChange(this.props.facilitators);
  },
  handleEmailChange: function (facilitator, e) {
    facilitator.email = e.target.value;
    // TODO - validate email format and display warning
    this.props.onChange(this.props.facilitators);
  },
  handleAddClick: function (e) {
    e.preventDefault();
    this.props.facilitators.push({name: '', email: ''});
    this.props.onChange(this.props.facilitators);
  },
  handleRemoveClick: function (i, e) {
    e.preventDefault();
    this.props.facilitators.splice(i, 1)[0];
    this.props.onChange(this.props.facilitators);
  },

  renderAddButton: function (i) {
    return (
      <button className="btn btn-mini" onClick={this.handleAddClick} >
        <i className="fa fa-plus" />
      </button>
    );
  },
  renderRemoveButton: function (i) {
    return (
      <button className="btn btn-mini" onClick={this.handleRemoveClick.bind(null, i)} >
        <i className="fa fa-minus" />
      </button>
    );
  },

  renderFacilitatorRows: function () {
    if (this.props.facilitators.length == 0) {
      // Add a placeholder empty row.
      this.props.facilitators.push({name: '', email: ''});
    }
    var rows = this.props.facilitators.map(function (facilitator, i, facilitators) {
      var addButton = (i == facilitators.length-1 && facilitators.length < MAX_FACILITATORS ?
        this.renderAddButton(i) :
        null
      );
      var removeButton = facilitators.length > 1 ? this.renderRemoveButton(i) : null;
      return (
        <div className="controls-row" key={i}>
          <input
            type="text"
            className="span4"
            value={facilitator.name}
            onChange={this.handleNameChange.bind(null, facilitator)}
          />
          <input
            type="text"
            className="span4"
            value={facilitator.email}
            onChange={this.handleEmailChange.bind(null, facilitator)}
          />
          <div className="span2">
            {addButton}
            {removeButton}
          </div>
        </div>
      );
    }.bind(this));

    return (<div>{rows}</div>);
  },

  render: function () {
    return (
      <div className="facilitatorList">
        <h3>Facilitators</h3>
        <div className="row">
          <div className="span4">
            <label className="control-label">Name</label>
          </div>
          <div className="span4">
            <label className="control-label">Email</label>
          </div>
        </div>
        {this.renderFacilitatorRows()}
      </div>
    );
  }
});
module.exports = FacilitatorListFormPart;
