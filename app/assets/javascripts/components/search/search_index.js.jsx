var SearchIndex = React.createClass({
  componentDidMount: function () {
    MarkerStore.addChangeListener(this._onMarkerUpdate);
  },

  componentWillUnmount: function () {
    MarkerStore.removeChangeListener(this._onMarkerUpdate);
  },

  _onMarkerUpdate: function () {
    this.forceUpdate();
  },

  render: function () {
    var searchIndexItems;

    if (this.props.locations)  {
      searchIndexItems = this.props.locations.map( function(location, idx) {
        return <SearchIndexItem
          key={location.id}
          location={location}
          marker={MarkerStore.findMatchingMarker(location)}
          />;
      });
    }

    return (
      <div className="search-index">
        {searchIndexItems}
      </div>
    );
  }
});
