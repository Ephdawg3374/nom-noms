(function() {
  var _locAreaMatches = [];
  var LOC_AREAS_CHANGED = "LOC_AREAS_CHANGED";

  LocAreaAutoCompleteStore = window.LocAreaAutoCompleteStore = $.extend({}, EventEmitter.prototype, {
    matches: function () {
      return _locAreaMatches.slice();
    },

    resetLocAreaMatches: function (locAreaMatches) {
      _locAreaMatches = locAreaMatches;
    },

    addChangeListener: function (callback) {
      this.on(LOC_AREAS_CHANGED, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(LOC_AREAS_CHANGED, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionArea) {
        case SearchConstants.RECEIVE_AUTOCOMP_LOC_AREAS:
          LocAreaAutoCompleteStore.resetLocAreaMatches(payload.locAreas);
          LocAreaAutoCompleteStore.emit(LOC_AREAS_CHANGED);
          break;
      }
    })
  });
}());
