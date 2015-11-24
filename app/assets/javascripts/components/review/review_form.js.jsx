var ReviewForm = React.createClass({
  getInitialState: function () {
    return (
      {
        rating: 0,
        body: "",
        imageUrls: [],
        imageFiles: []
      }
    );
  },

  componentDidMount: function () {
    this.setPId('review_form');
    this.setPStorage(this.localStorage);
    this.restorePState();
  },

  render: function () {

  }
});
