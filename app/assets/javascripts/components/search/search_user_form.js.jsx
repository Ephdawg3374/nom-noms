var failure = function (errMsg) {
  this.setState(
    {
      showUserAutoCompleteList: false,
      errMsg: errMsg
    }
  );
};

var UserSearchForm = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return (
      {
        userSearch: "",
        showUserAutoCompleteList: false,
        errMsg: null
      }
    );
  },

  setInitialState: function () {
    this.setState(
      {
        userSearch: "",
        showUserAutoCompleteList: false,
        errMsg: null
      }
    );
  },

  componentDidMount: function () {
    $(".auth-page-username").focus();

    // start tutorial if it hasn't been started during the session
    if (!window.NomNomsApp.userSearchTutorial) {
      $(".user-search-autocomplete-list").one("mouseover", function () {
        UserSearchAutocompleteTutorial.start();
        window.NomNomsApp.userSearchTutorial = true;
      });
    }

    UsersAutoCompleteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    UsersAutoCompleteStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.forceUpdate();
  },

  handleUserSearch: function (event) {
    if (event) {
      event.preventDefault();
    }

    ApiUserUtil.fetchUserByUsername(this.state.userSearch, this.props.success, failure.bind(this));
  },

  userSearchAutoComplete: function (event) {
    event.preventDefault();

    var userSearch = event.currentTarget.value;

    this.setState(
      {
        userSearch: userSearch,
        showUserAutoCompleteList: true
      }
    );

    ApiUserUtil.fetchUsersAutoComplete(userSearch);
  },

  selectUser: function (event) {
    event.preventDefault();

    var userId = event.currentTarget.value;

    this.setInitialState();

    ApiUserUtil.fetchUser(userId, this.props.success);
  },

  handleKeyPress: function (event) {
    if (event.which === 13) {
      event.preventDefault();

      this.handleUserSearch();
    }
  },

  render: function () {
    var modalHeaderText, closeButton, errMsg, userAutoCompleteList;
    var userAutoCompleteClass = "user-search-autocomplete-list ";

    if (this.state.showUserAutoCompleteList) {
      userAutoCompleteList = UsersAutoCompleteStore.matches().map(function (userMatch, i) {
          return <li key={i} onClick={this.selectUser} value={userMatch.id}>
            <label className="usermatch-username">{userMatch.username}</label>
            <label className="usermatch-firstlastname">{userMatch.firstname} {userMatch.lastname}</label>
          </li>;
        }.bind(this));
      if (userAutoCompleteList.length > 0) {
        userAutoCompleteClass += "filled";
      }
    }

    if (this.state.errMsg) {
      errMsg = <label className="user-search-error-msg">{this.state.errMsg}</label>;
    }

    if (this.props.modalMode) {
      modalHeaderText = "Find a user.";
      closeButton = <button className="modal-close" onClick={this.props.close}>X</button>;
    }


    return (
      <form className={this.props.klass} onKeyPress={this.handleKeyPress} onSubmit={this.handleUserSearch}>
        { closeButton }

        <h1>{ modalHeaderText }</h1>

        <div className="user-search-err-msg">
          { errMsg }
        </div>

        <div className="user-search-input-wrapper group">
          <input
            className="auth-page-username"
            type="text"
            placeholder="Enter username, first, or last name."
            onChange={ this.userSearchAutoComplete }/>

          <button type="submit">Go!</button>
        </div>

        <ul className={ userAutoCompleteClass }>
          { userAutoCompleteList }
        </ul>
      </form>
    );
  }
});
