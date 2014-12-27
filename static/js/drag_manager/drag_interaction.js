// dropCallback = function(senderType, senderData, receiverType, receiverData)
function DragInteraction(senderType, receiverType, dropCallback) {
  this.senderType = senderType;
  this.receiverType = receiverType;
  this.dropCallback = dropCallback;
}

DragInteraction.prototype.respondsTo = function(senderType, receiverType) {
  return (this.senderType == senderType && this.receiverType == receiverType);
};

DragInteraction.prototype.trigger = function(senderData, receiverData) {
  this.dropCallback(this.senderType, senderData, this.receiverType, receiverData);
};
