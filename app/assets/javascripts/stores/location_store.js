(function() {
  var _locations = [];
  var _latLngObjects = [];
  var LOCATION_INDEX_CHANGE = "LOCATION_INDEX_CHANGE";

  window.LocationStore = window.LocationStore || $.extend({}, EventEmitter.prototype, {
    resetLocations: function (searchResults) {
      _locations = searchResults;
    },

    resetLatLngObjects: function (latLngObjects) {
      _latLngObjects = latLngObjects;
    },

    all: function () {
      return _locations.slice();
    },

    allLatLngObjects: function () {
      return _latLngObjects.slice();
    },

    addLocationIndexChangeListener: function (callback) {
      this.on(LOCATION_INDEX_CHANGE, callback);
    },

    removeLocationIndexChangeListener: function (callback) {
      this.removeListener(LOCATION_INDEX_CHANGE, callback);
    },

    emitChange: function () {
      this.emit(LOCATION_INDEX_CHANGE);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_SEARCH_RESULTS:
          LocationStore.resetLocations(payload.searchResults);
          LocationStore.resetLatLngObjects(payload.latLngObjects);
          LocationStore.emitChange();
          break;
      }
    })
  });
}());
