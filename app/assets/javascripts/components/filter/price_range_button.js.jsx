var PriceRangeButton = React.createClass({
  render: function () {
    return (
      <button onClick={this.props.setPriceRangeFilter} className={ this.props.klass } value={this.props.val}>
        {this.props.val}
      </button>
    );
  }
});
