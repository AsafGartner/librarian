var Document = React.createClass({
  render: function() {
    return (
      <div className="doc">
        {this.props.name}
      </div>
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
      "doc",
      "doc" + Math.random(),
      function() { el.classList.add("droppable"); },
      function() { el.classList.remove("droppable"); }
    );
  }
});