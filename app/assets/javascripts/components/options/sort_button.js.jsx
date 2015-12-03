var SortButton = React.createClass({
  componentWillMount: function () {
    if (this.props.ReviewIndex) {
      this.setByRatingAsDefault();
    } else if (this.props.LocationIndex) {
      this.setByDistanceAsDefault();
    }
  },

  setByRatingAsDefault: function () {
    this.setState({
      mode: "rating"
    });
  },

  setByDistanceAsDefault: function () {
    this.setState({
      mode: "distance"
    });
  },

  changeMode: function (event) {
    event.preventDefault();

    this.setState({
      mode: event.currentTarget.value
    });


  },

  render: function () {
    return (
      <select value={this.state.mode} className="sort-option" onChange={this.changeMode}>
        <option value="rating">Rating</option>
        <option value="distance">Distance</option>
      </select>
    );
  }

});
