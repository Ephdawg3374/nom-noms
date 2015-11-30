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

    var success = function () {
     this.history.goBack();
    }.bind(this);

    var failure = function (errors) {
      this.setState({
        isValid: false,
        errors: errors
      });
    }.bind(this);

    ApiSessionUtil.login(credentials, success, failure);
  },

  render: function () {
    var errors = this.state.errors.length > 0 ?
      this.state.errors.map(function (error, idx) {
        return <label key={idx} className="user-form-error-msg">{error}</label>;
      }) : "";

    return (
      <form className="auth-page-form" onSubmit={this.handleLogin}>
        <h1>Log into your account.</h1>

        <div className="user-form-errors-wrapper group">
          { errors }
        </div>

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

        <button type="submit">Log In!</button>
      </form>
    );
  }
});
