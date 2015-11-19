(function() {
  var _locations = [];
  var LOCATION_INDEX_CHANGE = "LOCATION_INDEX_CHANGE";

  window.LocationStore = $.extend({}, EventEmitter.prototype, {
    resetStore: function (searchResults) {
      _locations = searchResults;
    },

    all: function () {
      return _locations.slice();
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
          LocationStore.resetStore(payload.searchResults);
          LocationStore.emitChange();
          break;
      }
    })
  });
}());
