window.SearchActions = {
  receiveSingleLocation: function (location) {
    var latLngObject = new google.maps.LatLng(
      {
        locId: location.id,
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      }
    );

    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SINGLE_LOCATION,
      location: location,
      latLngObject: latLngObject
    });
  },

  receiveLocations: function (locations) {
    var latLngObjects = [];

    locations.forEach(function (location) {
      latLngObjects.push(new google.maps.LatLng(
        {
          locId: location.id,
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng)
        })
      );
    });

    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_LOCATIONS,
      locations: locations,
      latLngObjects: latLngObjects,
    });
  },

  receiveLocationTypes: function (locTypesResults) {
    var locTypes = [];

    // locTypesResults.forEach(function (locTypesResult) {
    //   if (locTypesResult.location_type) {
    //     locTypes.push(locTypesResult.location_type);
    //   } else {
    //     locTypes.push(locTypesResult.cuisine);
    //   }
    // });

    locTypesResults.forEach(function (locTypesResult) {
      locTypes.push(locTypesResult);
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
