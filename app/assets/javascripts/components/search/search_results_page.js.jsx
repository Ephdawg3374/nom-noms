var SearchResultsPage = React.createClass({
  mixins: [ReactPersistentState],

  getInitialState: function () {
    return ({ locations: LocationStore.all() });
  },

  componentWillMount: function () {
    window.NomNomsApp.search_auto = true;
    this.setPId('search_index');
    this.setPStorage(this.localStorage);
    this.restorePState();

    if (localStorage.search_index) {
      var locations = JSON.parse(localStorage.search_index).locations;
      SearchActions.receiveLocations(locations);
    }
  },

  componentWillReceiveProps: function () {
    this.setPState({
      locations: LocationStore.all()
    });
  },

  componentDidMount: function () {
    LocationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    window.NomNomsApp.search_auto = false;

    LocationStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ locations: LocationStore.all() });
  },

  render: function () {
    return (
      <div className="search-results-page group">
        <SearchIndex locations={this.state.locations}/>

        <Map distanceRange={this.props.location.query.distanceRange} mode="searchIndex"/>
      </div>
    );
  }
});
