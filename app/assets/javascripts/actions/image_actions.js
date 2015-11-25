var ImageActions = {
  receiveImage: function (image) {
    AppDispatcher.dispatch({
      actionType: ImageConstants.RECEIVE_IMAGE,
      image: image
    });
  }
};
