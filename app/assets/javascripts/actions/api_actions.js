window.ApiActions = {
  receiveSearchResults: function (searchResults) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      searchResults: searchResults
    });
  }
};
