function Stack() {
  this.stack = [];
}

Stack.prototype.push = function(element) {
  return this.stack.push(element);
};

Stack.prototype.pop = function() {
  return this.stack.pop();
};

Stack.prototype.peek = function() {
  var lastElementIdx = this.size() - 1;
  return (lastElementIdx >= 0 ? this.stack[lastElementIdx] : null);
};

Stack.prototype.size = function() {
  return this.stack.length;
};

Stack.prototype.isEmpty = function() {
  return this.stack.length == 0;
};

Stack.prototype.clear = function() {
  this.stack = [];
};

module.exports = Stack;