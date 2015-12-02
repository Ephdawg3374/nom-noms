window.ApiReviewUtil = {
  fetchReviewsByLocation: function (locId, success) {
    $.ajax({
      url: "/api/reviews",
      method: "GET",
      contentType: "application/json",
      dataType: "json",
      data: { locId: locId },
      success: function (data) {
        ReviewActions.receiveReviews(data);
        success && success();
      }
    });
  },

  fetchReviewsByUser: function (userId, success) {
    $.ajax({
      url: "/api/reviews",
      method: "GET",
      contentType: "application/json",
      dataType: "json",
      data: { userId: userId },
      success: function (data) {
        ReviewActions.receiveReviews(data);
        success && success();
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
        ApiLocationUtil.fetchSingleLocation(data.location_id);
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
