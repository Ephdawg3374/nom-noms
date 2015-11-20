(function () {
  var _currentUsers = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _addUser = function (newUser) {
    _users.push(newUser);
  };

  UserStore = window.UserStore = $.extend({}, EventEmitter.prototype, {

    addChangeHandler: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeHandler: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    all: function () {
      return _currentUsers.slice();
    },

    findUserById: function (userId) {
      for (var i = 0; i < _users.length; i++) {
        if (_users[i].id === userId) {
          return _users[i];
        }
      }

      return;
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case UserConstants.RECEIVE_USERS:
          _users = payload.users;
          UsersStore.emit(CHANGE_EVENT);
          break;
        case UserConstants.RECEIVE_USER:
          _addUser(payload.user);
          UsersStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
