var ReviewRatingBar = React.createClass({
  render: function () {
    var ratings = [1,2,3,4,5];

    var ratingButtons = ratings.map(function (rating) {
      var klass = rating <= this.props.currentRating ? "active" : "";

      return <ReviewRatingButton
        key={rating}
        rating={rating}
        klass={"review-rating-button " + klass}
        setReviewRating={this.props.setReviewRating} />;
    }.bind(this));

    return (
      <div className="review-rating-bar">
        { ratingButtons }
      </div>
    );
  }
});
