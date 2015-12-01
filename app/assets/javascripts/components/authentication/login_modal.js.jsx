var LogInModal = React.createClass({
  render: function () {
    var klass = "modal ";

    if (this.props.isOpen) {
      klass += "is-open";
    }

    return (
      <div className={ klass }>
        <LogInForm klass="login-modal-form" modalMode success={ this.props.success } close={this.props.close}/>

        <div className="modal-screen"></div>
      </div>
    );
  }
});
