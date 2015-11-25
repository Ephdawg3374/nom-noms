$(document).on('ready', function () {
  Link = ReactRouter.Link;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var rootEl = document.getElementById('content');
  // localStorage.clear();
  var routes = (
  <Route path="/" component={NomNomsApp}>
    <IndexRoute component={HomePage} />
    <Route name="newUser" path="/users/new" component={NewUserPage} />
    <Route name="newSession" path="/session/new" component={LogInPage} />
    <Route name="search" path="/search" component={SearchResultsPage} />
    <Route name="location" path="/locations/:location_id" component={LocationShowPage} />
    <Route name="newReview" path="/locations/:location_id/reviews/new" component={ReviewFormPage} />
  </Route>
  );

  React.render(<Router>{routes}</Router>, rootEl);
});
