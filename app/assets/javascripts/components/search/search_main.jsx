var SearchMain = React.createClass({
  mixins: [ReactPersistentState, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        locType: "",
        locArea: "",
        // default distance radius is 10 miles
        distanceRange: "1", // miles
        priceRange: "All",
        showLocTypeAutoCompleteList: false,
        showLocAreaAutoCompleteList: false
      }
    );
  },

  componentDidMount: function () {
    this.setPId('location_search_params');
    this.setPStorage(this.localStorage);
    this.restorePState();

    this.intervalId = setTimeout(function () {
      this.setPState({
        locType: "",
        locArea: this.state.locArea,
        distanceRange: this.state.distanceRange,
        priceRange: this.state.priceRange,
        showLocTypeAutoCompleteList: this.state.showLocTypeAutoCompleteList,
        showLocAreaAutoCompleteList: this.state.showLocAreaAutoCompleteList
      });
    }.bind(this), 0);

    this.setCurrentLocation();

    LocTypeAutoCompleteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalId);

    LocTypeAutoCompleteStore.removeChangeListener(this._onChange);
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

  buildSearchObject: function (searchType, searchArea) {
    var search = {
      searchType: searchType || this.state.locType,
      searchArea: searchArea || this.state.locArea,
      distanceRange: this.state.distanceRange,
      priceRange: this.state.priceRange
    };

    return search;
  },

  handleSearchSubmit: function (event) {
    event.preventDefault();

    var locationForm = event.currentTarget;
    var searchType = this.state.locType;
    var searchArea = this.state.locArea;

    var search = this.buildSearchObject(searchType, searchArea);

    ApiLocationUtil.fetchLocations(search, function () {
      this.setState(
        {
          showLocTypeAutoCompleteList: false,
          showLocAreaAutoCompleteList: false
        }
      );
    }.bind(this));

    this.history.pushState(null, "/search/?type=" + searchType + "?area=" + searchArea +
                          "?price-range=" + this.state.priceRange + "?distance=" + this.state.distanceRange);
  },

  autoCompleteLocationType: function (event) {
    locTypePartial = event.currentTarget.value;

    this.setState(
      {
        locType: locTypePartial,
        showLocTypeAutoCompleteList: true
      }
    );

    ApiLocationUtil.fetchLocationTypes(locTypePartial);
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
    var locArea = event.currentTarget.innerText;

    this.setState(
      {
        locArea: locArea,
        showLocAreaAutoCompleteList: false
      }
    );
  },

  selectLocType: function (event) {
    var locType = event.currentTarget.innerText;

    this.setState(
      {
        locType: locType,
        showLocTypeAutoCompleteList: false
      }
    );
  },

  setPriceRangeFilter: function (event) {
    event.preventDefault();

    if (LocationStore.all().length > 0) {
      var search = this.buildSearchObject();
      search.priceRange = event.currentTarget.value;
      ApiLocationUtil.fetchLocations(search);
    }

    this.setState({ priceRange: event.currentTarget.value });
  },

  setDistanceRangeFilter: function (event) {
    event.preventDefault();

    if (LocationStore.all().length > 0) {
      var search = this.buildSearchObject();
      search.distanceRange = event.currentTarget.value;
      ApiLocationUtil.fetchLocations(search);
    }

    this.setState({ distanceRange: event.currentTarget.value });
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

    var priceRangeButtons = priceRangeMapping.map(function (priceRange, idx) {
      var klass = this.state.priceRange === priceRange[idx] ? "active" : "";

      return <PriceRangeButton
        key={idx}
        val={priceRange[idx]}
        klass={"price-range-button " + klass}
        setPriceRangeFilter={this.setPriceRangeFilter} />;
    }.bind(this));

    var distanceRangeButtons = distanceRangeMapping.map(function (distanceRange, idx) {
      var klass = this.state.distanceRange === distanceRange[idx][1] ? "active" : "";

      return <DistanceRangeButton
        key={idx}
        val={distanceRange[idx][1]}
        label={distanceRange[idx][2]}
        klass={"distance-range-button " + klass}
        setDistanceRangeFilter={this.setDistanceRangeFilter} />;
    }.bind(this));

    return (
      <div className="location-search group">
        <form className="group" onSubmit={ this.handleSearchSubmit } onKeyPress={ handleKeyPress.bind(this) }>
          <div className="location-search-filter-wrapper group">
            <div className="location-search-bars-wrapper group">
              <label className="location-search-pseudo">

                <span className="location-pseudo-input-text">Find</span>

                <input className="location-type-search-input"
                  type="text"
                  value={this.state.locType}
                  placeholder="Location type (restaurant, bar, etc)"
                  onChange={this.autoCompleteLocationType}/>

                <ul className="location-type-autocomplete-list">
                  { locTypeAutoCompleteList }
                </ul>

              </label>

              <label className="location-search-pseudo">
                <span className="location-pseudo-input-text">Near</span>
                <input className="location-area-search-input"
                  type="text"
                  value={this.state.locArea}
                  onChange={this.autoCompleteLocationArea}/>
              </label>

              <ul className="location-area-autocomplete">
                { locAreaAutoCompleteList }
              </ul>

            </div>

            <div className="location-filter-options-wrapper group">

              <ul className="location-filter-price-range">
                { priceRangeButtons }
              </ul>

              <ul className="location-filter-distance">
                { distanceRangeButtons }
              </ul>

            </div>
          </div>

          <div className="location-search-button">
            <button type="Submit">🔍</button>
          </div>

        </form>
      </div>
    );
  }
});
