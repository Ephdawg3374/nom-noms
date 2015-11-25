var ReviewIndexItem = React.createClass({
  render: function () {
    return (
      <div className="review-index-item">
        <div className="review-index-item-side-bar">
          <figure className="review-index-item-pic">
            <img src={this.props.review.user_thumbnail_url}/>
          </figure>
        </div>

        <div className="review-index-item-content">

          <div className="review-index-item-content-header">
            <h3>{this.props.review.username}</h3>

            <span className="review-creation-date">{this.props.review.time_ago}</span>

            <ReviewRatingBar mode="disabled" currentRating={this.props.review.rating}/>

          </div>

          <div className="review-index-item-content-main">

          </div>

        </div>
      </div>
    );
  }
});
