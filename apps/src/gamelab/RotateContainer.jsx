var msg = require('../locale');

/**
 * React version of the rotation overlay.
 */
var RotateContainer = React.createClass({
  propTypes: {
    assetUrl: React.PropTypes.func.isRequired
  },

  render: function () {
    return <div id="rotateContainer" style={{backgroundImage: "url(" + this.props.assetUrl('media/turnphone_horizontal.png') + ")"}}>
      <div id="rotateText">
        <p>{ msg.rotateText() }<br />{ msg.orientationLock() }</p>
      </div>
    </div>;
  }
});
module.exports = RotateContainer;
