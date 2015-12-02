var UserShowPage = React.createClass({
  getInitialState: function () {
    return ({ user: this.getStateFromStore() });
  },

  getStateFromStore: function () {
    return UsersStore.findUser(parseInt(this.props.params.user_id));
  },

  componentWillMount: function () {
    localStorage.removeItem("review_index");
  },

  componentWillReceiveProps: function () {
    ApiUserUtil.fetchUser(this.props.params.user_id);
  },

  componentDidMount: function () {
    ApiUserUtil.fetchUser(this.props.params.user_id);

    CurrentUserStore.addChangeListener(this._onChange);
    UsersStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    CurrentUserStore.removeChangeListener(this._onChange);
    UsersStore.removeChangeListener(this._onChange);
  },

  _onChange: function ()  {
    this.setState({ user: this.getStateFromStore() });
  },

  render: function () {
    // var user = UsersStore.findUser(parseInt(this.props.params.user_id));
    var user = this.state.user;

    var fiveStarProgressVal, fourStarProgressVal, threeStarProgressVal,
      twoStarProgressVal, oneStarProgressVal, noProgessVal, reviewIndex;

    if (Object.keys(user).length !== 0) {
      reviewIndex = <ReviewIndex user={user} isLoggedIn={CurrentUserStore.isLoggedIn()} />;

      if (user.num_reviews !== 0) {
        fiveStarProgressVal = ((user.num_5_star_reviews / user.num_reviews) * 100).toString();
        fourStarProgressVal = ((user.num_4_star_reviews / user.num_reviews) * 100).toString();
        threeStarProgressVal = ((user.num_3_star_reviews / user.num_reviews) * 100).toString();
        twoStarProgressVal = ((user.num_2_star_reviews / user.num_reviews) * 100).toString();
        oneStarProgressVal = ((user.num_1_star_reviews / user.num_reviews) * 100).toString();
      } else {
        noProgessVal = 0;
      }

      return (
        <div className="user-show-page">
          <div className="user-show-page-header-wrapper">
            <div className="user-show-page-header group">

              <div className="user-show-page-header-floater-section">
                <figure className="user-profile-pic">
                  <img src={user.large_url}/>
                </figure>

                <div className="user-options">
                </div>
              </div>

              <div className="user-show-page-header-mid-section">
                <h1>{user.username}</h1>

                <ul className="user-show-page-header-stats">
                  <li>{user.num_reviews} reviews</li>
                  <li>
                    5 Star Reviews:
                    <progress value={fiveStarProgressVal || noProgessVal} max="100" />
                     {user.num_5_star_reviews}
                  </li>
                  <li>
                    4 Star Reviews:
                    <progress value={fourStarProgressVal || noProgessVal} max="100" />
                     {user.num_4_star_reviews}
                  </li>
                  <li>
                    3 Star Reviews:
                    <progress value={threeStarProgressVal || noProgessVal} max="100" />
                     {user.num_3_star_reviews}
                  </li>
                  <li>
                    2 Star Reviews:
                    <progress value={twoStarProgressVal || noProgessVal} max="100" />
                     {user.num_2_star_reviews}
                  </li>
                  <li>
                    1 Star Reviews:
                    <progress value={oneStarProgressVal || noProgessVal} max="100" />
                     {user.num_1_star_reviews}
                  </li>
                </ul>

              </div>

              <div className="user-show-page-header-right-section">

              </div>

            </div>
          </div>

          <div className="user-show-page-content-wrapper">
            <div className="user-show-page-content group">

              <div className="user-show-page-content-mid-section">
                { reviewIndex }
              </div>

              <div className="user-show-page-content-right-section">
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="user-show-page">
        </div>
      );
    }
  }
});
