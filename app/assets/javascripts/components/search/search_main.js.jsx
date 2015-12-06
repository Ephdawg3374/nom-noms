var successfulUserSearch = function (user) {
  this.setState({ userSearchModalVisible: false });
  this.history.pushState(null, "/users/" + user.id);
};

var success = function (searchParams) {
  this.setState(
    {
      showLocTypeAutoCompleteList: false,
      showLocAreaAutoCompleteList: false
    }
  );

  this.history.pushState(null, "search/", searchParams, this.props.showErrors);
};

var failure = function (errMsg) {
  this.setState(
    {
      showLocTypeAutoCompleteList: false,
      showLocAreaAutoCompleteList: false
    }
  );

  this.props.showErrors([errMsg]);
};

var SearchMain = React.createClass({
  mixins: [ReactPersistentState, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        locType: "",
        locArea: this.setCurrentLocation(),
        distanceRange: "1", // miles
        priceRange: "All",
        showLocTypeAutoCompleteList: false,
        showLocAreaAutoCompleteList: false,
        userSearchModalVisible: false
      }
    );
  },

  componentWillMount: function () {
    this.setPId('search_params');
    this.setPStorage(this.localStorage);
    this.restorePState();
  },

  componentDidMount: function () {
    this.intervalId = setInterval(function () {
      this.setPState({
        locType: this.state.locType,
        locArea: this.state.locArea,
        distanceRange: this.state.distanceRange,
        priceRange: this.state.priceRange,
        showLocTypeAutoCompleteList: this.state.showLocTypeAutoCompleteList,
        showLocAreaAutoCompleteList: this.state.showLocAreaAutoCompleteList,
      });
    }.bind(this), 1000);

    LocTypeAutoCompleteStore.addChangeListener(this._onChange);
    LocAreaAutoCompleteStore.addChangeListener(this._onChange);
  },

  beginLocTypeAutoTutorial: function () {
    if (!locTypeAutocompleteTutorial) {
      FindAutocompleteTutorial.start();
      locTypeAutocompleteTutorial = true;
    }
  },

  beginLocAreaAutoTutorial: function () {
    if (!locAreaAutocompleteTutorial) {
      NearAutocompleteTutorial.start();
      locAreaAutocompleteTutorial = true;
    }
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalId);

    this.cancelActiveTours();

    LocTypeAutoCompleteStore.removeChangeListener(this._onChange);
    LocAreaAutoCompleteStore.removeChangeListener(this._onChange);
  },

  cancelActiveTours: function () {
    if (Shepherd.activeTour) { Shepherd.activeTour.cancel(); }
  },

  _onChange: function () {
    this.forceUpdate();
  },

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

    var area;

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
      area = city + ", " + state;

      this.setState({locArea: area});
    }.bind(this));
  },

  buildSearchObject: function () {
    var searchParams = {
      searchType: this.state.locType,
      searchArea: this.state.locArea,
      distanceRange: this.state.distanceRange,
      priceRange: this.state.priceRange
    };

    return searchParams;
  },

  handleSearchSubmit: function (e) {
    if (e) {
      e.preventDefault();
    }

    var searchParams = this.buildSearchObject();

    ApiLocationUtil.fetchLocations(searchParams, success.bind(this), failure.bind(this));
  },

  handlePriceRangeFilter: function (priceRange) {
    var searchParams = this.buildSearchObject();
    searchParams.priceRange = priceRange;
    ApiLocationUtil.fetchLocations(searchParams, success.bind(this), failure.bind(this));
  },

  handleDistanceRangeFilter: function (distanceRange) {
    var searchParams = this.buildSearchObject();
    searchParams.distanceRange = distanceRange;
    ApiLocationUtil.fetchLocations(searchParams, success.bind(this), failure.bind(this));
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
        locArea: locAreaPartial,
        showLocAreaAutoCompleteList: true
      }
    );

    ApiLocationUtil.fetchLocationAreas(locAreaPartial);
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

    var priceRange = event.currentTarget.value;

    if (NomNomsApp.searchAuto) {
      this.handlePriceRangeFilter(priceRange);
    }

    this.setState({ priceRange: event.currentTarget.value });
  },

  setDistanceRangeFilter: function (event) {
    event.preventDefault();

    var distanceRange = event.currentTarget.value;

    if (NomNomsApp.searchAuto) {
      this.handleDistanceRangeFilter(distanceRange);
    }

    this.setState({ distanceRange: event.currentTarget.value });
  },

  openUserSearchModal: function (event) {
    event.preventDefault();

    this.setState({ userSearchModalVisible: true });
  },

  closeUserSearchModal: function (event) {
    event.preventDefault();

    if (UserSearchAutocompleteTutorial) {
      UserSearchAutocompleteTutorial.cancel();
    }

    this.setState({ userSearchModalVisible: false });
  },

  render: function () {
    var locTypeAutoCompleteList, locAreaAutoCompleteList, userSearchModal;
    var locTypeAutocompleteClass = "location-type-autocomplete-list ";
    var locAreaAutocompleteClass = "location-area-autocomplete ";

    var handleKeyPress = function (e) {
      if (e.which === 13) {
        this.handleSearchSubmit(e);
      }
    };

    if (this.state.showLocTypeAutoCompleteList) {
      locTypeAutoCompleteList = LocTypeAutoCompleteStore.matches().map(function (locTypeMatch, i) {
        return <li key={i} onClick={this.selectLocType} value={locTypeMatch}>{locTypeMatch}</li>;
      }.bind(this));

      if (locTypeAutoCompleteList.length > 0) { locTypeAutocompleteClass += "filled"; }
    }

    if (this.state.showLocAreaAutoCompleteList) {
      locAreaAutoCompleteList = LocAreaAutoCompleteStore.matches().map(function (locAreaMatch, i) {
        return <li key={i} onClick={this.selectLocArea} value={locAreaMatch}>{locAreaMatch}</li>;
      }.bind(this));
      if (locAreaAutoCompleteList.length > 0) { locAreaAutocompleteClass += "filled"; }
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

    if (this.state.userSearchModalVisible) {
      userSearchModal = <UserSearchModal
        isOpen
        modalMode
        success={successfulUserSearch.bind(this)}
        close={this.closeUserSearchModal} />;
    }

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
                  placeholder="Location name, type, or cuisine"
                  onChange={this.autoCompleteLocationType}/>

                <ul className={ locTypeAutocompleteClass }
                  onMouseOver={ this.beginLocTypeAutoTutorial }>
                  { locTypeAutoCompleteList }
                </ul>

              </label>

              <label className="location-search-pseudo">
                <span className="location-pseudo-input-text">Near</span>
                <input className="location-area-search-input"
                  type="text"
                  value={this.state.locArea}
                  placeholder="Select a city"
                  onChange={this.autoCompleteLocationArea}/>

                <ul className={ locAreaAutocompleteClass }
                  onMouseOver={ this.beginLocAreaAutoTutorial }>
                  { locAreaAutoCompleteList }
                </ul>
              </label>

            </div>

            <div className="options-wrapper group">
              <button className="home">
                <a href="/#">Home</a>
              </button>

              <button
                className="open-user-search-modal"
                onClick={this.openUserSearchModal}>
                Find Users
              </button>

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

        { userSearchModal }

      </div>
    );
  }
});
