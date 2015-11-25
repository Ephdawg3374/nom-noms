var NomNomsApp = React.createClass({
  getInitialState: function () {
   return { currentUser: null };
  },

  componentWillMount: function () {
    window.NomNomsApp.search_auto = false;
    ApiSessionUtil.fetchCurrentUser();
  },

  render: function () {
    return (
      <div>
        <header className="header">
          <NavigationBar />
        </header>

        { this.props.children }
      </div>
   );
  }
});
