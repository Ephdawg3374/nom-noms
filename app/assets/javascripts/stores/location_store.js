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

    find_location: function (id) {
      var location;

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

    addLocation: function (location) {
      for (var i = 0; i < _locations.length; i++) {
        if (_locations[i].id === location.id) {
          _locations[i] = location;
          return;
        }
      }

      _locations.push(location);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_SEARCH_RESULTS:
          LocationStore.resetLocations(payload.searchResults);
          LocationStore.resetLatLngObjects(payload.latLngObjects);
          LocationStore.emit(CHANGE_EVENT);
          break;
        case SearchConstants.RECEIVE_SINGLE_LOCATION:
          LocationStore.addLocation(payload.location);
          LocationStore.emit(CHANGE_EVENT);
          break;
        case SearchConstants.RECEIVE_LOCATIONS:
          LocationStore.resetLocations(payload.locations);
          LocationStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
