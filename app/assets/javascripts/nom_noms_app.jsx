$(document).on('ready', function () {
  Link = ReactRouter.Link;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var rootEl = document.getElementById('content');

  var NomNomsApp = React.createClass({
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

  var routes = (
   <Route path="/" component={NomNomsApp}>
     <IndexRoute component={HomePage}/>
     <Route path="/users/new" component={NewUserPage}/>
     <Route path="/session/new" component={LogInPage}/>
     <Route path="/search_results" component={SearchResultsPage}/>
   </Route>
  );

  React.render(<Router>{routes}</Router>, rootEl);
});
