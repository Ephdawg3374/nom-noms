var UserLoggedIn = React.createClass({
  mixins: [ReactRouter.History],

  handleUserLogout: function (event) {
    event.preventDefault();

    ApiSessionUtil.logout(function () {
      this.history.pushState(null, "/");
    }.bind(this));
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
