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

    sortReviews: function (newMode) {
      switch (newMode) {
        case "Rating":
          this.sortReviewsByRating();
          this.emit(CHANGE_EVENT);
          break;
        case "Time":
          this.sortReviewsByTime();
          this.emit(CHANGE_EVENT);
          break;
        default:
          this.sortReviewsByTime();
          this.emit(CHANGE_EVENT);
          break;
      }
    },

    sortReviewsByRating: function () {
      var sortable = [];

      for (var idx in _reviews) {
        sortable.push([_reviews[idx], _reviews[idx].rating]);
      }

      sortable.sort(function(b, a) {
        return a[1] - b[1];
      });

      var sortedReviews = sortable.map(function(review) {
        return review[0];
      });

      _reviews = sortedReviews;
    },

    sortReviewsByTime: function () {
      var sortable = [];

      for (var idx in _reviews) {
        sortable.push([_reviews[idx], _reviews[idx].time_i]);
      }

      sortable.sort(function(b, a) {
        return a[1] - b[1];
      });

      var sortedReviews = sortable.map(function(review) {
        return review[0];
      });

      _reviews = sortedReviews;
    },

    appendImage: function (image) {
      var review = this.findReview(image.review_id);

      if (review) {
        review.images.push(image);
      }

      this.emit(CHANGE_EVENT);
    },

    addReview: function (review) {
      for (var i = 0; i < _reviews.length; i++) {
        if (_reviews[i].id === review.id) {
          _reviews[i] = review;
          return;
        }
      }

      _reviews.unshift(review);
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
