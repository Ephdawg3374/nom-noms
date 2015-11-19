(function() {
  var _markers = [];
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

    locationIncludedInMarkerStore: function (location) {
      var result = false;

      _markers.forEach(function (marker) {
        if (marker.locationId === location.id) {
          result = true;
        }
      });

      return result;
    },

    createNewMarker: function (location) {
      var coord = {lat: location.lat, lng: location.lng};

      var marker = new google.maps.Marker({
        position: coord,
        locationId: location.id
      });

      return marker;
    },

    addMarkerChangeListener: function (callback) {
      this.on(MARKERS_UPDATED, callback);
    },

    removeMarkerChangeListener: function (callback) {
      this.removeListener(MARKERS_UPDATED, callback);
    },

    emitChange: function () {
      this.emit(MARKERS_UPDATED);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_SEARCH_RESULTS:
          AppDispatcher.waitFor([LocationStore.dispatcherId]);
          MarkerStore.emitChange();
          break;
        default:

      }
    })

  });

}());
