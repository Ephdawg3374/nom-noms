(function () {
  var _users = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  UsersStore = window.UsersStore = $.extend({}, EventEmitter.prototype, {
    _resetUsers: function (users) {
      _users = users;
    },

    _addUser: function (newUser) {
      if (_users.indexOf(newUser) === -1) {
        _users.push(newUser);
      }
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    all: function () {
      return _users.slice();
    },

    findUser: function (id) {
      var user;

      for (i = 0; i < _users.length; i++) {
        if (_users[i].id === id) {
          user = _users[i];
          break;
        }
      }

      return user;
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case UserConstants.RECEIVE_USERS:
          UsersStore._resetUsers = payload.users;
          UsersStore.emit(CHANGE_EVENT);
          break;
        case UserConstants.RECEIVE_USER:
          UsersStore._addUser(payload.user);
          UsersStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
