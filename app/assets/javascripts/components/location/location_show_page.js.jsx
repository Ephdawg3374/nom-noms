var LocationShowPage = React.createClass({
  mixins: [ReactPersistentState, ReactRouter.History],

  getInitialState: function () {
    return ({ logInModalVisible: false });
  },

  componentWillMount: function () {
    localStorage.removeItem("review_index");
  },

  componentWillReceiveProps: function () {
    ApiLocationUtil.fetchSingleLocation(this.props.params.location_id);
  },

  componentDidMount: function () {
    ApiLocationUtil.fetchSingleLocation(this.props.params.location_id);

    LocationStore.addChangeListener(this._onChange);
    CurrentUserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    LocationStore.removeChangeListener(this._onChange);
    CurrentUserStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.forceUpdate();
  },

  handleReviewButtonClick: function (event) {
    event.preventDefault();

    if (!CurrentUserStore.isLoggedIn()) {
      this.openLogInModal();
    } else {
      this.goToReviewFormPage();
    }
  },

  goToReviewFormPage: function () {
    var location = { locationId: this.props.params.location_id };
    this.history.pushState(null, "/locations/" + location.locationId + "/reviews/new", location);
  },

  openLogInModal: function () {
    this.setState({ logInModalVisible: true });
  },

  closeLogInModal: function (event) {
    event.preventDefault();

    this.setState({ logInModalVisible: false });
  },

  render: function () {
    var location = LocationStore.find_location(parseInt(this.props.params.location_id));

    var reviewForm, map, numReviewsText, reviewIndex, logInModal;

    var logInModalSuccessCallback = function () {
      if (!loggedInTutorial) {
        NavLoggedInTutorial.start();
        loggedInTutorial = true;
      }
      
      this.setState({ logInModalVisible: false });
      this.goToReviewFormPage();
    }.bind(this);

    if (this.state.logInModalVisible) {
      logInModal = <LogInModal isOpen success={logInModalSuccessCallback} close={this.closeLogInModal}/>;
    }

    if (CurrentUserStore.isLoggedIn()) {
      reviewForm = <ReviewForm location={location} />;
    }

    if (Object.keys(location).length !== 0) {
      numReviewsText = location.num_reviews + " reviews";
      map = <Map location={location} mode="locationShowPage"/>;
      reviewIndex = <ReviewIndex isLoggedIn={CurrentUserStore.isLoggedIn()} location={location} />;
    }

    return (
      <div className="location-show-page">
        <div className="main-header">
          <div className="sub-header">
            <div className="sub-header-info-wrapper group">
              <div className="sub-header-info group">

                <h1>{location.name}</h1>

                <ReviewRatingBar currentRating={location.ave_rating} mode="disabled" />
                <label className="num-reviews-text">{numReviewsText}</label>

              </div>

              <div className="sub-header-options">
                <button
                  className="sub-header-options-review-button"
                  onClick={this.handleReviewButtonClick} >
                  Write a Review
                </button>
              </div>
            </div>

            <div className="sub-header-banner group">
              <div className="sub-header-banner-left-section">
                { map }
                <a href="#">{location.website}</a>
                <label>{location.description}</label>
                <LocationContactDetails location={location} />
              </div>

              <figure className="sub-header-banner-cover-photo">
                <img src={location.img_url}/>
              </figure>
            </div>
          </div>

        </div>

        <div className="location-show-page-review-wrapper">
          { reviewForm }
        </div>

        <div className="location-show-page-review-section">
          { reviewIndex }
        </div>

        { logInModal }
      </div>
    );
  }
});
