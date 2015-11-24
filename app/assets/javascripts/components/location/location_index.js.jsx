var LocationIndex = React.createClass({
  mixins: [ReactPersistentState],

  getInitialState: function () {
    return ({ locations: LocationStore.all() });
  },

  componentDidMount: function () {
    this.setPId('location_index');
    this.setPStorage(this.localStorage);
    this.restorePState();

    if (localStorage.location_index) {
      var locations = JSON.parse(localStorage.location_index).locations;
      SearchActions.receiveSearchResults(locations);
    }

    MarkerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MarkerStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ locations: LocationStore.all() });
    this.setPState({ locations: LocationStore.all() });
  },

  render: function () {
    var locationIndexItems;

    if (this.state.locations)  {
      locationIndexItems = this.state.locations.map( function(location, idx) {
        return <LocationIndexItem
          key={location.id}
          location={location}
          marker={MarkerStore.findMatchingMarker(location)}
          />;
      });
    }

    return (
      <div className="location-index">
        {locationIndexItems}
      </div>
    );
  }
});
