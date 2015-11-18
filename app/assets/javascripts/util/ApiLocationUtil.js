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
  }
};
