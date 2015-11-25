(function() {
  var _reviews = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  window.ReviewStore = window.ReviewStore || $.extend({}, EventEmitter.prototype, {
    resetReviews: function (reviews) {
      _reviews = reviews;
    },

    addReview: function (review) {
      debugger;
      var idx = _reviews.indexOf(review);

      if (idx === -1) {
        _reviews.push(review);
      } else {
        _review[idx] = review;
      }
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
      }
    })
  });
}());
