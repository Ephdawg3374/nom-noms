window.ApiUserUtil = {
  create: function (user, callback) {
    $.ajax({
      url: "/api/users",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({user: user}),
      success: function (data) {
        callback && callback();
      }
    });
  }
};
