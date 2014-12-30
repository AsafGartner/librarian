var Droppable = {
  makeDroppable: function(dragManager, element, type, data) {
    dragManager.setReceiver(
      element,
      type,
      data,
      function() { element.classList.add("droppable"); },
      function() { element.classList.remove("droppable"); }
    );
  }
};