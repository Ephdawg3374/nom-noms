var LocationShowPage = React.createClass({
  getInitialState: function () {
    return ({ location: this.getLocationFromStore() });
  },

  getLocationFromStore: function () {
    return LocationStore.find_location(this.props.params.id);
  },

  render: function () {
    return (
      <div className="loc-show-main-header">

        <div className="loc-show-sub-header">
          <div className="loc-show-sub-header-info">
          </div>

          <ul className="loc-show-sub-header-options">
            <WriteReviewButton />
            <BookmarkLocationButton />
          </ul>
        </div>



      </div>
    );
  }
});
