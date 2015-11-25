window.ApiReviewUtil = {
  fetchReviewsByLocation: function (locId) {

  },

  fetchReviewsByUser: function (userId) {

  },

  create: function (formData, success, failure) {
    $.ajax({
      url: "/api/reviews",
      type: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData,
      success: function (data) {
        success(data);
      },
      failure: function (errMsg) {
        failure(errMsg);
      }
    });
  }
};
