var SearchIndexItem = React.createClass({
  getInitialState: function () {
    return ({ hover: false });
  },

  mouseOver: function () {
    this.setState({ hover: true });
  },

  mouseOut: function () {
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

    return (
      <div className="search-index-item group">

        <figure className="search-index-item-img">
          <img src={this.props.location.img_url}/>
        </figure>

        <h2 className="search-index-item-name"
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}>

          <Link to={'/locations/' + this.props.location.id}>
            {this.props.location.name}
          </Link>

        </h2>

        <label className="search-index-item-website">
          <a href="#">
            {this.props.location.website}
          </a>
        </label>

        <label className="search-index-item-description">
          {this.props.location.description}
        </label>

        <div className="search-index-item-details-wrapper group">
          <div className="search-index-item-details">
            <h3>{this.props.location.location_type}</h3>
            <h3>{this.props.location.cuisine}</h3>

            <label className="search-index-item-price-range">
              {this.props.location.price_range}
            </label>
          </div>

          <div className="search-index-item-contact-details">
            <label className="search-index-item-address">
              {this.props.location.street_address}
            </label>

            <label className="search-index-item-address">
              {this.props.location.city}, {this.props.location.state} {this.props.location.zipcode}
            </label>

            <label className="search-index-item-phone">
              {this.props.location.phone_number}
            </label>
          </div>
        </div>
      </div>
    );
  }
});
