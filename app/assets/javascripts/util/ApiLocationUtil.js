window.ApiLocationUtil = {
  fetchLocations: function (search, success, failure) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {search: search},
      success: function (data) {
        SearchActions.receiveSearchResults(data);
        success(search);
      },
      error: function (data) {
        failure(data.responseText);
      }
    });
  },

  fetchSingleLocation: function (locationId) {
    $.ajax({
      url: "api/locations/" + locationId,
      method: "GET",
      dataType: "json",
      success: function (data) {
        debugger;
        SearchActions.receiveSingleLocation(data);
      }
    });
  },

  fetchLocationTypes: function (locTypePartial) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {locTypeAutoCompleteRequest: locTypePartial},
      success: function (data) {
        SearchActions.receiveLocationTypes(data);
      }
    });
  },

  fetchLocationAreas: function (locAddressPartial) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {locAddressAutoCompleteRequest: locAddressPartial},
      success: function (data) {
        SearchActions.receiveLocationAreas(data);
      }
    });
  }
};
