(function() {
  var CHANGE_EVENT = "CHANGE_EVENT";

  window.ImageStore = window.ImageStore || $.extend({}, EventEmitter.prototype, {
    addImageToReview: function (image) {
      ReviewStore.all().forEach(function (review) {
        // if (review.images) {
        //   review.images.push(image);
        // } else {
        //   review.images = [image];
        // }
        review.images.push(image);
      });
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
      }
    })
  });
}());
