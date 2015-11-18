var LocationIndexItem = React.createClass({
  render: function () {
    return (
      <div className="location-index-item">
        <h2
          className="location-index-item-name">
          {this.props.location.name}
        </h2>

        <textarea
          className="location-index-item-description"
          readOnly="true"
          value={this.props.location.description}/>


      </div>
    );
  }
});
