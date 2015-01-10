function Document(id) {
  this.id = id;
  this.pages = [];
  this.folder = null;
}

Document.prototype.addPage = function(page) {
  this.pages.push(page);
};

Document.prototype.setFolder = function(folder) {
  this.folder = folder;
};

Document.prototype.toJSON = function() {
  var jsonPages = [];

  for (var i = 0; i < this.pages.length; ++i) {
    jsonPages.push(this.pages[i].toJSON());
  }

  return {
    folder: this.folder,
    pages: jsonPages
  };
};
