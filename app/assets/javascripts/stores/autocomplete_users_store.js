(function() {
  var _userMatches = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  UsersAutoCompleteStore = window.UsersAutoCompleteStore = $.extend({}, EventEmitter.prototype, {
    matches: function () {
      return _userMatches.slice();
    },

    resetUserMatches: function (userMatches) {
      _userMatches = userMatches;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case SearchConstants.RECEIVE_AUTOCOMP_USERS:
          UsersAutoCompleteStore.resetUserMatches(payload.users);
          UsersAutoCompleteStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
