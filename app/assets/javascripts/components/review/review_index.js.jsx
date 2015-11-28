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
    if (this.props.user) {
      ApiReviewUtil.fetchReviewsByUser(this.props.user.id);
      ApiLocationUtil.fetchReviewedLocationsByUser(this.props.user.id);
    } else if (this.props.location) {
      ApiReviewUtil.fetchReviewsByLocation(this.props.location.id);
    }

    ReviewStore.all().forEach(function (review) {
      ApiImageUtil.fetchReviewImages(review.id);
    });

    LocationStore.addChangeListener(this._onLocationUpdate);
    ReviewStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    LocationStore.removeChangeListener(this._onLocationUpdate);
    ReviewStore.removeChangeListener(this._onChange);
  },

  _onLocationUpdate: function () {
    this.forceUpdate();
  },

  _onChange: function () {
    this.setState({ reviews: ReviewStore.all() });
    this.setPState({ reviews: ReviewStore.all() });
  },

  render: function () {
    var ReviewIndexItems;

    if (this.props.location) {
      ReviewIndexItems = this.state.reviews.map(function (review, idx) {
        return <ReviewIndexItem key={idx} review={review} />;
        });
    } else if (this.props.user) {
      ReviewIndexItems = this.state.reviews.map(function (review, idx) {
        var location = LocationStore.find_location(review.location_id);

        return <ReviewIndexItem key={idx} review={review} location={location}/>;
        });
    }

    return (
      <ul className="review-index">
        { ReviewIndexItems }
      </ul>
    );
  }
});
