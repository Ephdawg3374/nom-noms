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

    all: function () {
      return _locations.slice();
    },

    allLatLngObjects: function () {
      return _latLngObjects.slice();
    },

    addLocationIndexChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeLocationIndexChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
      this.emit(CHANGE_EVENT);
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
