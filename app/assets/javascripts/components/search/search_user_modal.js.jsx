var UserSearchModal = React.createClass({
  render: function () {
    var klass = "modal ";

    if (this.props.isOpen) {
      klass += "is-open";
    }

    return (
      <div className={ klass }>
        <UserSearchForm klass="user-search-modal-form" modalMode success={ this.props.success } close={ this.props.close }/>

        <div className="modal-screen"></div>
      </div>
    );
  }
});
