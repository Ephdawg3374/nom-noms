var UserShowPage = React.createClass({
  componentWillMount: function () {
    ApiUserUtil.fetchUser(this.props.params.user_id);
  },

  render: function () {
    var user = UserStore.findUser(this.props.params.user_id);

    return (
      <div className="user-show-page">
        <div className="user-show-page-header">

          <div className="user-show-page-header-left-section">
            <figure>
              <img src={user.large_url}/>
            </figure>
          </div>

          <div className="user-show-page-header-mid-section">
            <h1>{user.username}</h1>

            <ul className="user-show-page-header-stats">
              <li>{user.num_reviews}</li>
              <li>{user.num_5_star_reviews}</li>
              <li>{user.num_4_star_reviews}</li>
              <li>{user.num_3_star_reviews}</li>
              <li>{user.num_2_star_reviews}</li>
              <li>{user.num_1_star_reviews}</li>
            </ul>

          </div>

          <div className="user-show-page-header-right-section">

          </div>

        </div>
      </div>
    );
  }
});
