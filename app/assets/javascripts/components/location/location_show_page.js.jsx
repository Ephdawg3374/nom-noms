var LocationShowPage = React.createClass({
  mixins: [ReactPersistentState],

  getInitialState: function () {
    return ({ location: this.getLocationFromStore() });
  },

  getLocationFromStore: function () {
    return LocationStore.find_location(parseInt(this.props.params.id));
  },

  componentWillMount: function () {
    this.setPId('location_index');
    this.setPStorage(this.localStorage);
    this.restorePState();

    if (localStorage.location_index) {
      var locations = JSON.parse(localStorage.location_index).locations;
      LocationStore.repopulateStore(locations);
    }

    this.setState({ location: this.getLocationFromStore() });
  },

  render: function () {
    return (
      <div className="main-header">

        <div className="sub-header">
          <div className="sub-header-info">

            <h1>{this.state.location.name}</h1>

            <span className="sub-header-info-price-range">
              {this.state.location.price_range}
            </span>

            <span className="sub-header-info-type">
              {this.state.location.location_type}
            </span>

            <span className="sub-header-info-cuisine">
              {this.state.location.cuisine}
            </span>

          </div>

          <ul className="sub-header-options">

          </ul>
        </div>
      </div>
    );
  }
});
