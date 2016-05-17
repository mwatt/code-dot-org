import GameButtons, {ResetButton} from '../templates/GameButtons';
import IFrameEmbedOverlay from './IFrameEmbedOverlay';

var Radium = require('radium');
var Visualization = require('./Visualization');
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
  completion: {
    display: 'inline'
  },
  phoneFrameCompletion: {
    display: 'block',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  resetButtonWrapper: {
    position: 'absolute',
    bottom: 5,
    textAlign: 'center',
    width: '100%',
  },
  resetButton: {
    display: 'inline-block',
    width: 42,
    minWidth: 0,
    backgroundColor: '#4d575f',
    borderColor: '#4d575f',
    padding: 7,
    height: 42,
    marginLeft: 5,
    position: 'relative',
    left: 2,
    bottom: 2,
  },
  resetButtonImage: {
    marginLeft: 2,
    marginTop: -2,
  },
};

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
    playspacePhoneFrame: React.PropTypes.bool,
    isIframeEmbed: React.PropTypes.bool.isRequired,

    // non redux backed
    isEditingProject: React.PropTypes.bool.isRequired,
    screenIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onScreenCreate: React.PropTypes.func.isRequired,
  },

  render: function () {
    let visualization = [
      <Visualization key="1"/>,
      this.props.isIframeEmbed && !this.props.isRunning && <IFrameEmbedOverlay key="2"/>
    ];
    if (this.props.playspacePhoneFrame) {
      // wrap our visualization in a phone frame
      visualization = (
        <PhoneFrame
            isDark={this.props.isRunning}
            showSelector={!this.props.isRunning}
            isPaused={this.props.isPaused}
            screenIds={this.props.screenIds}
            onScreenCreate={this.props.onScreenCreate}
        >
          {visualization}
        </PhoneFrame>
      );
    }
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
        {visualization}
        {this.props.isIframeEmbed &&
         <div style={styles.resetButtonWrapper}>
           <ResetButton hideText={true}
                        style={styles.resetButton}
                        imageStyle={styles.resetButtonImage} />
         </div>
        }
        <GameButtons>
          {/* This div is used to control whether or not our finish button is centered*/}
          <div style={[
              styles.completion,
              this.props.playspacePhoneFrame && styles.phoneFrameCompletion
            ]}
          >
            <CompletionButton/>
          </div>
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
    isPaused: state.runState.isDebuggerPaused,
    interfaceMode: state.interfaceMode,
    playspacePhoneFrame: state.pageConstants.playspacePhoneFrame
  };
})(Radium(ApplabVisualizationColumn));
