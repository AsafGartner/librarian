DOMUtils = {
  removeAllChildren: function (element) {
    while (element.childNodes.length > 0) {
      element.removeChild(element.childNodes[0]);
    }
  }
};
