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
    locTypeAutocompleteTutorial = window.NomNomsApp.locTypeAutocompleteTutorial = false;
    locAreaAutocompleteTutorial = window.NomNomsApp.locAreaAutocompleteTutorial = false;
    userSearchAutocompleteTutorial = window.NomNomsApp.userSearchAutocompleteTutorial = false;

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
        return <li key={ idx }>{ err }</li>;
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
          <NavigationBar showErrors={ this.showErrors }/>
        </header>

        { this.props.children }
      </div>
   );
  }
});
