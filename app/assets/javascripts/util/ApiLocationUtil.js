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
      data: {locTypePartial: locTypePartial},
      success: function (data) {
        ApiActions.receiveLocationTypes(data);
      }
    });
  },

  fetchLocationAddresses: function (locAddressPartial) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {locAddressPartial: locAddressPartial},
      success: function (data) {
        ApiActions.receiveLocationAddresses(data);
      }
    });
  }
};
