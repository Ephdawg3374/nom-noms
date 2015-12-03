var DistanceRangeButton = React.createClass({
  render: function () {
    return (
      <button onClick={this.props.setDistanceRangeFilter}
        value={this.props.val}
        className={this.props.klass}>
        {this.props.label}
      </button>
    );
  }
});
