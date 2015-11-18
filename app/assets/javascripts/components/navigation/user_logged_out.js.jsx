var UserLoggedOut = React.createClass({
  mixins: [ReactRouter.History],

  goToSignUpPage: function () {
    this.history.pushState(null, "/users/new");
  },

  goToLoginPage: function () {
    this.history.pushState(null, "/session/new");
  },

  render: function () {
    return (
      <div className="nav-logged-out">
        <button onClick={this.goToSignUpPage}>
          Sign Up
        </button>

        <button onClick={this.goToLoginPage}>
          Log In
        </button>
      </div>
    );
  }
});
