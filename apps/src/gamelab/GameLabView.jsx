var RotateContainer = require('./RotateContainer.jsx');

/**
 * Top-level view component for Gamelab
 */
var GameLabView = React.createClass({
  propTypes: {
    assetUrl: React.PropTypes.func.isRequired,
    onMount: React.PropTypes.func
  },

  componentDidMount: function () {
    this.props.onMount(this.refs.placeholder.getDOMNode());
  },

  shouldComponentUpdate: function() {
    // Never update this component - lets other code manage its contents
    return false;
  },

  render: function () {
    return <div>
      <RotateContainer assetUrl={this.props.assetUrl} />
      <div ref="placeholder">
      </div>
      <div className="clear"></div>
    </div>;
  }
});
module.exports = GameLabView;
