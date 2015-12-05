var AppTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

var turnOnTutorials = {
  text: "Ok",
  action: function () {
    HomePageTutorial.start();
    homePageTutorial = true;

    AppTutorial.complete();
  }
};

var turnOffTutorials = {
  text: "Turn off tutorials",
  action: function () {
    homePageTutorial = true;
    searchIndexTutorial = true;
    loggedInTutorial = true;
    autoCompleteTutorials = true;

    AppTutorial.complete();
  }
};

var welcome = {
  title: "Welcome",
  text: "Welcome to Nom noms! I hope you find the tutorials helpful.",
  buttons: [ turnOnTutorials, turnOffTutorials ]
};

AppTutorial.addStep("welcome", welcome);
