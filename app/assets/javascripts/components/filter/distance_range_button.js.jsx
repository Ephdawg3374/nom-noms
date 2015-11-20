var DistanceRangeButton = React.createClass({
  render: function () {
    return (
      <button onToggle={this.props.setDistanceRangeFilter} value={this.props.val}>
        {this.props.label}
      </button>
    );
  }
});
