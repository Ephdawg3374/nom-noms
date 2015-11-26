window.ApiImageUtil = {
  create: function (formData) {
    $.ajax({
      url: "/api/images",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData,
      success: function (data) {
        ImageActions.receiveImage(data);
      }
    });
  },

  fetchReviewImages: function (reviewId) {
    $.ajax({
      url: "api/images",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {reviewId: reviewId},
      success: function (data) {
        ImageActions.receiveReviewImages(data);
      }
    });
  },
};
