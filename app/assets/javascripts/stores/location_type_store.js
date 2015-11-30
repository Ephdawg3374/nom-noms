(function() {
  var _locTypeMatches = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  LocTypeAutoCompleteStore = window.LocTypeAutoCompleteStore = $.extend({}, EventEmitter.prototype, {
    matches: function () {
      return _locTypeMatches.slice();
    },

    resetLocTypeMatches: function (locTypeMatches) {
      _locTypeMatches = locTypeMatches;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_AUTOCOMP_LOC_TYPES:
          LocTypeAutoCompleteStore.resetLocTypeMatches(payload.locTypes);
          LocTypeAutoCompleteStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
