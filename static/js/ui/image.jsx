var Image = React.createClass({
  render: function() {
    return (
      <div className="image">
        {this.props.name}
      </div>
    );
  },
  componentDidMount: function() {
    this._makeDraggable("image", null);
  },
  componentDidUpdate: function() {
    this._makeDraggable("image", null);
  },
  _makeDraggable: function(type, id) { // TODO: Make this a mixin.
    var startPos = null;
    var draggedElement = null;

    var jqEl = $(this.getDOMNode());

    this.props.dragManager.setSender(
      this.getDOMNode(),
      type,
      id,
      function(element, pageX, pageY) {
        draggedElement = jqEl.clone();
        var offset = jqEl.offset();

        startPos = { x: pageX - offset.left, y: pageY - offset.top };

        draggedElement.insertAfter(jqEl);

        jqEl.addClass("dragged");

        draggedElement.css({ position: "absolute", "pointer-events": "none" });
        draggedElement.css({ top: (pageY - startPos.y) + "px", left: (pageX - startPos.x) + "px" });
      },
      function(element, pageX, pageY) {
        draggedElement.css({ top: (pageY - startPos.y) + "px", left: (pageX - startPos.x) + "px" });
      },
      function() {
        jqEl.removeClass("dragged");
        draggedElement.remove();
      },
      function() {
        jqEl.remove();
        draggedElement.remove();
      }
    );
  }
});