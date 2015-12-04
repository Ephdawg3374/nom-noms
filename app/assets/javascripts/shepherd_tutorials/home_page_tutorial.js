var HomePageTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

var nextButton = {
    text: "Ok",
    action: HomePageTutorial.next
  };

var skipButton = {
    text: "Skip Tutorial",
    action: HomePageTutorial.cancel
  };

var welcome = {
  title: "Welcome",
  text: "Welcome to Nom-noms! I hope you find this tutorial helpful. Click Next to begin!",
  buttons: [ nextButton, skipButton]
};

var find = {
  title: "Find",
  text: "Use this search bar to search for location type, cuisine, or name. It does partial searching so feel free to not type the entire phrase!",
  attachTo: ".location-type-search-input bottom",
  buttons: [ nextButton, skipButton]
};

var near = {
  title: "Near",
  text: "Use this search bar to search for city. Feel free to enter one of the following real cities (there are a lot of fake ones in the database): New York, Brooklyn, Manhattan, Fort Lee, Hoboken, Englewood, Queens, Bronx, Yonkers, New Rochelle",
  attachTo: ".location-area-search-input bottom",
  buttons: [ nextButton, skipButton]
};

var priceFilter = {
  title: "Price Filter",
  text: "Use these buttons to toggle a price range filter.",
  attachTo: ".location-filter-price-range bottom",
  buttons: [ nextButton, skipButton]
};

var distanceFilter = {
  title: "Distance Filter",
  text: "Use these buttons to toggle a distance range filter. If your search comes up empty, try to change some of your filters!",
  attachTo: ".location-filter-distance bottom",
  buttons: [ nextButton, skipButton]
};

var executeSearch = {
  title: "Execute Search",
  text: "Click here to search!",
  attachTo: ".location-search-button bottom",
  buttons: [ nextButton, skipButton]
};

var userSearch = {
  title: "User Search",
  text: "Use this search to look for other users! You can search by username, first name, and/or last name. Feel free to search for me (ephdawg3374, Ephraim, Pei)!",
  attachTo: ".open-user-search-modal bottom",
  buttons: [ nextButton, skipButton]
};

HomePageTutorial.addStep("welcome", welcome)
  .addStep("find", find)
  .addStep("near", near)
  .addStep("price-filter", priceFilter)
  .addStep("distance-filter", distanceFilter)
  .addStep("search", executeSearch)
  .addStep("user-search", userSearch);
