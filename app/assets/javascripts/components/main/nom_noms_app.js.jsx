var NomNomsApp = React.createClass({
  getInitialState: function () {
    return (
      {
        isValid: true,
        errors: []
      }
    );
  },

  showErrors: function (errors) {
    this.setState(
      {
        isValid: false,
        errors: errors
      }
    );
  },

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
    var errors;
    var errorClass = "errors ";

    if (!this.state.isValid) {
      errors = this.state.errors.map( function(err, idx) {
        return <li key={idx}>{err}</li>;
      });

      errorClass += "display";

      window.setTimeout(function () {
        $(".errors").removeClass("display");
      }, 0);
    }

    return (
      <div className="main-app">

        <div className={ errorClass }>
          { errors }
        </div>

        <header className="header">
          <NavigationBar />
        </header>

        { this.props.children }
      </div>
   );
  }
});
