var SearchIndex = React.createClass({
  // getInitialState: function () {
  //   return ({ locations: LocationStore.all() });
  // },

  componentWillMount: function () {
    // this.setPId('search_index');
    // this.setPStorage(this.localStorage);
    // this.restorePState();
    //
    // if (localStorage.location_index) {
    //   var locations = JSON.parse(localStorage.location_index).locations;
    //   SearchActions.receiveSearchResults(locations);
    // }
  },

  componentDidMount: function () {
    // LocationStore.addChangeListener(this._onChange);
    MarkerStore.addChangeListener(this._onMarkerUpdate);
  },

  componentWillUnmount: function () {
    // LocationStore.removeChangeListener(this._onChange);
    MarkerStore.removeChangeListener(this._onMarkerUpdate);
  },

  _onChange: function () {
    // this.setState({ locations: LocationStore.all() });
    // this.setPState({ locations: LocationStore.all() });
  },

  _onMarkerUpdate: function () {
    this.forceUpdate();
  },

  render: function () {
    var searchIndexItems;

    if (this.props.locations)  {
      searchIndexItems = this.props.locations.map( function(location, idx) {
        return <SearchIndexItem
          key={location.id}
          location={location}
          marker={MarkerStore.findMatchingMarker(location)}
          />;
      });
    }

    return (
      <div className="search-index">
        {searchIndexItems}
      </div>
    );
  }
});
