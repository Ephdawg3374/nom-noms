var SortOptions = React.createClass({
  getInitialState: function () {
    if (this.props.SearchIndex) {
      return ({ mode: "Distance" });
    } else {
      return ({ mode: "Time" });
    }
  },

  changeMode: function (event) {
    event.preventDefault();
    var newMode = event.currentTarget.value;

    this.setState({
      mode: newMode
    });

    this.props.sortItems(newMode);
  },

  render: function () {
    var options;

    if (this.props.SearchIndex) {
      options = ["Rating", "Distance"];
    } else {
      options = ["Rating", "Time"];
    }

    var buttons = options.map( function(option, idx) {
      return <option key={idx} value={option}>{option}</option>;
    });
    return (
      <select value={this.state.mode} className="sort-options" onChange={this.changeMode}>
        { buttons }
      </select>
    );
  }

});
