(function() {
  var _locAreaMatches = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  LocAreaAutoCompleteStore = window.LocAreaAutoCompleteStore = $.extend({}, EventEmitter.prototype, {
    matches: function () {
      return _locAreaMatches.slice();
    },

    resetLocAreaMatches: function (locAreaMatches) {
      _locAreaMatches = locAreaMatches;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_AUTOCOMP_LOC_AREAS:
          LocAreaAutoCompleteStore.resetLocAreaMatches(payload.locAreas);
          LocAreaAutoCompleteStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
