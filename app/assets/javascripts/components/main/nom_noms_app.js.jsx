var NomNomsApp = React.createClass({
  componentWillMount: function () {
    window.NomNomsApp.searchAuto = false;

    homePageTutorial = window.NomNomsApp.homePageTutorial = false;
    searchIndexTutorial = window.NomNomsApp.searchIndexTutorial = false;
    loggedInTutorial = window.NomNomsApp.loggedInTutorial = false;
    autoCompleteTutorials = window.NomNomsApp.autoCompleteTutorials = false;

    ApiSessionUtil.fetchCurrentUser();
  },

  componentDidMount: function () {
    AppTutorial.start();
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
