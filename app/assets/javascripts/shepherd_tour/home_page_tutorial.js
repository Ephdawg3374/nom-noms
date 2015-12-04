var HomePageTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

var FindAutocompleteTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

var NearAutocompleteTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

var userSearchAutocompleteTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

var homeTutorialNextButton = {
  text: "Next",
  action: HomePageTutorial.next
};

var homeTutorialEndButton = {
  text: "Skip Tutorial",
  action: HomePageTutorial.cancel
};

findStepOptions = {
  text: "Search for location type, name, or cuisine here. The search does partial matching so feel free to not complete the entire phrase!",
  attachTo: ".location-type-search-input left",
  buttons: [homeTutorialNextButton, homeTutorialEndButton]
};

HomePageTutorial.addStep("test", findStepOptions);
nearStepOptions = {
  text: "Search for location city here. The app uses navigator and Google Maps geocode API so this should automatically populate with your current city, state! Feel free to conduct a search with the following locations: New York, Brooklyn, Manhattan, Fort Lee, Hoboken, Englewood, Queens, Bronx, Yonkers, or New Rochelle",
  attachTo: ".location-area-search-input right",
  buttons: [homeTutorialNextButton, homeTutorialEndButton]
};

findUsersOptions = {
  text: "Search for other users here. You can search by user name, first, or last name. Feel free to search for { ephdawg3374, firstname: Ephraim, lastname: Pei }",
  attachTo: ".open-user-search-modal left",
  buttons: [homeTutorialNextButton, homeTutorialEndButton]
};

signUpStepOptions = {
  text: "Create a new user here!",
  attachTo: ".nav-sign-up right",
  buttons: [homeTutorialNextButton, homeTutorialEndButton]
};

HomePageTutorial.addStep("find", findStepOptions).addStep("near", nearStepOptions).addStep("sign-up", signUpStepOptions);

FindAutocompleteTutorial.addStep("find-autocomplete", {
  text: "Check it out! Search results are autocompleted. You can select an option from the list to fill out the search bar.",
  attachTo: ".location-type-autocomplete-list bottom",
  buttons: [
    {
      text: "Ok",
      action: FindAutocompleteTutorial.next
    },
  ]
});

NearAutocompleteTutorial.addStep("near-autocomplete", {
  text: "Check it out! Search results are autocompleted. You can select an option from the list to fill out the search bar.",
  attachTo: ".location-area-autocomplete bottom",
  buttons: [
    {
      text: "Ok",
      action: NearAutocompleteTutorial.next
    },
  ]
});
