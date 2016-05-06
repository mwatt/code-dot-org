/* global React WORKSHOP_CONSTANTS google */

var WorkshopForm = require('./components/workshop_form.jsx');

var NewWorkshop = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleAfterSave: function (id) {
    this.context.router.push(`/workshops/${id}`);
  },

  render: function () {
    return (
      <div>
        <h2>New Workshop</h2>
        <WorkshopForm afterSave={this.handleAfterSave} />
      </div>
    );
  }
});
module.exports = NewWorkshop;
