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

var UserSearchAutocompleteTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows',
  }
});

FindAutocompleteTutorial.addStep("find-autocomplete", {
  title: "Autocomplete selections",
  text: "Check it out! Search results are autocompleted. You can select an option from the list to fill out the search bar.",
  attachTo: ".location-type-autocomplete-list bottom",
  buttons: [
    {
      text: "Ok",
      action: FindAutocompleteTutorial.next
    }
  ]
});

NearAutocompleteTutorial.addStep("near-autocomplete", {
  title: "Autocomplete selections",
  text: "Check it out! Search results are autocompleted. You can select an option from the list to fill out the search bar.",
  attachTo: ".location-area-autocomplete bottom",
  buttons: [
    {
      text: "Ok",
      action: NearAutocompleteTutorial.next
    }
  ]
});

UserSearchAutocompleteTutorial.addStep("user-search", {
  title: "Autocomplete selections",
  text: "Check it out! Search results are autocompleted. You can select an option from the list to go to that user's page! So much wow!",
  attachTo: ".user-search-autocomplete-list bottom",
  buttons: [
    {
      text: "Ok",
      action: UserSearchAutocompleteTutorial.next
    }
  ]
});
