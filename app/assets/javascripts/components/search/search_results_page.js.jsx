var SearchResultsPage = React.createClass({
  componentWillMount: function () {
    window.NomNomsApp.search_auto = true;
  },

  componentWillUnmount: function () {
    window.NomNomsApp.search_auto = false;
  },

  render: function () {
    return (
      <div className="search-results-page group">
        <SearchIndex />

        <SearchResultsMap distanceRange={this.props.location.query.distanceRange}/>
      </div>
    );
  }
});
