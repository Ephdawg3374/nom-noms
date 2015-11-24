var LocationContactDetails = React.createClass({
  render: function () {
    return (
        <div className="location-details-wrapper group">

          <div className="location-details">
            <h3>{this.props.location.location_type}</h3>
            <h3>{this.props.location.cuisine}</h3>

            <label>{this.props.location.price_range}</label>
          </div>

          <div className="location-contact-details">
            <label>{this.props.location.street_address}</label>

            <label>{this.props.location.city}, {this.props.location.state}</label>

            <label>{this.props.location.zipcode}</label>

            <label>{this.props.location.phone_number}</label>

          </div>

        </div>
    );
  }
});
