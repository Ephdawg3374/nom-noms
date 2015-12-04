var NomNomsApp = React.createClass({
  componentWillMount: function () {
    window.NomNomsApp.searchAuto = false;

    window.NomNomsApp.homePageTutorial = false;
    window.NomNomsApp.userSearchTutorial = false;
    window.NomNomsApp.searchIndexTutorial = false;
    window.NomNomsApp.locationShowPageTutorial = false;
    window.NomNomsApp.userShowPageTutorial = false;
    window.NomNomsApp.loggedInTutorial = false;
    ApiSessionUtil.fetchCurrentUser();
  },

  componentDidMount: function () {
    $(".location-type-autocomplete-list").one("mouseover", function () {
      FindAutocompleteTutorial.start();
    });

    $(".location-area-autocomplete").one("mouseover", function () {
      NearAutocompleteTutorial.start();
    });
  },

  render: function () {
    return (
      <div className="main-app">
        <header className="header">
          <NavigationBar />
        </header>

        { this.props.children }
      </div>
   );
  }
});
