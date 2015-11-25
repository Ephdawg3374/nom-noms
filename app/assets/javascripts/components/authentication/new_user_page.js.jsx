var NewUserPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return (
      {
        username: "",
        imageUrl: null,
        imageFile: "",
        password: "",
        isValid: true,
        isSubmitting: false,
        errMsg: ""
      }
    );
  },

  componentWillMount: function () {
    if (CurrentUserStore.isLoggedIn()) {
      this.history.pushState(null, "/");
    }
  },

  handleNewUserSubmit: function (event) {
    event.preventDefault();

    this.setState({ isSubmitting: true });

    var formData = new FormData();

    formData.append("user[username]", this.state.username);
    formData.append("user[password]", this.state.password);
    formData.append("user[profile_pic]", this.state.imageFile);

    var success = function () {
      this.history.pushState(null, "/");
    }.bind(this);

    var failure = function (errMsg) {
      this.setState({
        isValid: false,
        errMsg: errMsg,
        isSubmitting: false
      });
    };

    ApiUserUtil.create(formData, success, failure);
  },

  changeFile: function (event) {
    var reader = new FileReader();
    var file = event.currentTarget.files[0];

    reader.onloadend = function() {
      this.setState({ imageUrl: reader.result, imageFile: file });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  },

  render: function () {
    var submitButton = this.state.isSubmitting === true ?
      <button className="disabled" disabled>Submit</button> :
      <button>Submit</button>;

    return (
      <div className="auth-page">
        <h1>Create a new user</h1>
        <form className="auth-page-form" onSubmit={this.handleNewUserSubmit}>

          <label>Username
          <input
            className="auth-page-username"
            type="text"
            valueLink={this.linkState("username")} />
          </label>

          <label>Upload a profile pic
          <input
            className="auth-page-profile-pic-input"
            type="file"
            onChange={this.changeFile} />
          </label>

          <img className="auth-page-profile-pic-preview" src={this.state.imageUrl} />

          <label>Password
          <input
            className="auth-page-password"
            type="password"
            valueLink={this.linkState("password")} />
          </label>

          { submitButton }

        </form>
      </div>
    );
  }
});
