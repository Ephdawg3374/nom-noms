var NomNomsApp = React.createClass({
  componentWillMount: function () {
    window.NomNomsApp.search_auto = false;
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
