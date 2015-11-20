var UserLoggedIn = React.createClass({
  handleUserLogout: function (event) {
    event.preventDefault();
  },

  render: function () {
    return (
      <div className="nav-logged-in">
        <button onClick={this.handleUserLogout}>
          Log Out
        </button>
      </div>
    );
  }
});
