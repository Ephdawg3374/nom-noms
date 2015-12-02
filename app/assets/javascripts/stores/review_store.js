(function() {
  var _reviews = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  window.ReviewStore = window.ReviewStore || $.extend({}, EventEmitter.prototype, {
    resetReviews: function (reviews) {
      _reviews = reviews;
    },

    resetImages: function (reviewId) {
      var review = this.findReview(reviewId);

      if (review) {
        review.images = [];
      }
    },

    appendImage: function (image) {
      var review = this.findReview(image.review_id);

      if (review) {
        review.images.push(image);
      }
      
      this.emit(CHANGE_EVENT);
    },

    addReview: function (review) {
      var idx = _reviews.indexOf(review);

      if (idx === -1) {
        _reviews.unshift(review);
      } else {
        _review[idx] = review;
      }
    },

    _deleteReview: function (review) {
      var idx = _reviews.indexOf(this.findReview(review.id));

      if (idx !== -1) {
        _reviews.splice(idx, 1);
      }
    },

    findReview: function (reviewId) {
      var review;

      for (var i = 0; i < _reviews.length; i++) {
        if (_reviews[i].id === reviewId) {
          review = _reviews[i];
        }
      }
      return review;

      // var review = {};
      //
      // for (i = 0; i < _reviews.length; i++) {
      //   if (_reviews[i].id === id) {
      //     review = _reviews[i];
      //     break;
      //   }
      // }
      //
      // return review;
    },

    all: function () {
      return _reviews.slice();
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case ReviewConstants.RECEIVE_REVIEWS:
          ReviewStore.resetReviews(payload.reviews);
          ReviewStore.emit(CHANGE_EVENT);
          break;
        case ReviewConstants.RECEIVE_SINGLE_REVIEW:
          ReviewStore.addReview(payload.review);
          ReviewStore.emit(CHANGE_EVENT);
          break;
        case ReviewConstants.DELETE_SINGLE_REVIEW:
          ReviewStore._deleteReview(payload.review);
          ReviewStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}());
