function DragSender(element, type, data, dragStartCallback, dragMoveCallback, dragCancelCallback, dragEndCallback) {
  this.element = element;
  this.type = type;
  this.data = data;
  this.dragStartCallback = dragStartCallback;
  this.dragMoveCallback = dragMoveCallback;
  this.dragCancelCallback = dragCancelCallback;
  this.dragEndCallback = dragEndCallback;
};

DragSender.prototype.getElement = function() {
  return this.element;
};

DragSender.prototype.getType = function() {
  return this.type;
};

DragSender.prototype.getData = function() {
  return this.data;
};

DragSender.prototype.dragStart = function(pageX, pageY) {
  if (this.dragStartCallback) {
    return this.dragStartCallback(this.getElement(), pageX, pageY);
  }
};

DragSender.prototype.dragMove = function(pageX, pageY) {
  if (this.dragMoveCallback) {
    return this.dragMoveCallback(this.getElement(), pageX, pageY);
  }
};

DragSender.prototype.dragCancel = function() {
  if (this.dragCancelCallback) {
    return this.dragCancelCallback(this.getElement());
  }
};

DragSender.prototype.dragEnd = function() {
  if (this.dragEndCallback) {
    return this.dragEndCallback(this.getElement());
  }
};

module.exports = DragSender;