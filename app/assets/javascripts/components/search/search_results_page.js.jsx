var SearchResultsPage = React.createClass({
  mixins: [ReactPersistentState],

  getInitialState: function () {
    return ({ locations: LocationStore.all() });
  },

  componentDidMount: function () {
    window.NomNomsApp.searchAuto = true;

    if (!searchIndexTutorial) {
      SearchIndexTutorial.start();

      searchIndexTutorial = true;
    }

    ApiLocationUtil.fetchLocations(this.props.location.query);

    LocationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    window.NomNomsApp.searchAuto = false;

    SearchIndexTutorial.cancel();
    searchIndexTutorial = true;

    LocationStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ locations: LocationStore.all() });
  },

  render: function () {
    return (
      <div className="search-results-page-wrapper">
        <div className="search-results-page group">
          <SearchIndex locations={this.state.locations}/>

          <Map distanceRange={this.props.location.query.distanceRange} mode="searchIndex"/>
        </div>
      </div>
    );
  }
});
