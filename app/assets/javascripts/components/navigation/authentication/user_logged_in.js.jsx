var UserLoggedIn = React.createClass({
  userLogout: function () {
    this.history.pushState(null, "/")
  },

  render: function () {
    return (
      <div className="nav-logged-in">
        <button
          className="nav-logout-button"
          onClick={this.userLogout}>
          Log Out
          </button>
      </div>
    );
  }
});
