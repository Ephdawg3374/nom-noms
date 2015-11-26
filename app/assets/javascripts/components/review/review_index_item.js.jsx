var ReviewIndexItem = React.createClass({

  render: function () {
    var pics = this.props.review.images.map(function (image) {
      return <img src={image.medium_url}/>;
    });

    return (
      <div className="review-index-item">
        <div className="review-index-item-side-bar">
          <figure className="review-index-item-pic">
            <img src={this.props.review.user_thumbnail_url}/>
          </figure>
        </div>

        <div className="review-index-item-content">

          <div className="review-index-item-content-header">
            <h3>Reviewed by: {this.props.review.author}</h3>

            <span className="review-creation-date">{this.props.review.time_ago}</span>

            <ReviewRatingBar mode="disabled" currentRating={this.props.review.rating}/>

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
