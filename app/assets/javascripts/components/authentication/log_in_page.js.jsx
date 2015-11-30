var LogInPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  render: function () {
    var success = function () {
     this.history.goBack();
    }.bind(this);

    return (
      <div className="auth-page">
        <LogInForm klass="auth-page-form" success={success}/>
      </div>
    );
  }
});
