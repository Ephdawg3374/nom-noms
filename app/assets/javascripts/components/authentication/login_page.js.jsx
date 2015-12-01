var LogInPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  componentWillMount: function () {
    if (CurrentUserStore.isLoggedIn()) {
      this.history.goBack();
    }
  },

  render: function () {
    var success = function () {
     this.history.goBack();
    }.bind(this);

    return (
      <div className="auth-page">
        <h1>Log into your account.</h1>

        <LogInForm klass="auth-page-form" success={success}/>
      </div>
    );
  }
});
