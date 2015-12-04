(function() {
  var CHANGE_EVENT = "CHANGE_EVENT";

  window.ImageStore = window.ImageStore || $.extend({}, EventEmitter.prototype, {
    addImageToReview: function (image) {
      ReviewStore.appendImage(image);
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case ImageConstants.RECEIVE_IMAGE:
          ImageStore.addImageToReview(payload.image);
          ImageStore.emit(CHANGE_EVENT);
          break;
        case ImageConstants.RECEIVE_REVIEW_IMAGES:
          AppDispatcher.waitFor([ReviewStore.dispatcherId]);
          if (payload.images.length > 0) {
            ReviewStore.resetImages(payload.images[0].review_id);
          }
          payload.images.forEach(function (image) {
            ImageStore.addImageToReview(image);
          });
          ImageStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
