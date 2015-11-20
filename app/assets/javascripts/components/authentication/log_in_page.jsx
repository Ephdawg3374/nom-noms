var LogInPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return (
      {
        username: "",
        password: ""
      }
    );
  },

  handleLoginSubmit: function (event) {
    event.preventDefault();

    var credentials = JSON.stringify($(event.currentTarget));

     SessionsApiUtil.login(credentials, function () {
       this.history.pushState(null, "/users");
     }.bind(this));
  },

  render: function () {
    return (
      <div className="auth-page">
        <h1>Log into your account</h1>
        <form className="auth-page-form" onSubmit={this.handleLoginSubmit}>
          <label>Username
          <input className="auth-page-username" type="text" valueLink={this.linkState("username")}/>
          </label>

          <label>Password
          <input className="auth-page-password" type="password" valueLink={this.linkState("password")}/>
          </label>

        </form>
      </div>
    );
  }
});
