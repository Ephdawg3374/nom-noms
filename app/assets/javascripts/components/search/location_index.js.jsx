var LocationIndex = React.createClass({
  getInitialState: function () {
    return ({ locations: LocationStore.all() });
  },

  componentDidMount: function () {
    LocationStore.addLocationIndexChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    LocationStore.removeLocationIndexChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ locations: LocationStore.all() });
  },

  render: function () {
    var locationIndexItems;

    if (this.state.locations)  {
      locationIndexItems = this.state.locations.map( function(location) {
        return <LocationIndexItem key={location.id} location={location} />;
      });
    }

    return (
      <div className="location-index">
        {locationIndexItems}
      </div>
    );
  }
});
