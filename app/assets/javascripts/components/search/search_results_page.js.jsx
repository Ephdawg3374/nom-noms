var SearchResultsPage = React.createClass({
  render: function () {
    return (
      <div className="search-results-page group">
        <SearchIndex />

        <SearchResultsMap />
      </div>
    );
  }
});
