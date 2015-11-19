window.ApiActions = {
  receiveSearchResults: function (searchResults, map) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      searchResults: searchResults,
      map: map
    });
  }
};
