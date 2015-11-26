window.SearchActions = {
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
      latLngObjects: latLngObjects,
    });
  },

  receiveLocationTypes: function (locTypesResults) {
    var locTypes = [];

    locTypesResults.forEach(function (locTypesResult) {
      if (locTypesResult.location_type) {
        locTypes.push(locTypesResult.location_type);
      } else {
        locTypes.push(locTypesResult.cuisine);
      }
    });

    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_AUTOCOMP_LOC_TYPES,
      locTypes: locTypes
    });
  },

  receiveLocationAreas: function (locAreasResults) {
    var locAreas = [];

    locAreasResults.forEach(function (locAreasResult) {
      var area = locAreasResult.city + ", " + locAreasResult.state;
      locAreas.push(area);
    });
    
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_AUTOCOMP_LOC_AREAS,
      locAreas: locAreas
    });
  }
};
