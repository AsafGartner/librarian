function DragOperation(sender, interactions, mousePageX, mousePageY) {
  this.interactions = interactions;
  this.sender = sender;
  this.receiverStack = new Stack();
  this.mousePos = { x: mousePageX, y: mousePageY };
  this.isDragging = false;
}

DragOperation.SQUARE_MIN_DISTANCE_FOR_DRAG = 100; // 10 pixels distance

DragOperation.prototype.enterReceiver = function(receiver) {
  var interaction = this._findInteraction(receiver.getType());
  if (interaction) {
    this.receiverStack.push(receiver);
    if (this.receiverStack.peek()) {
      this.receiverStack.peek().leave();
    }

    receiver.enter();
  }
};

// leaveReceiver assumes that there will be a leaveReceiver call for every enterReceiver called, and that
// it will be called in reverse order. This is, incidentally, exactly how the DOM's mouseenter/mouseleave works.
DragOperation.prototype.leaveReceiver = function(receiver) {
  if (this.receiverStack.peek() == receiver) {
    this.receiverStack.pop();
    receiver.leave();
    if (this.receiverStack.peek()) {
      this.receiverStack.peek().enter();
    }
  }
};

DragOperation.prototype.move = function(pageX, pageY) {
  if (!this.dragging) {
    var diffX = this.mousePos.x - pageX;
    var diffY = this.mousePos.y - pageY
    var sqDistance = (diffX * diffX) + (diffY * diffY);

    if (sqDistance > DragOperation.SQUARE_MIN_DISTANCE_FOR_DRAG) {
      this.dragging = true;
      this.sender.dragStart(pageX, pageY);
    }
  } else {
    this.sender.dragMove(pageX, pageY);
  }
};

DragOperation.prototype.drop = function() {
  var interaction = null;
  var receiver = null;
  if (this.receiverStack.size() > 0) {
    receiver = this.receiverStack.peek();
    interaction = this._findInteraction(receiver.getType());
  }

  if (interaction) {
    this.sender.dragEnd();
    interaction.trigger(this.sender.getData(), receiver.getData());
  } else {
    this.sender.dragCancel();
  }
  if (this.receiverStack.size() > 0) {
    this.receiverStack.pop().leave();
    this.receiverStack.clear();
  }
};

DragOperation.prototype._findInteraction = function(receiverType) {
  for (var i = 0; i < this.interactions.length; ++i) {
    var interaction = this.interactions[i];
    if (interaction.respondsTo(this.sender.getType(), receiverType)) {
      return interaction;
    }
  }
  return null;
};
