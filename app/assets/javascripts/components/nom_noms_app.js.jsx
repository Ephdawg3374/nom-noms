var NomNomsApp = React.createClass({
  getInitialState: function () {
   return { currentUser: null };
  },

  componentWillMount: function () {
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
