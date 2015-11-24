var SearchIndex = React.createClass({
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

    LocationStore.addChangeListener(this._onChange);
    MarkerStore.addChangeListener(this._onMarkerUpdate);
  },

  componentWillUnmount: function () {
    LocationStore.removeChangeListener(this._onChange);
    MarkerStore.removeChangeListener(this._onMarkerUpdate);
  },

  _onChange: function () {
    this.setState({ locations: LocationStore.all() });
    this.setPState({ locations: LocationStore.all() });
  },

  _onMarkerUpdate: function () {
    this.forceUpdate();
  },

  render: function () {
    var locationIndexItems;

    if (this.state.locations)  {
      locationIndexItems = this.state.locations.map( function(location, idx) {
        return <SearchIndexItem
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
