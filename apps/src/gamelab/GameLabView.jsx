/**
 * Top-level view component for Gamelab
 */
var GameLabView = React.createClass({
  propTypes: {
    onMount: React.PropTypes.func,
  },

  componentDidMount: function () {
    this.props.onMount(this.refs.placeholder.getDOMNode());
  },

  shouldComponentUpdate: function() {
    // Never update this component - lets other code manage its contents
    return false;
  },


  render: function () {
    return <div ref="placeholder"></div>;
  }
});
module.exports = GameLabView;
