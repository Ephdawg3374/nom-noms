var NavigationBar = React.createClass({
  render: function () {
    var authComponent;

    if (window.userIsLoggedIn) {
      authComponent = <UserLoggedIn />;
    } else {
      authComponent = <UserLoggedOut />;
    }

    return (
      <div className="nav-bar group">

        <figure className="nav-bar-logo">
          <a href="/">
            <img src={window.NomNomsApp.images.logoImage}/>
          </a>
        </figure>

        <LocationSearch />

        {authComponent}

      </div>
    );
  }
});
