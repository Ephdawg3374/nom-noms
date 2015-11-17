$(document).on('ready', function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var rootEl = document.getElementById('nomz');

  var NomzApp = React.createClass({
    render: function () {
      return (
        <div>
          { this.props.children }
        </div>
     );
    }
  });

  var routes = (
   <Route path="/" component={NomzApp}>
     <IndexRoute component={NavigationBar}/>
   </Route>
  );

  React.render(<Router>{routes}</Router>, rootEl);
});
