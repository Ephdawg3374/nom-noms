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
    var reviewIndexItems;

    if (this.props.location) {
      reviewIndexItems = this.state.reviews.map(function (review, idx) {
        return <ReviewIndexItem key={idx} isLoggedIn={this.props.isLoggedIn} review={review} location={this.props.location}/>;
      }.bind(this));
    } else if (this.props.user) {
      reviewIndexItems = this.state.reviews.map(function (review, idx) {
        var location = LocationStore.find_location(review.location_id);

        if (Object.keys(location).length !== 0) {
          return <ReviewIndexItem key={idx} isLoggedIn={this.props.isLoggedIn} review={review}  location={location}/>;
        }
      }.bind(this));
    }

    return (
      <ul className="review-index">
        { reviewIndexItems }
      </ul>
    );
  }
});
