var DragManager = require('./drag_manager/drag_manager');

var dragManager = new DragManager();
var images = $(".image");
var docs = $(".doc");

dragManager.addInteraction("image", "doc", function(imageType, imageData, docType, docData) {
    console.log("Dropped", imageData, "on", docData);
});

function makeDraggable(element, type, id) {
  var startPos = null;
  var jqEl = $(element);
  var draggedElement = null;
  dragManager.setSender(
    element,
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

var counter = 0;
images.each(function() {
  makeDraggable(this, "image", counter++);
  $(this).on("click", function(){ console.log("click"); });
});

counter = 0;
docs.each(function() {
  var doc = $(this);
  dragManager.setReceiver(
    this,
    "doc",
    "doc" + counter++,
    function() { doc.addClass("droppable"); },
    function() { doc.removeClass("droppable"); }
  );
});