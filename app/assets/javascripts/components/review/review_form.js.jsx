var ReviewForm = React.createClass({
  mixins: [ReactPersistentState, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return (
      {
        rating: 1,
        body: "",
        images: [],
        isUploading: false,
        isSubmitting: false,
        isValid: true,
        errMsg: ""
      }
    );
  },

  componentWillMount: function () {
    this.setPId('review_form');
    this.setPStorage(this.localStorage);
    this.restorePState();
  },

  componentDidMount: function () {
    this.intervalId = setInterval(function () {
      this.setPState({
        rating: this.state.rating,
        body: this.state.body,
        images: this.state.images,
        isSubmitting: false,
        isUploading: false,
        isValid: true,
        errMsg: ""
      });
    }.bind(this), 1000);
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalId);
  },

  setReviewRating: function (event) {
    event.preventDefault();

    var newRating = parseInt(event.currentTarget.value);

    this.setState({rating: newRating});
  },

  changeFile: function (event) {
    event.preventDefault();

    var reader = new FileReader();
    var file = event.currentTarget.files[0];

    reader.onloadend = function() {
      var images = this.state.images.slice();
      var image = [reader.result, file];
      images.push(image);

      this.setState(
        {
          images: images,
          isUploading: false
        }
      );
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
      this.setState({ isUploading: true });
    }
  },

  deleteFile: function (event) {
    event.preventDefault();

    var imageIdx = event.currentTarget.value;
    var images = this.state.images.slice();
    images.splice(imageIdx, 1);

    this.setState({ images: images });
  },

  submitReview: function (event) {
    event.preventDefault();
    
    this.setState({ isSubmitting: true });

    var formData = new FormData();
    var imageFiles = [];

    this.state.images.forEach(function (image) {
      imageFiles.push(image[1]);
    });

    formData.append("review[rating]", this.state.rating);
    formData.append("review[body]", this.state.body);
    formData.append("review[images]", imageFiles);
    formData.append("review[username]", CurrentUserStore.currentUser().id);
    formData.append("review[location_id]", this.props.location.id);

    var success = function () {
      this.history.pushState(null, "/locations/" + this.props.location.id);
    }.bind(this);

    var failure = function (errMsg) {
      this.setState({
        isValid: false,
        errMsg: errMsg,
        isSubmitting: false
      });
    }.bind(this);

    ApiReviewUtil.create(formData, success, failure);
  },

  render: function () {
    var error_message = !this.state.isValid ?
      <span className="review-form-error-message">{this.state.errMsg}</span> : null;

    var submitButton = this.state.isSubmitting === true ?
      <button className="submit-review-button disabled" disabled>Submit Review</button> :
      <button className="submit-review-button">Submit Review</button>;

    var uploadedPics = this.state.images.map(function (image, idx) {
      var imageUrl = image[0];
      var file = image[1];

      return (
        <div key={idx} className="review-form-uploaded-pic">
          <button
            className="delete-uploaded-pic-button"
            onClick={this.deleteFile}
            value={idx}
            >X</button>
          <img className="review-form-pic-preview" src={imageUrl} />
        </div>
      );
    }.bind(this));


    return (
      <form onSubmit={this.submitReview} className="review-form">
        { error_message }
        <div className="review-form-header group">
          <ReviewRatingBar
            setReviewRating={this.setReviewRating}
            currentRating={this.state.rating}
            />

          <input
            className="review-form-pic-input"
            type="file"
            onChange={this.changeFile} />
        </div>

        <div className="review-form-content">
          <textarea
            className="review-form-body"
            valueLink={this.linkState("body")}>
          </textarea>

          <div className="review-form-pics-preview group" >
            { uploadedPics }
          </div>
        </div>

        { submitButton }
      </form>
    );
  }
});
