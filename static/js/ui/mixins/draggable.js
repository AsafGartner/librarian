var Draggable = {
  makeDraggable: function(dragManager, element, type, data) {

    var startPos = null;
    var draggedElement = null;
    var $el = $(element); // TODO: Remove jQuery dependency?

    dragManager.setSender(
      element,
      type,
      data,
      function(element, pageX, pageY) {
        var offset = $el.offset();

        draggedElement = $el.clone();

        startPos = { x: pageX - offset.left, y: pageY - offset.top };

        draggedElement.insertAfter($el);

        element.classList.add("dragged");

        draggedElement.css({
          position: "absolute",
          "pointer-events": "none",
          top: (pageY - startPos.y),
          left: (pageX - startPos.x)
        });
      },
      function(element, pageX, pageY) {
        draggedElement.css({
          top: (pageY - startPos.y),
          left: (pageX - startPos.x)
        });
      },
      function() {
        element.classList.remove("dragged");
        draggedElement.remove();
      },
      function() {
        $el.remove();
        draggedElement.remove();
      }
    );
  }
};