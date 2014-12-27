function DragManager() {
  this.receivers = [];
  this.receiverCallbacks = {};

  this.senders = [];
  this.senderCallbacks = {};

  this.interactions = [];

  this.dragOperation = null;

  this._bindGlobalEvents();

  this.lastMousePos = null;
}


// dropCallback = function(senderType, senderData, receiverType, receiverData)
DragManager.prototype.addInteraction = function(senderType, receiverType, dropCallback) {
  this.interactions.push(new DragInteraction(
    senderType,
    receiverType,
    dropCallback
  ));
};

DragManager.prototype.setReceiver = function(element, type, receiverData, enterCallback, leaveCallback) {
  for (var i = 0; i < this.receivers.length; ++i) {
    if (this.receivers[i].getElement() === element) {
      throw new Error("DragManager: Element already in receivers list");
    }
  }

  var receiver = new DragReceiver(
    element,
    type,
    receiverData,
    enterCallback,
    leaveCallback
  );

  this.receivers.push(receiver);
  this._bindReceiverEvents(receiver);
};

DragManager.prototype.removeReceiver = function(element) {
  for (var i = 0; i < this.receivers.length; ++i) {
    if (this.receivers[i].getElement() === element) {
      this._unbindReceiverEvents(this.receivers[i]);
      this.receivers.splice(i, 1);
      break;
    }
  }
};

DragManager.prototype.setSender = function(element, type, senderData, dragStartCallback, dragMoveCallback, dragCancelCallback, dragEndCallback) {
  for (var i = 0; i < this.senders.length; ++i) {
    if (this.senders[i].getElement() === element) {
      throw new Error("DragManager: Element already in senders list");
    }
  }

  var sender = new DragSender(
    element,
    type,
    senderData,
    dragStartCallback,
    dragMoveCallback,
    dragCancelCallback,
    dragEndCallback
  );

  this.senders.push(sender);
  this._bindSenderEvents(sender);
};

DragManager.prototype.removeSender = function(element) {
  for (var i = 0; i < this.senders.length; ++i) {
    if (this.senders[i].getElement() === element) {
      this._unbindSenderEvents(this.senders[i]);
      this.senders.splice(i, 1);
      break;
    }
  }
};

DragManager.prototype._bindReceiverEvents = function(receiver) {
  this._unbindReceiverEvents(receiver);
  var self = this;

  this.receiverCallbacks[receiver] = {
    mouseOver: function(ev) {
      self._onReceiverMouseOver(ev, receiver);
    },
    mouseOut: function(ev) {
      self._onReceiverMouseOut(ev, receiver);
    }
  };

  receiver.getElement().addEventListener("mouseover", this.receiverCallbacks[receiver].mouseOver);
  receiver.getElement().addEventListener("mouseout", this.receiverCallbacks[receiver].mouseOut);
};

DragManager.prototype._unbindReceiverEvents = function(receiver) {
  if (this.receiverCallbacks[receiver]) {
    receiver.getElement().removeEventListener("mouseover", this.receiverCallbacks[receiver].mouseOver);
    receiver.getElement().removeEventListener("mouseout", this.receiverCallbacks[receiver].mouseOut);
    delete this.receiverCallbacks[receiver];
  }
};

DragManager.prototype._bindSenderEvents = function(sender) {
  this._unbindSenderEvents(sender);
  var self = this;

  this.senderCallbacks[sender] = {
    mouseDown: function(ev) {
      self._onSenderMouseDown(ev, sender);
    },
    dragStart: function(ev) {
      self._onSenderDragStart(ev);
    },
    drop: function(ev) {
      self._onSenderDrop(ev);
    }
  };

  sender.getElement().addEventListener("mousedown", this.senderCallbacks[sender].mouseDown);
  sender.getElement().addEventListener("dragstart", this.senderCallbacks[sender].dragStart);
  sender.getElement().addEventListener("drop", this.senderCallbacks[sender].drop);
};

DragManager.prototype._bindGlobalEvents = function() {
  var self = this;
  this.globalEvents = {
    mouseMove: function(ev) {
      self._onGlobalMouseMove(ev);
    },
    mouseUp: function(ev) {
      self._onGlobalMouseUp(ev);
    },
    scroll: function(ev) {
      self._onGlobalScroll(ev);
    }
  };

  document.addEventListener("mousemove", this.globalEvents.mouseMove);
  document.addEventListener("mouseup", this.globalEvents.mouseUp);
  window.addEventListener("scroll", this.globalEvents.scroll);
};

DragManager.prototype._onReceiverMouseOver = function(ev, receiver) {
  if (this.dragOperation) {
    this.dragOperation.enterReceiver(receiver);
  }
  ev.stopPropagation();
};

DragManager.prototype._onReceiverMouseOut = function(ev, receiver) {
  if (this.dragOperation) {
    this.dragOperation.leaveReceiver(receiver);
  }
  ev.stopPropagation();
};

DragManager.prototype._unbindSenderEvents = function(sender) {
  if (this.senderCallbacks[sender]) {
    sender.getElement().removeEventListener("mousedown", this.senderCallbacks[sender].mouseDown);
    delete this.senderCallbacks[sender];
  }
};

DragManager.prototype._onSenderMouseDown = function(ev, sender) {
  this.dragOperation = new DragOperation(sender, this.interactions, ev.pageX, ev.pageY);
  this._disableSelect();
};

DragManager.prototype._onSenderDragStart = function(ev) {
  // disable the browser's drag/drop
  ev.preventDefault();
  return false;
};

DragManager.prototype._onSenderDrop = function(ev) {
  // disable the browser's drag/drop
  ev.preventDefault();
  return false;
};

DragManager.prototype._onGlobalMouseMove = function(ev) {
  this.lastMousePos = { x: ev.clientX, y: ev.clientY };
  if (this.dragOperation) {
    this.dragOperation.move(ev.pageX, ev.pageY);
    ev.preventDefault();
  }
};

DragManager.prototype._onGlobalMouseUp = function(ev) {
  if (this.dragOperation && this.dragOperation.isDragging) {
    this.dragOperation.drop(ev.pageX, ev.pageY);
    this._enableSelect();
    ev.preventDefault();
  }
  this.dragOperation = null;
};

DragManager.prototype._onGlobalScroll = function(ev) {
  if (this.lastMousePos) {
    ev.clientX = this.lastMousePos.x;
    ev.clientY = this.lastMousePos.y;
    ev.pageX = this.lastMousePos.x + window.scrollX;
    ev.pageY = this.lastMousePos.y + window.scrollY;
    return this._onGlobalMouseMove(ev);
  }
};

DragManager.prototype._disableSelect = function() {
  document.body.classList.add("dragging");
};

DragManager.prototype._enableSelect = function() {
  document.body.classList.remove("dragging");
};
