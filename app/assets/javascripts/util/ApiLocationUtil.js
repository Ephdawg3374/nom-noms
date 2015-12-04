window.ApiLocationUtil = {
  fetchLocations: function (search, success, failure) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {search: search},
      success: function (data) {
        SearchActions.receiveLocations(data);
        success && success(search);
      },
      error: function (data) {
        failure && failure(data.responseText);
      }
    });
  },

  fetchSingleLocation: function (locationId) {
    $.ajax({
      url: "api/locations/" + locationId,
      method: "GET",
      dataType: "json",
      success: function (data) {
        SearchActions.receiveSingleLocation(data);
      }
    });
  },

  fetchLocationTypes: function (locTypePartial, success) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {locTypeAutoCompleteRequest: locTypePartial},
      success: function (data) {
        SearchActions.receiveLocationTypes(data);
        success && success(data);
      }
    });
  },

  fetchLocationAreas: function (locAddressPartial, success) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {locAddressAutoCompleteRequest: locAddressPartial},
      success: function (data) {
        SearchActions.receiveLocationAreas(data);
        success && success();
      }
    });
  },

  fetchReviewedLocationsByUser: function (userId) {
    $.ajax({
      url: "api/locations",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      data: {userId: userId},
      success: function (data) {
        SearchActions.receiveLocations(data);
      }
    });
  }
};
