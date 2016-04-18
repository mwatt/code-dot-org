/* global React */

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var MAX_FACILITATORS = 10;

var FacilitatorListFormPart = React.createClass({
  propTypes: {
    facilitators: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        email: React.PropTypes.string
      })
    ).isRequired,
    onChange: React.PropTypes.func,
    shouldValidate: React.PropTypes.bool
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

  validate: function(shouldValidate = true) {
    var validation = {isValid: true,
      style: {name: [], email: []},
      help: {name: [], email: []}
    };
    if (shouldValidate) {
      for (var i = 0; i < this.props.facilitators.length; i++) {
        var facilitator = this.props.facilitators[i];
        if (!facilitator.name) {
          validation.isValid = false;
          validation.style.name[i] = "error"
          validation.help.name[i] = "Required."
        }
        if (!facilitator.email) {
          validation.isValid = false;
          validation.style.email[i] = "error"
          validation.help.email[i] = "Required."
        } else if (!/^.+@.+\..+$/.test(facilitator.email)) {
          validation.isValid = false;
          validation.style.email[i] = "error"
          validation.help.email[i] = "Must be a valid email address."
        }
      }
    }
    return validation;
  },

  renderRemoveButton: function (i) {
    return (
      <Button onClick={this.handleRemoveClick.bind(null, i)} >
        <i className="fa fa-minus" />
      </Button>
    );
  },

  renderFacilitatorRows: function () {
    var validation = this.validate(this.props.shouldValidate);

    if (this.props.facilitators.length == 0) {
      // Add a placeholder empty row.
      this.props.facilitators.push({name: '', email: ''});
    }
    var rows = this.props.facilitators.map(function (facilitator, i, facilitators) {
      var addButton = null;
      if (i == facilitators.length-1 && facilitators.length < MAX_FACILITATORS &&
          this.props.facilitators[i].name && this.props.facilitators[i].email ) {
        addButton = (
          <Button onClick={this.handleAddClick}>
            <i className="fa fa-plus"/>
          </Button>
        );
      }
      var removeButton = facilitators.length > 1 ? this.renderRemoveButton(i) : null;
      return (
        <Row key={i}>
          <Col sm={4}>
            <Input
              type="text"
              value={facilitator.name}
              onChange={this.handleNameChange.bind(null, facilitator)}
              bsStyle={validation.style.name[i]}
              help={validation.help.name[i]}
            />
          </Col>
          <Col sm={4}>
            <Input
              type="text"
              value={facilitator.email}
              onChange={this.handleEmailChange.bind(null, facilitator)}
              bsStyle={validation.style.email[i]}
              help={validation.help.email[i]}
            />
          </Col>
          <Col sm={2}>
            {addButton}
            {removeButton}
          </Col>
        </Row>
      );
    }.bind(this));

    return (<div>{rows}</div>);
  },

  render: function () {
    return (
      <div className="facilitatorList">
        <h3>Facilitators</h3>
        <Row>
          <Col sm={4}>
            <label className="control-label">Name</label>
          </Col>
          <Col sm={4}>
            <label className="control-label">Email</label>
          </Col>
        </Row>
        {this.renderFacilitatorRows()}
      </div>
    );
  }
});
module.exports = FacilitatorListFormPart;
