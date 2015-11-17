var LocationSearch = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        type: "",
        address: "",
      }
    );
  },

  getCurrentLocation: function () {

  },

  render: function () {
    return (
      <div className="location-search">
        <form onSubmit={this.handleSearchSubmission}>
          <input className="location-type-search"
            type="text"
            valueLink={this.linkState("type")}
            placeholder="Location type (restaurant, school, gym, bar, etc)"
          />

        <input className="location-address-search"
            type="text"
            valueLink={this.linkState("address")}
          />

        </form>
      </div>
    );
  }
});
