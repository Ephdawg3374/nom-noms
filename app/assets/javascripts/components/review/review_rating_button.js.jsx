var ReviewRatingButton = React.createClass({
  render: function () {
    return (
      <button onClick={this.props.setReviewRating}
        value={this.props.rating}
        className={this.props.klass}>
        👍
      </button>
    );
  }
});
