var LocationShowPage = React.createClass({
  mixins: [ReactPersistentState, ReactRouter.History],

  getInitialState: function () {
    return ({ reviews: ReviewStore.all() });
  },

  componentWillMount: function () {
    this.setPId('search_index');
    this.setPStorage(this.localStorage);
    this.restorePState();

    if (localStorage.search_index) {
      var locations = JSON.parse(localStorage.search_index).locations;
      LocationStore.repopulateStore(locations);
    } else {
      ApiReviewUtil.fetchSingleLocation(this.props.params.location_id);
    }

    ApiReviewUtil.fetchReviewsByLocation(this.props.params.location_id);
  },

  componentDidMount: function () {
    ReviewStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ReviewStore.removeChangeListener(this._onChange);
  },

  _onUserChange: function () {
    this.forceUpdate();
  },

  _onChange: function () {
    this.setState({ reviews: ReviewStore.all() });
    this.setPState({ reviews: ReviewStore.all() });
  },

  goToReviewFormPage: function (event) {
    event.preventDefault();

    if (!CurrentUserStore.isLoggedIn()) {
      this.history.pushState(null, "/session/new");
    } else {
      var location = { locationId: this.props.params.location_id };
      this.history.pushState(null, "/locations/" + location.locationId + "/reviews/new", location);
    }
  },

  render: function () {
    var location = LocationStore.find_location(parseInt(this.props.params.location_id));
    var numReviewsText = "Number of Reviews: " + location.num_reviews;
    var reviewForm;
    var reviews = this.state.reviews;

    return (
      <div className="location-show-page">
        <div className="main-header">
          <div className="sub-header">
            <div className="sub-header-info-wrapper group">
              <div className="sub-header-info group">

                <h1>{location.name}</h1>

                <ReviewRatingBar currentRating={location.ave_rating} mode="disabled" />
                <label className="num-reviews-text">{numReviewsText}</label>

              </div>

              <div className="sub-header-options">
                <button
                  className="sub-header-options-review-button"
                  onClick={this.goToReviewFormPage} >
                  Write a Review
                </button>
              </div>
            </div>

            <div className="sub-header-banner group">
              <div className="sub-header-banner-left-section">
                <Map location={location} mode="locationShowPage"/>
                <a href="#">{location.website}</a>
                <label>{location.description}</label>
                <LocationContactDetails location={location} />
              </div>

              <figure className="sub-header-banner-cover-photo">
                <img src={location.img_url}/>
              </figure>
            </div>
          </div>

        </div>

        <div className="location-show-page-review-wrapper">
          <ReviewForm location={location} />
        </div>

        <div className="location-show-page-review-section">

          <ReviewIndex reviews={reviews}/>

        </div>

      </div>
    );
  }
});
