var LogInPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        username: "",
        password: ""
      }
    );
  },

  componentWillMount: function () {
    if (CurrentUserStore.isLoggedIn()) {
      this.history.pushState(null, "/");
    }
  },

  handleLogin: function (event) {
    event.preventDefault();

    var credentials = {
      username: this.state.username,
      password: this.state.password
    };

    ApiSessionUtil.login(credentials, function () {
     this.history.pushState(null, "/");
    }.bind(this));
  },

  render: function () {
    return (
      <div className="auth-page">
        <h1>Log into your account</h1>
          <form className="auth-page-form" onSubmit={this.handleLogin}>

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
      </div>
    );
  }
});
