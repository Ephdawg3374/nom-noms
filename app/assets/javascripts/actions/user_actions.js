var UserActions = {
  receiveUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USERS,
      users: users
    });
  },

  receiveSingleUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_SINGLE_USER,
      user: user
    });
  }
};
