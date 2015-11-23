window.ApiUserUtil = {
  create: function (formData, callback) {
    $.ajax({
      url: "/api/users",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData,
      success: function (data) {
        UserActions.receiveUser(data);
        CurrentUserActions.receiveCurrentUser(data);
        callback && callback();
      }
    });
  }
};
