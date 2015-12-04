var SearchIndexTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

var nextButton = {
    text: "Ok",
    action: SearchIndexTutorial.next
  };

var skipButton = {
    text: "Skip Tutorial",
    action: SearchIndexTutorial.cancel
  };

var locationPage = {
  title: "Location Page",
  text: "Each location has details, contact info, and a current average rating. Hover over the image to find the marker on the map.  Click on the name or image ot go to the location's page!",
  attachTo: ".search-index left",
  buttons: [ nextButton, skipButton]
};

var priceFilter = {
  title: "Dynamic Price Filtering",
  text: "Click on a price filter to dynamically filter the search results!",
  attachTo: ".price-range-button bottom",
  buttons: [ nextButton, skipButton]
};

var distanceFilter = {
  title: "Dynamic Distance Filtering",
  text: "Click on a distance filter to dynamically filter the search results!",
  attachTo: ".distance-range-button bottom",
  buttons: [ nextButton, skipButton]
};

var mapMarker = {
  title: "Map marker interaction",
  text: "Click on a map marker to show the location details. Check out the scrolling action on the left after you do!",
  attatchTo: ".search-index-map right",
  buttons: [ nextButton, skipButton]
};

SearchIndexTutorial.addStep("location-page", locationPage)
  .addStep("price-filter-dynamic bottom", priceFilter)
  .addStep("distance-filter-dynamic bottom", distanceFilter)
  .addStep("map-marker", mapMarker);
