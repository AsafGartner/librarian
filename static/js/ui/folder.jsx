var Folder = React.createClass({
  render: function() {
    return (
      <li className="folder"><a href="#">{this.props.name}</a></li>
    );
  },
  componentDidMount: function() {
    this._makeDroppable();
  },
  componentDidUpdate: function() {
    this._makeDroppable();
  },
  _makeDroppable: function() { // TODO: Make this a mixin.
    var el = this.getDOMNode();

    this.props.dragManager.setReceiver(
      el,
      "folder",
      "folder" + Math.random(),
      function() { el.classList.add("droppable"); },
      function() { el.classList.remove("droppable"); }
    );
  }
});