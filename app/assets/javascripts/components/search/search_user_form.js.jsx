var UserSearchForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return (
      {
        username: "",
        password: "",
        isValid: true,
        errMsg: null
      }
    );
  },

  handleUserSearch: function (event) {
    event.preventDefault();

    var username = event.currentTarget.value;

    var success = function (user) {
      this.history.pushState(null, "/users/" + user.id);
    };

    var failure = function (errMsg) {
      this.setState(
        {
          isValid: false,
          errMsg: errMsg
        }
      );
    };

    ApiUserUtil.fetchUserByUsername(username, success, failure);
  },

  render: function () {
    var modalHeaderText, closeButton, errMsg;

    if (this.state.errMsg) {
      errMsg = <label className="user-search-error-msg">{this.state.errMsg}</label>;
    }

    if (this.props.modalMode) {
      modalHeaderText = "Search for a user by username, first, or last name.";
      closeButton = <button className="modal-close" onClick={this.props.close}>X</button>;
    }

    return (
      <div></div>
      // <form className={this.props.klass} onKeyPress={this.handleKeyPress} onSubmit={this.handleLogin}>
      //   { closeButton }
      //
      //   <h1>{ modalHeaderText }</h1>
      //
      //   <div className="errors-wrapper group">
      //     { errors }
      //   </div>
      //
      //   <div className="auth-page-input-wrapper">
      //     <label>Username
      //     <input
      //       className="auth-page-username"
      //       type="text"
      //       valueLink={this.linkState("username")}/>
      //     </label>
      //
      //     <label>Password
      //     <input
      //       className="auth-page-password"
      //       type="password"
      //       valueLink={this.linkState("password")}/>
      //     </label>
      //
      //     <button className="submit" type="submit">Log In!</button>
      //   </div>
      // </form>
    );
  }
});
