window.ApiReviewUtil = {
  fetchReviewsByLocation: function (locId) {

  },

  fetchReviewsByUser: function (userId) {

  },

  create: function (formData, success, failure) {
    $.ajax({
      url: "/api/reviews",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData,
      success: function (data) {
        UserActions.receiveUser(data);
        success();
      },
      failure: function (err_msg) {
        failure(err_msg);
      }
    });
  }
};
