var UserLoggedIn = React.createClass({
  componentDidMount: function () {
    if (!loggedInTutorial) {
      NavLoggedInTutorial.start();
      loggedInTutorial = true;
    }
  },

  handleUserLogout: function (event) {
    event.preventDefault();

    ApiSessionUtil.logout();
  },

  render: function () {
    var tinyPicUrl = CurrentUserStore.currentUser().tiny_url;

    return (
      <div className="nav-logged-in">
        <Link className = "nav-logged-in-tiny-pic" to={"/users/" + CurrentUserStore.currentUser().id}>
          <img src={ tinyPicUrl } />
        </Link>
        <button onClick={ this.handleUserLogout }>
          Log Out
        </button>
      </div>
    );
  }
});
