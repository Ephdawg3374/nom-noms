var UserLoggedIn = React.createClass({
  handleUserLogout: function (event) {
    event.preventDefault();

    ApiSessionUtil.logout();
  },

  render: function () {
    var tinyPicUrl = CurrentUserStore.currentUser().tiny_url;

    return (
      <div className="nav-logged-in">
        <a href="#" className="nav-logged-in-tiny-pic">
          <img src={ tinyPicUrl } />
        </a>
        <button onClick={ this.handleUserLogout }>
          Log Out
        </button>
      </div>
    );
  }
});
