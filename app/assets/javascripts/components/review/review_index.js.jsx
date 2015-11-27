var ReviewIndex = React.createClass({
  mixins: [ReactPersistentState],

  componentWillMount: function () {
    this.setPId('review_index');
    this.setPStorage(this.localStorage);
    this.restorePState();

    if (localStorage.review_index) {
      var reviews = JSON.parse(localStorage.review_index).reviews;
      ReviewActions.receiveReviews(reviews);
    }

    ReviewStore.all().forEach(function (review) {
      ApiImageUtil.fetchReviewImages(review.id);
    });
  },

  render: function () {
    var ReviewIndexItems = this.props.reviews.map(function (review, idx) {
      return <ReviewIndexItem key={idx} review={review} />;
      });

    return (
      <ul className="review-index">
        { ReviewIndexItems }
      </ul>
    );
  }
});
