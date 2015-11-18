$(document).on('ready', function () {
  Link = ReactRouter.Link;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var rootEl = document.getElementById('nomz');

  var NomNomsApp = React.createClass({
    render: function () {
      return (
        <div className="header">
          { this.props.children }
        </div>
     );
    }
  });

  var routes = (
   <Route path="/" component={NomNomsApp}>
     <IndexRoute component={NavigationBar}/>
   </Route>
  );

  React.render(<Router>{routes}</Router>, rootEl);
});
