var success = function () {
  this.setState({ fetchReviewsComplete: true });
};

var ReviewIndex = React.createClass({
  mixins: [ReactPersistentState],

  getInitialState: function () {
    return ({ reviews: ReviewStore.all(), fetchReviewsComplete: false });
  },

  // shouldComponentUpdate: function (nextProps, nextState) {
  //   return nextProps.user.id !== this.props.user.id;
  // },
  //
  // componentWillUpdate: function () {
  //   this.checkPropsAndFetch();
  // },

  componentWillReceiveProps: function (nextProps) {
    this.checkPropsAndFetch(nextProps.user.id);
  },

  componentDidMount: function () {
    this.checkPropsAndFetch();

    LocationStore.addChangeListener(this._onLocationUpdate);
    ReviewStore.addChangeListener(this._onChange);
  },

  checkPropsAndFetch: function (newUserId) {
    if (this.props.user) {
      var userId = newUserId || this.props.user.id;
      ApiReviewUtil.fetchReviewsByUser(userId, success.bind(this));
      ApiLocationUtil.fetchReviewedLocationsByUser(userId);
    } else if (this.props.location) {
      ApiReviewUtil.fetchReviewsByLocation(this.props.location.id, success.bind(this));
    }
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
  },

  render: function () {
    var reviewIndexItems;

    if (this.state.fetchReviewsComplete) {
      if (this.props.location) {
        reviewIndexItems = this.state.reviews.map(function (review, idx) {
          return <ReviewIndexItem key={idx} isLoggedIn={this.props.isLoggedIn} review={review} location={this.props.location}/>;
        }.bind(this));
      } else if (this.props.user) {
        reviewIndexItems = this.state.reviews.map(function (review, idx) {
          var location = LocationStore.find_location(review.location_id);

          if (Object.keys(location).length !== 0) {
            return <ReviewIndexItem key={idx} isLoggedIn={this.props.isLoggedIn} review={review}  location={location} user/>;
          }
        }.bind(this));
      }
    }

    return (
      <ul className="review-index">
        { reviewIndexItems }
      </ul>
    );
  }
});
