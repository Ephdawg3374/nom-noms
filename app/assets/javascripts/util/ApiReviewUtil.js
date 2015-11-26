window.ApiReviewUtil = {
  fetchReviewsByLocation: function (locId) {
    $.ajax({
      url: "/api/reviews",
      method: "GET",
      contentType: "application/json",
      dataType: "json",
      data: { locId: locId },
      success: function (data) {
        ReviewActions.receiveReviews(data);
      }
    });
  },

  fetchReviewsByUser: function (userId) {
    $.ajax({
      url: "/api/reviews",
      method: "GET",
      contentType: "application/json",
      dataType: "json",
      data: { userId: userId },
      success: function (data) {
        ReviewActions.receiveReviews(data);
      }
    });
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
        ReviewActions.receiveSingleReview(data);
        success(data);
      },
      error: function (data) {
        failure(JSON.parse(data.responseText));
      }
    });
  },

  destroy: function (reviewId) {
    $.ajax({
      url: "/api/reviews/" + reviewId,
      method: "DELETE",
      success: function (data) {
        ReviewActions.deleteSingleReview(data);
      }
    });
  }
};
