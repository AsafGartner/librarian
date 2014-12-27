function DragReceiver(element, type, data, enterCallback, leaveCallback) {
  this.element = element;
  this.type = type;
  this.data = data;
  this.enterCallback = enterCallback;
  this.leaveCallback = leaveCallback;
}

DragReceiver.prototype.getElement = function() {
  return this.element;
};

DragReceiver.prototype.getType = function() {
  return this.type;
};

DragReceiver.prototype.getData = function() {
  return this.data;
};

DragReceiver.prototype.enter = function() {
  if (this.enterCallback) {
    return this.enterCallback(this.getElement());
  }
};

DragReceiver.prototype.leave = function() {
  if (this.leaveCallback) {
    return this.leaveCallback(this.getElement());
  }
};
