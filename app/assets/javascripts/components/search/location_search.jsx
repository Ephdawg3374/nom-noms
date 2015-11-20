var LocationSearch = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        locType: "",
        locArea: "",
        // default distance radius is 10 miles
        searchDistance: 1609, // meters
        showLocTypeAutoCompleteList: false,
        showLocAreaAutoCompleteList: false
      }
    );
  },

  componentDidMount: function () {
    this.setCurrentLocation();

    LocTypeAutoCompleteStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.forceUpdate();
  },

  // set current locaiton to current city
  setCurrentLocation: function () {
    navigator.geolocation.getCurrentPosition(function(e) {
      var lat = e.coords.latitude;
      var lng = e.coords.longitude;

      this.setAddressStateToCityState(lat, lng);
    }.bind(this));
  },

  setAddressStateToCityState: function (lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();

    var city;

    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        nearestLocation = results[0];

        for (var i = 0; i < nearestLocation.address_components.length; i++) {
          for (var j = 0; j < nearestLocation.address_components[i].types.length; j++) {
            if (nearestLocation.address_components[i].types[j] == "administrative_area_level_1") {
                city = nearestLocation.address_components[i].long_name;
                break;
            }
          }
        }
      }

      this.setState({locArea: city});
    }.bind(this));
  },

  handleSearchSubmit: function (event) {
    event.preventDefault();

    var locationForm = event.currentTarget;

    var search = {
      searchType: locationForm[0].value,
      searchAddress: locationForm[1].value,
      searchDistance: this.state.searchDistance
    };

    ApiLocationUtil.fetchLocations(search);

    this.history.pushState(null, "/search_results/");
  },

  autoCompleteLocationType: function (event) {
    locTypePartial = event.currentTarget.value;

    this.setState(
      {
        locType: locTypePartial,
        showLocTypeAutoCompleteList: true
      }
    );

    ApiLocationUtil.fetchLocationTypes(locTypePartial.toLowerCase());
  },


  autoCompleteLocationArea: function (event) {
    locAreaPartial = event.currentTarget.value;

    this.setState(
      {
        locArea: event.currentTarget.value,
        showLocAreaAutoCompleteList: true
      }
    );
    // ApiLocationUtil.fetchLocationAreas(this.state.locArea);
  },

  selectLocArea: function (event) {
    this.setState(
      {
        locArea: event.currentTarget.innerText,
        showLocAreaAutoCompleteList: false
      }
    );
  },

  selectLocType: function (event) {
    this.setState(
      {
        locType: event.currentTarget.innerText,
        showLocTypeAutoCompleteList: false
      }
    );
  },

  render: function () {
    var locTypeAutoCompleteList, locAreaAutoCompleteList;

    var handleKeyPress = function (e) {
      if (e.which === 13) {
        this.handleSearchSubmit(e);
      }
    };

    if (this.state.showLocTypeAutoCompleteList) {
      locTypeAutoCompleteList = LocTypeAutoCompleteStore.matches().map(function (locTypeMatch, i) {
        return <li key={i} onClick={this.selectLocType} value={locTypeMatch}>{locTypeMatch}</li>;
      }.bind(this));
    }

    if (this.state.showLocAreaAutoCompleteList) {
      locAreaAutoCompleteList = LocAreaAutoCompleteStore.matches().map(function (locAreaMatch, i) {
        return <li key={i} onClick={this.selectLocArea} value={locAreaMatch}>{locAreaMatch}</li>;
      }.bind(this));
    }

    return (
      <div className="location-search group">
        <form onSubmit={ this.handleSearchSubmit } onKeyPress={ handleKeyPress.bind(this) }>

          <div className="location-search-bars-wrapper group">
            <label className="location-search-pseudo">

              <span className="location-pseudo-input-text">Find</span>

              <input className="location-search-input"
                type="text"
                placeholder="Location type (restaurant, bar, etc)"
                onChange={this.autoCompleteLocationType}
                value={this.state.locType}/>

              <ul className="location-type-autocomplete-list">
                { locTypeAutoCompleteList }
              </ul>

            </label>

            <label className="location-search-pseudo">
              <span className="location-pseudo-input-text">Near</span>
              <input className="location-search-input"
                type="text"
                onChange={this.autoCompleteLocationArea}
                value={this.state.locArea}/>
            </label>

            <ul className="location-area-autocomplete">
              { locAreaAutoCompleteList }
            </ul>

          </div>

          <div className="location-search-button">
            <button type="Submit">🔍</button>
          </div>

        </form>
      </div>
    );
  }
});
