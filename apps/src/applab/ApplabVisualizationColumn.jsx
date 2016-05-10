var Radium = require('radium');
var studioApp = require('../StudioApp').singleton;
var Visualization = require('./Visualization');
var GameButtons = require('../templates/GameButtons');
var CompletionButton = require('./CompletionButton');
var PlaySpaceHeader = require('./PlaySpaceHeader');
var PhoneFrame = require('./PhoneFrame');
var BelowVisualization = require('../templates/BelowVisualization');
var ProtectedStatefulDiv = require('../templates/ProtectedStatefulDiv');
var applabConstants = require('./constants');
var connect = require('react-redux').connect;
var classNames = require('classnames');

var styles = {
  nonResponsive: {
    maxWidth: applabConstants.APP_WIDTH,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 68,
    left: 16,
    width: applabConstants.APP_WIDTH,
    height: applabConstants.APP_HEIGHT,
    zIndex: 5,
    textAlign: 'center',
    cursor: 'pointer',
  },
  playButton: {
    color: 'white',
    fontSize: 200,
    lineHeight: applabConstants.APP_HEIGHT+'px',
  },
};

var IframeOverlay = Radium(function (props) {
  return (
    <div style={[styles.overlay]} onClick={() => studioApp.startIFrameEmbeddedApp()}>
      <span className="fa fa-play" style={[styles.playButton]} />
    </div>
  );
});

/**
 * Equivalent of visualizationColumn.html.ejs. Initially only supporting
 * portions used by App Lab
 */
var ApplabVisualizationColumn = React.createClass({
  propTypes: {
    isReadOnlyWorkspace: React.PropTypes.bool.isRequired,
    instructionsInTopPane: React.PropTypes.bool.isRequired,
    visualizationHasPadding: React.PropTypes.bool.isRequired,
    hideSource: React.PropTypes.bool.isRequired,
    isShareView: React.PropTypes.bool.isRequired,
    isEmbedView: React.PropTypes.bool.isRequired,
    isRunning: React.PropTypes.bool.isRequired,
    interfaceMode: React.PropTypes.string.isRequired,
    isIframeEmbed: React.PropTypes.bool.isRequired,

    // non redux backed
    isEditingProject: React.PropTypes.bool.isRequired,
    screenIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onScreenCreate: React.PropTypes.func.isRequired,
  },

  render: function () {
    var showFrame = !this.props.isShareView;

    return (
      <div
          id="visualizationColumn"
          className={classNames({with_padding: this.props.visualizationHasPadding})}
          style={[
            (this.props.isEmbedView || this.props.hideSource) && styles.nonResponsive
          ]}
      >
        {!this.props.isReadOnlyWorkspace && <PlaySpaceHeader
            isEditingProject={this.props.isEditingProject}
            screenIds={this.props.screenIds}
            onScreenCreate={this.props.onScreenCreate} />
        }
        <PhoneFrame
            showFrame={showFrame}
            isDark={this.props.isRunning}
            showSelector={this.props.interfaceMode === applabConstants.ApplabInterfaceMode.DESIGN}
            screenIds={this.props.screenIds}
            onScreenCreate={this.props.onScreenCreate}
        >
          <Visualization/>
          {this.props.isIframeEmbed && !this.props.isRunning && <IframeOverlay />}
        </PhoneFrame>
        <GameButtons instructionsInTopPane={this.props.instructionsInTopPane}>
          <CompletionButton/>
        </GameButtons>
        <BelowVisualization instructionsInTopPane={this.props.instructionsInTopPane}/>
      </div>
    );
  }
});
module.exports = connect(function propsFromStore(state) {
  return {
    isReadOnlyWorkspace: state.pageConstants.isReadOnlyWorkspace,
    instructionsInTopPane: state.pageConstants.instructionsInTopPane,
    visualizationHasPadding: state.pageConstants.visualizationHasPadding,
    hideSource: state.pageConstants.hideSource,
    isShareView: state.pageConstants.isShareView,
    isEmbedView: state.pageConstants.isEmbedView,
    isIframeEmbed: state.pageConstants.isIframeEmbed,
    isRunning: state.runState.isRunning,
    interfaceMode: state.interfaceMode
  };
})(Radium(ApplabVisualizationColumn));
