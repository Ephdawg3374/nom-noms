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

  handleSearchSubmit: function (event) {
    var locationForm = event.currentTarget;

    var search = {
      locationType: locationForm[0].value,
      locationAddress: locationForm[1].value
    };

    ApiLocationUtil.fetchLocations(search);

    this.history.pushState(null, "/search_results/");
  },

  autoCompleteLocationType: function () {

  },

  autoCompleteLocationAddress: function () {

  },

  render: function () {
    var handleKeyPress = function (e) {
      if (e.which === 13) {
        this.handleSearchSubmit(e);
      }
    };

    return (
      <div className="location-search">
        <form onKeyPress={ handleKeyPress.bind(this) }>
          <input className="location-type-search"
            type="text"
            valueLink={this.linkState("type")}
            placeholder="  Location type (restaurant, bar, etc)"
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
