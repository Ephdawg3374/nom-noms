var ImageActions = {
  receiveImage: function (image) {
    AppDispatcher.dispatch({
      actionType: ImageConstants.RECEIVE_IMAGE,
      image: image
    });
  },

  receiveReviewImages: function (images) {
    AppDispatcher.dispatch({
      actionType: ImageConstants.RECEIVE_REVIEW_IMAGES,
      images: images
    });
  }
};
