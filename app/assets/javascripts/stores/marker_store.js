(function() {
  var _markers = [];
  var LOCATIONS_UPDATED = "LOCATIONS_UPDATED";
  var MARKERS_UPDATED = "MARKERS_UPDATED";

  window.MarkerStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _markers.slice();
    },

    updateMarkersFromLocationStore: function (map, locations) {
      var newLocations = locations || LocationStore.all();

      this.removeOldMarkers();

      this.createNewMarkers(map, newLocations);

      this.emit(MARKERS_UPDATED);

      // this.setMarkerLabelsToSearchIndices();
    },

    removeOldMarkers: function () {
      _markers.forEach(function (marker) {
        marker.setMap(null);
      });

      _markers = [];
    },

    createNewMarkers: function (map, newLocations) {
      newLocations.forEach(function (location) {
        var marker = this.createNewMarker(map, location);
        _markers.push(marker);
      }.bind(this));
    },

    // setMarkerLabelsToSearchIndices: function () {
    //   _markers.forEach(function (marker, idx) {
    //     marker.set('label', (idx + 1).toString());
    //   });
    // },

    determineMapBoundsAndSetCenter: function (map) {
      var zoomChangeBoundsListener =
        google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
          map.setZoom(13);
        });

      var latLngBounds = new google.maps.LatLngBounds();

      LocationStore.allLatLngObjects().forEach(function (latLng) {
        latLngBounds.extend(latLng);
      });

      // map.setCenter(latLngBounds.getCenter());
      // map.fitBounds(latLngBounds);
      map.panTo(latLngBounds.getCenter());

      setTimeout(function() {
          google.maps.event.removeListener(zoomChangeBoundsListener);
        },2000
      );
    },

    findMatchingMarker: function (location) {
      var match = false;
      var matchedMarker;

      for (var i = 0; i < _markers.length; i++) {
        if (_markers[i].locationId === location.id) {
          matchedMarker = _markers[i];
          break;
        }
      }
      return matchedMarker;
    },

    createNewMarker: function (map, location) {
      var coord = {lat: location.lat, lng: location.lng};

      var marker = new google.maps.Marker({
        position: coord,
        locationId: location.id,
        map: map
      });

      return marker;
    },

    addMarkerChangeListener: function (callback) {
      this.on(LOCATIONS_UPDATED, callback);
    },

    addMarkersUpdatedListener: function (callback) {
      this.on(MARKERS_UPDATED, callback);
    },

    removeMarkerChangeListener: function (callback) {
      this.removeListener(LOCATIONS_UPDATED, callback);
    },

    removeMarkersUpdatedListener: function (callback) {
      this.removeListener(MARKERS_UPDATED, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_SEARCH_RESULTS:
          AppDispatcher.waitFor([LocationStore.dispatcherId]);
          MarkerStore.emit(LOCATIONS_UPDATED);
          break;
        default:

      }
    })

  });

}());
