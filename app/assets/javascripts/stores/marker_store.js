(function() {
  var _markers = [];
  var LOCATIONS_UPDATED = "LOCATIONS_UPDATED";
  var MARKERS_UPDATED = "MARKERS_UPDATED";

  window.MarkerStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _markers.slice();
    },

    updateMarkersFromLocationStore: function (map) {
      var markers = _markers.slice();

      markers.forEach(function (marker) {
       if (!this.markerIncludedInLocationStore(marker)) {
         marker.setMap(null);
         markers.splice(markers.indexOf(marker), 1);
        }
      }.bind(this));

      LocationStore.all().forEach(function (location) {
        if (!this.locationIncludedInMarkerStore(location)) {
          var newMarker = this.createNewMarker(location);
          newMarker.setMap(map);
          markers.push(newMarker);
        }
      }.bind(this));

      _markers = markers;

      this.emit(MARKERS_UPDATED);

      this.setMarkerLabelsToSearchIndices();
    },

    setMarkerLabelsToSearchIndices: function () {
      _markers.forEach(function (marker, idx) {
        marker.set('label', (idx + 1).toString());
      });
    },

    determineMapBoundsAndSetCenter: function (map) {
      var zoomChangeBoundsListener =
        google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
          map.setZoom(13);
        });

      var latLngBounds = new google.maps.LatLngBounds();

      LocationStore.allLatLngObjects().forEach(function (latLng) {
        latLngBounds.extend(latLng);
      });

      map.setCenter(latLngBounds.getCenter());
      map.fitBounds(latLngBounds);

      setTimeout(function() {
          google.maps.event.removeListener(zoomChangeBoundsListener);
        },2000
      );
    },

    markerIncludedInLocationStore: function (marker) {
      var result = false;

      LocationStore.all().forEach(function (location) {
        if (location.id === marker.locationId) {
          result = true;
        }
      });

      return result;
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

    locationIncludedInMarkerStore: function (location) {
      var result = false;

      _markers.forEach(function (marker) {
        if (marker.locationId === location.id) {
          result = true;
        }
      });

      return result;
    },

    createNewMarker: function (location, idx) {
      var coord = {lat: location.lat, lng: location.lng};

      var marker = new google.maps.Marker({
        position: coord,
        locationId: location.id
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
