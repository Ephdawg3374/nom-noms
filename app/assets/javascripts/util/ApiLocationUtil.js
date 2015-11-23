window.ApiLocationUtil = {
  fetchLocations: function (search, callback) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {search: search},
      success: function (data) {
        SearchActions.receiveSearchResults(data);
        callback && callback();
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
