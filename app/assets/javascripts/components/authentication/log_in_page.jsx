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

  handleLoginSubmit: function () {

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
