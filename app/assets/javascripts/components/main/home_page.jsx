var HomePage = React.createClass({
  getInitialState: function () {
    return (
      {
        message1: false,
        message2: false,
        message3: false,
      }
     );
  },

  componentDidMount: function () {
    if (!window.NomNomsApp.homePageTutorial) {
      HomePageTutorial.start();

      window.NomNomsApp.homePageTutorial = true;
    }

    setTimeout(function () {
      this.setState({ message1: true });
    }.bind(this), 2000);

    setTimeout(function () {
      this.setState({ message2: true });
    }.bind(this), 5000);

    setTimeout(function () {
      this.setState({ message3: true });
    }.bind(this), 8000);
  },

  render: function () {
    var msg1Text = "Tryin' to nom?";
    var msg2Text = "Use the search bars. Go nom or go home.";
    var msg3Text = "Nom noms is inspired by Yelp (www.yelp.com).";
    var msgBaseClass = "home-page-splash-msg ";

    var msg1Class = msgBaseClass + "first " + (this.state.message1 ? "active" : "inactive");
    var msg2Class = msgBaseClass + "second " + (this.state.message2 ? "active" : "inactive");
    var msg3Class = msgBaseClass + "third " + (this.state.message3 ? "active" : "inactive");

    return (
      <div className="home-page-wrapper">
        <div className="home-page">
          <video
            className="home-page-splash-video"
            src="https://s3.amazonaws.com/nom-noms-dev/videos/avengers_shawarma_scene_no_sound.mp4"
            autoPlay
            loop
            type="video/mp4">
          </video>

          <div className="msg-wrapper">
            <label className={msg1Class}>{ msg1Text }</label>
            <label className={msg2Class}>{ msg2Text }</label>
            <label className={msg3Class}>{ msg3Text }</label>
          </div>
        </div>
      </div>
    );
  }
});
