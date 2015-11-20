(function() {
  var _locTypeMatches = [];
  var LOC_TYPES_CHANGED = "LOC_TYPES_CHANGED";

  LocTypeAutoCompleteStore = window.LocTypeAutoCompleteStore = $.extend({}, EventEmitter.prototype, {
    matches: function () {
      return _locTypeMatches.slice();
    },

    resetLocTypeMatches: function (locTypeMatches) {
      _locTypeMatches = locTypeMatches;
    },

    addChangeListener: function (callback) {
      this.on(LOC_TYPES_CHANGED, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(LOC_TYPES_CHANGED, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_AUTOCOMP_LOC_TYPES:
          LocTypeAutoCompleteStore.resetLocTypeMatches(payload.locTypes);
          LocTypeAutoCompleteStore.emit(LOC_TYPES_CHANGED);
          break;
      }
    })
  });
}());
