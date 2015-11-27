var ReviewIndexItem = React.createClass({
  deleteReview: function (event) {
    event.preventDefault();
    ApiReviewUtil.destroy(event.currentTarget.value);
  },

  componentDidMount: function() {
    ImageStore.addChangeListener(this._onChange);
    CurrentUserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ImageStore.removeChangeListener(this._onChange);
    CurrentUserStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.forceUpdate();
  },

  render: function () {
    var deleteReviewButton;

    if (CurrentUserStore.currentUser().id === this.props.review.user_id) {
      deleteReviewButton = (
        <button
          className="delete-review-button"
          onClick={this.deleteReview}
          value={this.props.review.id}>
          Delete
        </button>
      );
    }

    var pics = this.props.review.images.map(function (image, idx) {
      return <img key={idx} src={image.medium_url}/>;
    });

    return (
      <div className="review-index-item group">
        <div className="review-index-item-side-bar">
          <figure className="review-index-item-pic">
            <Link to={"/users/" + this.props.review.user_id}>
              <h3>{this.props.review.author}</h3>
            </Link>
            <img src={this.props.review.user_thumbnail_url}/>
          </figure>
        </div>

        <div className="review-index-item-content">

          <div className="review-index-item-content-header group">
            <ReviewRatingBar mode="disabled" currentRating={this.props.review.rating}/>

            <span className="review-creation-date">{this.props.review.time_ago} ago</span>

            { deleteReviewButton }
          </div>

          <textarea
            className="review-index-item-body"
            readOnly
            value={this.props.review.body}/>

          <div className="review-index-item-images">
            { pics }
          </div>
        </div>
      </div>
    );
  }
});
