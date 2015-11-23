var NomNomsApp = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
   return { currentUser: null };
  },

  componentWillMount: function () {
   ApiSessionUtil.fetchCurrentUser();
  },

  // _ensureLoggedIn: function () {
  //  if (!CurrentUserStore.isLoggedIn()) {
  //    this.history.pushState(null, "/login");
  //  }
  //
  //  this.setState(
  //    {currentUser: CurrentUserStore.currentUser()}
  //  );
  // },

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
