var ReviewFormPage = React.createClass({
  mixins: [ReactRouter.History],

  componentWillMount: function () {
    ApiLocationUtil.fetchSingleLocation(this.props.params.location_id);
  },

  componentDidMount: function () {
    LocationStore.addChangeListener(this._onLocationUpdate);
    CurrentUserStore.addChangeListener(this._ensureLoggedIn);
  },

  componentWillUnmount: function () {
    LocationStore.removeChangeListener(this._onLocationUpdate);
    CurrentUserStore.removeChangeListener(this._ensureLoggedIn);
  },

  _ensureLoggedIn: function () {
    if (!CurrentUserStore.isLoggedIn()) {
      this.history.goBack();
    }
  },

  _onLocationUpdate: function () {
    this.forceUpdate();
  },

  render: function () {
    var location = LocationStore.find_location(parseInt(this.props.params.location_id));
    var num_reviews_text = location.num_reviews + " reviews";
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
