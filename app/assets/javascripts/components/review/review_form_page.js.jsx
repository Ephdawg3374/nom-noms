var ReviewFormPage = React.createClass({
  componentWillMount: function () {
    if (localStorage.location_index) {
      var locations = JSON.parse(localStorage.location_index).locations;
      LocationStore.repopulateStore(locations);
    }
  },

  render: function () {
    var location = LocationStore.find_location(parseInt(this.props.params.location_id));

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
          </div>

          <LocationContactDetails location={location} />
        </div>

      </div>
    );
  }
});
