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

    return (
      <div className="location-show-page">
        <div className="main-header">

          <div className="sub-header">
            <div className="sub-header-info">

              <h1>{location.name}</h1>

              <span className="sub-header-info-price-range">
                {location.price_range}
              </span>

              <span className="sub-header-info-type">
                {location.location_type}
              </span>

              <span className="sub-header-info-cuisine">
                {location.cuisine}
              </span>

            </div>

            <div className="sub-header-options">
              <button
                className="sub-header-options-review-button"
                onClick={this.goToReviewFormPage} >
                Write a Review
              </button>
            </div>
          </div>

          <div className="sub-header-banner">
            <Map location={location} mode="locationShowPage"/>
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
