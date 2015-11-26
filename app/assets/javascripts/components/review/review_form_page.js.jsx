var ReviewFormPage = React.createClass({
  mixins: [ReactRouter.History],

  componentWillMount: function () {
    if (localStorage.location_index) {
      var locations = JSON.parse(localStorage.location_index).locations;
      LocationStore.repopulateStore(locations);
    }
  },

  componentDidMount: function () {
    CurrentUserStore.addChangeListener(this._ensureLoggedIn);
  },

  componentWillUnmount: function () {
    CurrentUserStore.removeChangeListener(this._ensureLoggedIn);
  },

  _ensureLoggedIn: function () {
    if (!CurrentUserStore.isLoggedIn()) {
      this.history.pushState(null, "/session/new");
    }
  },

  render: function () {
    var location = LocationStore.find_location(parseInt(this.props.params.location_id));
    var num_reviews_text = "Number of reviews: " + location.num_reviews;
    return (
      <div className="review-form-page">

        <div className="review-form-page-header group">
          <h2>Write a Review</h2>

          <figure className="header-details-figure">
            <img src={location.img_url}/>
          </figure>

          <div className="header-details-wrapper group">
            <h2 className="header-details-name">
              <Link to={'/locations/' + location.id}>
                {location.name}
              </Link>
            </h2>

            <label className="header-details-website">
              <a>{location.website}</a>
            </label>

            <label className="header-details-description">
              {location.description}
            </label>

            <ReviewRatingBar mode="disabled" />

            <label className="header-details-num-reviews">
              {num_reviews_text}
            </label>
          </div>

          <LocationContactDetails location={location} />
        </div>

        <ReviewForm location={location}/>

      </div>
    );
  }
});
