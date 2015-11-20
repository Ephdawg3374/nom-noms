var NewUserPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        username: "",
        password: ""
      }
    );
  },

  handleNewUserSubmit: function (event) {
    event.preventDefault();

    var newUser = {
      username: this.state.username,
      password: this.state.password
    };

    ApiUserUtil.create(newUser, function () {
     this.history.pushState(null, "/");
    }.bind(this));
  },

  render: function () {
    return (
      <div className="auth-page">
        <h1>Create a new user</h1>
        <form className="auth-page-form" onSubmit={this.handleNewUserSubmit}>

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

          <button type="submit">Create new user</button>

        </form>
      </div>
    );
  }
});
