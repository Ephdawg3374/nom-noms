var ImageScroll = React.createClass({
  render: function () {
    var images;

    if (this.props.User) {
      images = this.props.user.images.map(function (image, idx) {
        return <img key={idx} src={image}/>;
      });
    } else if (this.props.Review) {
      images = this.props.review.images.map(function (image, idx) {
        return <img key={idx} src={image}/>;
      });
    }

    return (
      <div className={this.props.klass}>
        { images }
      </div>
    );
  }
});
