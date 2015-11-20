window.ApiLocationUtil = {
  fetchLocations: function (search) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {search: search},
      success: function (data) {
        ApiActions.receiveSearchResults(data);
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
        ApiActions.receiveLocationTypes(data);
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
        ApiActions.receiveLocationAreas(data);
      }
    });
  }
};
