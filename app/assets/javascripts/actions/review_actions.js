var ReviewActions = {
  receiveReviews: function (reviews) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.RECEIVE_REVIEWS,
      reviews: reviews
    });
  },

  receiveSingleReview: function (review) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.RECEIVE_SINGLE_REVIEW,
      review: review
    });
  },

  deleteSingleReview: function (review) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.DELETE_SINGLE_REVIEW,
      review: review
    });
  }
};
