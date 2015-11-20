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
  },

  receiveLocationTypes: function (locTypesResults) {
    var locTypes = [];

    locTypesResults.forEach(function (locTypesResult) {
      locTypes.push(locTypesResult.location_type);
    });

    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_AUTOCOMP_LOC_TYPES,
      locTypes: locTypes
    });
  },

  receiveLocationAreas: function (locAreasResults) {
    // var locAreas = [];
    //
    // locAreasResults.forEach(function (locAreasResult) {
    //   locAreas.push(locAreasResult[0].location_area);
    // });

    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_AUTOCOMP_LOC_AREAS,
      locAreas: locAreas
    });
  }
};
