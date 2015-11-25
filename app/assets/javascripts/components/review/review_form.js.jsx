var ReviewForm = React.createClass({
  mixins: [ReactPersistentState],

  getInitialState: function () {
    return (
      {
        rating: 1,
        body: "",
        imageUrls: [],
        imageFiles: [],
        uploading: false
      }
    );
  },

  componentWillMount: function () {
    this.setPId('review_form');
    this.setPStorage(this.localStorage);
    this.restorePState();
  },

  setReviewRating: function (event) {
    event.preventDefault();

    var newRating = parseInt(event.currentTarget.value);

    this.setState({rating: newRating});
    this.setPState({rating: newRating});
  },

  setBody: function (event) {
    event.preventDefault();

    var newBody = event.currentTarget.value;

    this.setState({body: newBody});
    this.setPState({body: newBody});
  },

  changeFile: function (event) {
    event.preventDefault();

    var reader = new FileReader();
    var file = event.currentTarget.files[0];

    reader.onloadend = function() {
      this.setState(
        {
          imageUrls: this.state.imageUrls.concat(reader.result),
          imageFiles: this.state.imageFiles.concat(file),
          uploading: false
        }
      );
      this.setPState(
        {
          imageUrls: this.state.imageUrls.concat(reader.result),
          imageFiles: this.state.imageFiles.concat(file),
          uploading: false
        }
      );
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
      this.setState({ uploading: true });
    }
  },

  deleteFile: function (event) {
    event.preventDefault();

  },

  render: function () {
    var submitButton = this.state.uploading === true ?
      <button className="submit-review-button disabled" disabled>Submit Review</button> :
      <button className="submit-review-button">Submit Review</button>;

    var uploadedPics = this.state.imageUrls.map(function (imageUrl, idx) {
      return (
        <div key={idx} className="review-form-uploaded-pic">
          <button className="delete-uploaded-pic-button" img={imageUrl}>X</button>
          <img className="review-form-pic-preview" src={imageUrl} />
        </div>
      );
    });


    return (
      <form onSubmit={this.submitReview} className="review-form">
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
            onChange={this.setBody}
            val={this.state.body}>
          </textarea>

          <div className="review-form-pics-preview" >
            { uploadedPics }
          </div>
        </div>

        { submitButton }
      </form>
    );
  }
});
