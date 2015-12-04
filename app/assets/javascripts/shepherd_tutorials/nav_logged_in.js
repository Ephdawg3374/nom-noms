var NavLoggedInTutorial = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

NavLoggedInTutorial.addStep("go-to-your-page", {
  text: "Great, you just logged in. Click here to go to your page!",
  attachTo: ".nav-logged-in-tiny-pic right",
  buttons: [
    {
      text: "Ok",
      action: NavLoggedInTutorial.next
    }
  ]
});
