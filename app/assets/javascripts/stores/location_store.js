(function() {
  var _locations = [];
  var _latLngObjects = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  window.LocationStore = window.LocationStore || $.extend({}, EventEmitter.prototype, {
    resetLocations: function (searchResults) {
      _locations = searchResults;
    },

    resetLatLngObjects: function (latLngObjects) {
      _latLngObjects = latLngObjects;
    },

    sortLocations: function (newMode) {
      switch (newMode) {
        case "Distance":
          this.sortLocationsByDistance();
          this.emit(CHANGE_EVENT);
          break;
        case "Rating":
          this.sortLocationsByRating();
          this.emit(CHANGE_EVENT);
          break;
        default:
          this.sortLocationsByDistance();
          this.emit(CHANGE_EVENT);
          break;
      }
    },

    sortLocationsByDistance: function () {
      var sortable = [];

      for (var idx in _locations) {
        sortable.push([_locations[idx], _locations[idx].distance]);
      }

      sortable.sort(function(a, b) {
        return a[1] - b[1];
      });

      var sortedLocations = sortable.map(function(location) {
        return location[0];
      });

      _locations = sortedLocations;
    },

    sortLocationsByRating: function () {
      var sortable = [];

      for (var idx in _locations) {
        sortable.push([_locations[idx], _locations[idx].ave_rating]);
      }

      sortable.sort(function(b, a) {
        return a[1] - b[1];
      });

      var sortedLocations = sortable.map(function(location) {
        return location[0];
      });

      _locations = sortedLocations;
    },

    find_location: function (id) {
      var location = {};

      for (i = 0; i < _locations.length; i++) {
        if (_locations[i].id === id) {
          location = _locations[i];
          break;
        }
      }

      return location;
    },

    repopulateStore: function (locations) {
      _locations = locations;
    },

    all: function () {
      return _locations.slice();
    },

    allLatLngObjects: function () {
      return _latLngObjects.slice();
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    addLocation: function (location, latLngObject) {
      for (var i = 0; i < _locations.length; i++) {
        if (_locations[i].id === location.id) {
          _locations[i] = location;
          return;
        }
      }

      _locations.push(location);
      _latLngObjects.push(latLngObject);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_SINGLE_LOCATION:
          LocationStore.addLocation(payload.location, payload.latLngObject);
          LocationStore.emit(CHANGE_EVENT);
          break;
        case SearchConstants.RECEIVE_LOCATIONS:
          LocationStore.resetLocations(payload.locations);
          LocationStore.resetLatLngObjects(payload.latLngObjects);
          LocationStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
