var ReviewIndexItem = React.createClass({
  mixins: [ReactRouter.History],

  deleteReview: function (event) {
    event.preventDefault();

    ApiReviewUtil.destroy(event.currentTarget.value);
  },

  editReview: function (event) {
    event.preventDefault();

    var review = { review: this.props.review };

    this.history.pushState(null, "/locations/" + this.props.location.id + "/reviews/edit", review);
  },

  componentDidMount: function () {
    ApiImageUtil.fetchReviewImages(this.props.review.id);
  },

  render: function () {
    var deleteReviewButton, editReviewButton, locationContactDetails, num_reviews_text;

    if (this.props.user) {
      num_reviews_text = this.props.location.num_reviews + " reviews";

      locationContactDetails = (
        <div className="review-index-item-location-details group">
          <img src={this.props.location.img_url}/>

          <div className="review-index-item-location-details-section group">
            <h1>
              <Link to={"/locations/" + this.props.location.id} params={ this.props.location }>
                {this.props.location.name}
              </Link>
            </h1>
            <label>{this.props.location.price_range} {this.props.location.location_type} {this.props.location.cuisine}</label>
            <ReviewRatingBar currentRating={this.props.location.ave_rating} mode="disabled"/>
            <label className="search-index-item-number-of-ratings">{num_reviews_text}</label>
          </div>
        </div>
      );
    }

    if (this.props.isLoggedIn && CurrentUserStore.currentUser().id === this.props.review.user_id) {
      editReviewButton = (
        <button
          className="edit-review-button"
          onClick={this.editReview}
          value={this.props.review.id}>
          Edit
        </button>
      );

      deleteReviewButton = (
        <button
          className="delete-review-button"
          onClick={this.deleteReview}
          value={this.props.review.id}>
          Delete
        </button>
      );
    }

    return (
      <div className="review-index-item group">
        <div className="review-index-item-side-bar">
          <figure className="review-index-item-pic">
            <Link to={"/users/" + this.props.review.user_id}>
              <h3>{this.props.review.author}</h3>
            </Link>
            <Link to={"/users/" + this.props.review.user_id}>
              <img src={this.props.review.user_thumbnail_url}/>
            </Link>
          </figure>
        </div>

        <div className="review-index-item-content">

          { locationContactDetails }

          <div className="review-index-item-content-header group">
            <ReviewRatingBar mode="disabled" currentRating={this.props.review.rating}/>

            <span className="review-creation-date">{this.props.review.time_ago} ago</span>

            <div className="review-index-item-options">
              { deleteReviewButton }
              { editReviewButton }
            </div>
          </div>

          <textarea
            className="review-index-item-body"
            readOnly
            value={this.props.review.body}/>

          <ImageScroll Review review={this.props.review} klass="review-index-item-images"/>
        </div>
      </div>
    );
  }
});
