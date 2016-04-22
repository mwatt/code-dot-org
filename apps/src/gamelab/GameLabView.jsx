/** @file Top-level view for GameLab */
'use strict';

var _ = require('../lodash');
var AnimationTab = require('./AnimationTab/index');
var connect = require('react-redux').connect;
var ConnectedStudioAppWrapper = require('../templates/ConnectedStudioAppWrapper');
var GameLabInterfaceMode = require('./constants').GameLabInterfaceMode;
var GameLabVisualizationHeader = require('./GameLabVisualizationHeader');
var GameLabVisualizationColumn = require('./GameLabVisualizationColumn');
var ProtectedStatefulDiv = require('../templates/ProtectedStatefulDiv');
var InstructionsWithWorkspace = require('../templates/instructions/InstructionsWithWorkspace');


/**
 * Top-level React wrapper for GameLab
 */
var GameLabView = React.createClass({
  propTypes: {
    interfaceMode: React.PropTypes.oneOf([GameLabInterfaceMode.CODE, GameLabInterfaceMode.ANIMATION]).isRequired,
    isEmbedView: React.PropTypes.bool.isRequired,
    isShareView: React.PropTypes.bool.isRequired,
    codeWorkspace: React.PropTypes.element.isRequired,
    showFinishButton: React.PropTypes.bool.isRequired,
    onMount: React.PropTypes.func.isRequired
  },

  componentDidMount: function () {
    this.props.onMount();
  },

  renderCodeMode: function () {
    // Code mode contains protected (non-React) content.  We have to always
    // render it, so when we're not in code mode use CSS to hide it.
    var codeModeStyle = {};
    if (this.props.interfaceMode !== GameLabInterfaceMode.CODE) {
      codeModeStyle.display = 'none';
    }

    return (
      <div style={codeModeStyle}>
        <div id="visualizationColumn">
          {this.shouldShowHeader() && <GameLabVisualizationHeader />}
          <GameLabVisualizationColumn finishButton={this.props.showFinishButton}/>
        </div>
        <ProtectedStatefulDiv id="visualizationResizeBar" className="fa fa-ellipsis-v" />
        <InstructionsWithWorkspace
          codeWorkspace={this.props.codeWorkspace}/>
      </div>
    );
  },

  renderAnimationMode: function () {
    return this.props.interfaceMode === GameLabInterfaceMode.ANIMATION ?
        <AnimationTab /> :
        undefined;
  },

  shouldShowHeader: function () {
    return !(this.props.isEmbedView || this.props.isShareView);
  },

  render: function () {
    return (
      <ConnectedStudioAppWrapper>
        {this.renderCodeMode()}
        {this.renderAnimationMode()}
      </ConnectedStudioAppWrapper>
    );
  }
});
module.exports = connect(function propsFromStore(state) {
  return {
    interfaceMode: state.interfaceMode,
    isEmbedView: state.level.isEmbedView,
    isShareView: state.level.isShareView
  };
})(GameLabView);
