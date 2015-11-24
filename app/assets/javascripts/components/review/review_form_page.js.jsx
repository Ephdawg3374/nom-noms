var ReviewFormPage = React.createClass({
  componentWillMount: function () {
    if (localStorage.location_index) {
      var locations = JSON.parse(localStorage.location_index).locations;
      LocationStore.repopulateStore(locations);
    }
  },

  render: function () {
    var location = LocationStore.find_location(this.props.params.location_id);

    return (
      <div className="review-form-page">

        <div className="review-form-page-header">
          <h2>Write a Review</h2>

          <div className="header-loc-details">

            <figure className="header-loc-details-figure">
              <img src={location.img_url}/>
            </figure>

            <h2>{location.name}</h2>

          </div>
        </div>


      </div>
    );
  }
});
