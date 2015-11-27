(function () {
  var _users = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  UsersStore = window.UserStore = $.extend({}, EventEmitter.prototype, {
    _addUser: function (newUser) {
      if (_users.indexOf(newUser) !== -1) {
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

      for (i = 0; i < _locations.length; i++) {
        if (_locations[i].id === id) {
          user = _users[i];
          break;
        }
      }

      return user;
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
