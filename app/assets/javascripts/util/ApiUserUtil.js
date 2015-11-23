window.ApiUserUtil = {
  create: function (user, callback) {
    $.ajax({
      url: "/api/users",
      method: "POST",
      processData: false,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({ user: user }),
      success: function (data) {
        UserActions.receiveUser(data);
        CurrentUserActions.receiveCurrentUser(data);
        callback && callback();
      }
    });
  }
};
