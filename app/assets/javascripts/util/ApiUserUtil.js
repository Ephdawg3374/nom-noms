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

  fetchUser: function (userId) {
    $.ajax({
      url: "api/users/" + userId,
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        UserActions.receiveUser(data);
      }
    });
  }
};
