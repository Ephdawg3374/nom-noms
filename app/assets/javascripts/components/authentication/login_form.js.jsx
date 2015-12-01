var LogInForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        username: "",
        password: "",
        isValid: true,
        errors: []
      }
    );
  },

  componentWillMount: function () {
    if (CurrentUserStore.isLoggedIn()) {
      this.history.goBack();
    }
  },

  handleLogin: function (event) {
    event.preventDefault();

    var credentials = {
      username: this.state.username,
      password: this.state.password
    };

    // var success = function () {
    //  this.history.goBack();
    // }.bind(this);

    var failure = function (errors) {
      this.setState({
        isValid: false,
        errors: errors
      });
    }.bind(this);

    ApiSessionUtil.login(credentials, this.props.success, failure);
  },

  render: function () {
    var modalHeaderText, closeButton;

    var errors = this.state.errors.length > 0 ?
      this.state.errors.map(function (error, idx) {
        return <label key={idx} className="user-form-error-msg">{error}</label>;
      }) : "";

    if (this.props.modalMode) {
      modalHeaderText = "Please login to continue.";
      closeButton = <button className="login-modal-close" onClick={this.props.close}>X</button>;
    }

    return (
      <form className={this.props.klass} onSubmit={this.handleLogin}>
        { closeButton }

        <h1>{ modalHeaderText }</h1>

        <div className="errors-wrapper group">
          { errors }
        </div>

        <div className="auth-page-input-wrapper">
          <label>Username
          <input
            className="auth-page-username"
            type="text"
            valueLink={this.linkState("username")}/>
          </label>

          <label>Password
          <input
            className="auth-page-password"
            type="password"
            valueLink={this.linkState("password")}/>
          </label>

          <button className="submit" type="submit">Log In!</button>
        </div>
      </form>
    );
  }
});
