window.ApiImageUtil = {
  create: function (formData) {
    $.ajax({
      url: "/api/images",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData,
      success: function (data) {
        ImageActions.receiveImage(data);
      }
    });
  }
};
