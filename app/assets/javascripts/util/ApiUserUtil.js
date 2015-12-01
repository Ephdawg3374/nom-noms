window.ApiUserUtil = {
  create: function (formData, success, failure) {
    $.ajax({
      url: "/api/users",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData,
      success: function (data) {
        CurrentUserActions.receiveCurrentUser(data);
        success();
      },
      error: function (data) {
        failure(JSON.parse(data.responseText));
      }
    });
  },

  fetchUser: function (userId, success) {
    $.ajax({
      url: "api/users/" + userId,
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        UserActions.receiveSingleUser(data);
        success && success(data);
      }
    });
  },

  fetchUsersAutoComplete: function (userSearch) {
    $.ajax({
      url: "api/users/",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: { userSearchAutoComplete: userSearch },
      success: function (data) {
        SearchActions.receiveUsers(data);
      }
    });
  },

  fetchUsers: function (userSearch) {
    $.ajax({
      url: "api/users/",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: { userSearch: userSearch },
      success: function (data) {
        UserActions.receiveUsers(data);
      }
    });
  },

  fetchUserByUsername: function (username, success, failure) {
    $.ajax({
      url: "api/usernames/" + username,
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        UserActions.receiveSingleUser(data);
        success && success(data);
      },
      error: function (data) {
        failure && failure(data.responseText);
      }
    });
  },
};
