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
    var errorsClass = "errors ";

    if (!this.state.isValid) {
      errors = this.state.errors.map( function(err, idx) {
        return <li key={ idx }>{ err }</li>;
      });

      errorsClass += "active";

      window.setTimeout(function () {
        $(".errors").removeClass("active");
      }, 1000);

      window.setTimeout(function () {
        this.setState({ isValid: true });
      }.bind(this), 2000);
    }

    return (
      <div className="main-app">

        <ul className={ errorsClass }>
          { errors }
        </ul>

        <header className="header">
          <NavigationBar showErrors={ this.showErrors }/>
        </header>

        { this.props.children }
      </div>
   );
  }
});
