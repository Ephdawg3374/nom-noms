var LogInModal = React.createClass({
  render: function () {
    var klass = "login-modal-screen ";

    if (this.props.isOpen) {
      klass += "is-open";
    }

    return (
      <div className={ klass }>
        <LogInForm klass="auth-page-form" success={ this.props.success }/>

        <div className="login-modal-screen"></div>
      </div>
    );
  }
});
