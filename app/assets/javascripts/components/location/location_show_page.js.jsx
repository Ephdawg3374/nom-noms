var LocationShowPage = React.createClass({
  mixins: [ReactPersistentState, ReactRouter.History],

  componentWillMount: function () {
    this.setPId('location_index');
    this.setPStorage(this.localStorage);
    this.restorePState();

    if (localStorage.location_index) {
      var locations = JSON.parse(localStorage.location_index).locations;
      LocationStore.repopulateStore(locations);
    }

    ApiReviewUtil.fetchReviewsByLocation(this.props.params.location_id);
  },

  componentDidMount: function () {

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
    var num_reviews_text = "Number of Reviews: " + location.num_reviews;

    return (
      <div className="location-show-page">
        <div className="main-header">
          <div className="sub-header">
            <div className="sub-header-info-wrapper group">
              <div className="sub-header-info group">

                <h1>{location.name}</h1>

                <ReviewRatingBar currentRating={location.ave_rating} mode="disabled" />
                <label className="num-reviews-text">{num_reviews_text}</label>

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

        <ReviewForm location={location} />

        <div className="location-show-page-review-section">

          <ReviewIndex />

        </div>

      </div>
    );
  }
});
