var LocationSearch = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        type: "",
        address: "",
        center: ""
      }
    );
  },

  componentDidMount: function () {
    this.setCurrentLocation();
  },

  setCurrentLocation: function () {
    navigator.geolocation.getCurrentPosition(function(e) {
      var lat = e.coords.latitude;
      var lng = e.coords.longitude;

      this.setState({ center: [lat, lng] });

      this.setAddressStateToCityState(lat, lng);
    }.bind(this));
  },

  setAddressStateToCityState: function (lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();

    var city, state;

    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        nearestLocation = results[0];

        for (var i = 0; i < nearestLocation.address_components.length; i++) {
          for (var j = 0; j < nearestLocation.address_components[i].types.length; j++) {
            if (nearestLocation.address_components[i].types[j] == "administrative_area_level_1") {
                city = nearestLocation.address_components[i].long_name;
                state = nearestLocation.address_components[i].short_name;
                break;
            }
          }
        }
      }
      var cityState = city + ", " + state;

      this.setState({address: cityState});
    }.bind(this));
  },

  handleSearchSubmit: function (event) {
    event.preventDefault();
    
    var locationForm = event.currentTarget;

    var search = {
      locationType: locationForm[0].value,
      locationAddress: locationForm[1].value
    };

    ApiLocationUtil.fetchLocations(search);

    this.history.pushState(null, "/search_results/");
  },

  autoCompleteLocationType: function () {
    ApiLocationUtil.fetchLocationTypes(this.state.type.toLowerCase());
  },

  autoCompleteLocationAddress: function () {
    if (this.state.address.length > 2) {
      ApiLocationUtil.fetchLocationAddresses(this.state.address);
    }
  },

  render: function () {
    var handleKeyPress = function (e) {
      if (e.which === 13) {
        this.handleSearchSubmit(e);
      }
    };

    return (
      <div className="location-search">
        <form onSubmit={ this.handleSearchSubmit }
          onKeyPress={ handleKeyPress.bind(this) }>
          <label className="location-search-pseudo">
            <span className="pseudo-input-text-type">Find</span>
            <input className="location-search-input"
              type="text"
              valueLink={this.linkState("type")}
              placeholder="  Location type (restaurant, bar, etc)"
            />
          </label>

          <label className="location-search-pseudo">
            <span className="pseudo-input-text-address">In</span>
            <input className="location-search-input"
                type="text"
                valueLink={this.linkState("address")}
              />
          </label>

          <button type="Submit"
            className="location-search-button">
            <img src={window.NomNomsApp.images.buttonImage}/>
          </button>
        </form>
      </div>
    );
  }
});
