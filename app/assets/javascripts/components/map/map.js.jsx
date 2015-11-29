var Map = React.createClass({

  componentDidMount: function () {
    this.determineMapSettings();
  },

  determineMapSettings: function () {
    var map = React.findDOMNode(this.refs.map);

    if (this.props.mode === "locationShowPage") {
      this.map = this.setLocationShowPageMap(map);
      MarkerStore.removeOldMarkers();
      MarkerStore.createNewMarker(this.map, this.props.location);
    } else if (this.props.mode === "searchIndex") {
      this.map = this.setSearchIndexDefaultMap(map);
      MarkerStore.updateMarkersFromLocationStore(this.map);
      MarkerStore.determineMapBoundsAndSetCenter(this.map, this.props.distanceRange);
    }
  },

  setSearchIndexDefaultMap: function (map) {
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };

    return new google.maps.Map(map, mapOptions);
  },

  setLocationShowPageMap: function (map) {
    var mapOptions = {
      draggable: false,
      scrollwheel: false,
      panControl: false,
      center: {
        lat: this.props.location.lat,
        lng: this.props.location.lng,
      },
      zoom: 15
    };

    return new google.maps.Map(map, mapOptions);
  },

  componentWillReceiveProps: function () {
    if (this.props.mode === "locationShowPage") {
      MarkerStore.removeOldMarkers();
      MarkerStore.createNewMarker(this.map, this.props.location);
    } else if (this.props.mode === "searchIndex") {
      MarkerStore.updateMarkersFromLocationStore(this.map);
      MarkerStore.determineMapBoundsAndSetCenter(this.map, this.props.distanceRange);
    }
  },

  render: function () {
    return (
      <div className="search-index-map" ref="map">
      </div>
    );
  }
});
