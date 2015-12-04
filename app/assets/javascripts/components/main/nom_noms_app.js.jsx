var NomNomsApp = React.createClass({
  componentWillMount: function () {
    window.NomNomsApp.searchAuto = false;
    window.NomNomsApp.userSearchTutorial = false;
    window.NomNomsApp.searchIndexTutorial = false;
    window.NomNomsApp.locationShowPageTutorial = false;
    window.NomNomsApp.userShowPageTutorial = false;
    window.NomNomsApp.loggedInTutorial = false;
    ApiSessionUtil.fetchCurrentUser();
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
