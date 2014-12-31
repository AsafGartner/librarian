DragUtils = {
  makeDraggable: function(dragManager, element, type, data, onDragEndCallback) {
    var startPos = null;
    var jqEl = $(element);
    var draggedElement = null;
    dragManager.setSender(
      element,
      type,
      data,
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
        draggedElement.remove();
        if (onDragEndCallback) {
          onDragEndCallback();
        }
      }
    );
  }
};
