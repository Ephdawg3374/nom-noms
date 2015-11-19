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
          <img src={window.NomNomsApp.images.logoImage}/>
        </figure>

        <LocationSearch />

        {authComponent}

      </div>
    );
  }
});
