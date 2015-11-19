window.ApiActions = {
  receiveSearchResults: function (searchResults) {
    var latLngObjects = [];

    searchResults.forEach(function (location) {
      latLngObjects.push(new google.maps.LatLng(
        {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng)
        })
      );
    });

    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      searchResults: searchResults,
      latLngObjects: latLngObjects
    });
  }
};
