var LogInModal = React.createClass({
  render: function () {
    var klass = "login-modal ";

    if (this.props.isOpen) {
      klass += "is-open";
    }

    return (
      <div className={ klass }>
        <LogInForm klass="login-modal-form" modalMode success={ this.props.success } close={this.props.close}/>

        <div className="login-modal-screen"></div>
      </div>
    );
  }
});
