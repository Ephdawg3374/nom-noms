var SearchResultsPage = React.createClass({
  render: function () {
    return (
      <div className="search-results-page group">
        <div className="location-index">
          <LocationIndex />
        </div>

        <div className="search-results-map">
          <SearchResultsMap />
        </div>
      </div>
    );
  }
});
