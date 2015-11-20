var SearchResultsMap = React.createClass({
  componentDidMount: function () {
  // set initial location
    var map = React.findDOMNode(this.refs.map);
    var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };

    this.map = new google.maps.Map(map, mapOptions);

    // if (localStorage.location_index) {
    //   var locations = JSON.parse(localStorage.location_index.locations);
    //
    //   locations.forEach(function (location) {
    //     MarkerStore.createNewMarker(this.map, location);
    //   }.bind(this));
    // }

    MarkerStore.addMarkerChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MarkerStore.removeMarkerChangeListener(this._onChange);
  },

  _onChange: function () {
    MarkerStore.updateMarkersFromLocationStore(this.map);
    MarkerStore.determineMapBoundsAndSetCenter(this.map);
  },

  render: function () {
    return (
      <div className="map" ref="map">
      </div>
    );
  }
});
