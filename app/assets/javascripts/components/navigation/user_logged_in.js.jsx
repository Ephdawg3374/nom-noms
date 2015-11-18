var UserLoggedIn = React.createClass({
  handleUserLogout: function () {
    
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
