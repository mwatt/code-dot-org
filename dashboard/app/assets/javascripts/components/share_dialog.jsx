//= require ./share_dialog_body
//= require ./dialog

window.dashboard = window.dashboard || {};

window.dashboard.ShareDialog = (function (React) {
  var Dialog = window.dashboard.Dialog;
  var ShareDialogBody = window.dashboard.ShareDialogBody;

  return React.createClass({
    propTypes: {
      i18n: React.PropTypes.object.isRequired,
      icon: React.PropTypes.string,
      title: React.PropTypes.string.isRequired,
      shareCopyLink: React.PropTypes.string.isRequired,
      shareUrl: React.PropTypes.string.isRequired,
      encodedShareUrl: React.PropTypes.string.isRequired,
      closeText: React.PropTypes.string.isRequired,
      isAbusive: React.PropTypes.bool.isRequired,
      abuseTos: React.PropTypes.string.isRequired,
      abuseContact: React.PropTypes.string.isRequired,
      onClickPopup: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
      return { isOpen: true };
    },

    componentWillReceiveProps: function (newProps) {
      this.setState({isOpen: true});
    },

    close: function () {
      this.setState({isOpen: false});
    },

    render: function () {
      // TODO - Can we now make SendToPhone completely Reactified?
      return (
        <Dialog isOpen={this.state.isOpen} handleClose={this.close}>
          {/* TODO - do we really want this as a separate component? maybe
            if that makes separating out dialog from body easier in general */}
          <ShareDialogBody
            i18n={this.props.i18n}
            icon={this.props.icon}
            title={this.props.title}
            shareCopyLink={this.props.shareCopyLink}
            shareUrl={this.props.shareUrl}
            encodedShareUrl={this.props.encodedShareUrl}
            closeText={this.props.closeText}
            isAbusive={this.props.isAbusive}
            abuseTos={this.props.abuseTos}
            abuseContact={this.props.abuseContact}
            onClickPopup={this.props.onClickPopup}
            onClickClose={this.close}
            />
        </Dialog>
      );
    }
  });
})(React);
