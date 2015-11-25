var ReviewIndex = React.createClass({
  mixins: [ReactPersistentState],

  getInitialState: function () {
    return ({ reviews: ReviewStore.all() });
  },

  componentWillMount: function () {
    this.setPId('review_index');
    this.setPStorage(this.localStorage);
    this.restorePState();

    if (localStorage.review_index) {
      var reviews = JSON.parse(localStorage.review_index).reviews;
      ReviewActions.receiveReviews(reviews);
    }
  },

  componentDidMount: function () {
    ReviewStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ReviewStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ reviews: ReviewStore.all() });
    this.setPState({ reviews: ReviewStore.all() });
  },

  render: function () {
    var ReviewIndexItems = this.state.reviews.map(function (review, idx) {
      return <ReviewIndexItem key={idx} review={review} />;
      });

    return (
      <ul className="review-index">
        { ReviewIndexItems }
      </ul>
    );
  }
});
