var SearchIndexItem = React.createClass({
  getInitialState: function () {
    return ({ hover: false });
  },

  mouseOverHeader: function () {
    this.setState({ hover: true });
  },

  mouseOutHeader: function () {
    this.setState({ hover: false });
  },

  render: function () {

    if (this.props.marker) {
      if (this.state.hover === true) {
        this.props.marker.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        this.props.marker.setAnimation(null);
      }
    }

    var location = this.props.location;
    var num_reviews_text = location.num_reviews + " reviews";

    return (
      <div className="search-index-item">

        <Link to={"/locations/"+location.id} className="search-index-item-img">
          <img src={location.img_url}/>
        </Link>

        <h2 className="search-index-item-name"
          onMouseOver={this.mouseOverHeader}
          onMouseOut={this.mouseOutHeader}>

          <Link to={'/locations/' + location.id} params={ location }>
            {location.name}
          </Link>
        </h2>

        <ReviewRatingBar mode="disabled" currentRating={location.ave_rating}/>

        <label className="search-index-item-number-of-ratings">{num_reviews_text}</label>

        <label className="search-index-item-website">
          <a>{location.website}</a>
        </label>

        <label>{location.description}</label>

        <LocationContactDetails location={location}/>
      </div>
    );
  }
});
