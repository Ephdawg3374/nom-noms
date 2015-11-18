var UserLoggedOut = React.createClass({
  render: function () {
    return (
      <div className="nav-logged-out">
        <button className="nav-signup-button">
          <a href="/users/new">Sign Up</a>
        </button>

        <button className="nav-login-button">
          <a href="/session/new">Log In</a>
        </button>
      </div>
    );
  }
});
