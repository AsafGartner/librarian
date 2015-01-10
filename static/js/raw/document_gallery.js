function DocumentGallery(dragManager) {
  this.dragManager = dragManager;
  this.documentElements = [];
  this.documents = [];
  this.render();
}

DocumentGallery.DropTypeDocument = "document";
DocumentGallery.DropTypeNewDocument = "new_document";

DocumentGallery.prototype.getRootElement = function() {
  JSUtils.assert(this.uiRoot, "DocumentGallery not rendered yet");
  return this.uiRoot;
};

DocumentGallery.prototype.addDocument = function(documentData) {
  this.documents.push(documentData); // TODO: clone document data

  var documentElement = this.renderDocument();
  this.documentElements.push(documentElement);

  documentElement.text.textContent = this.getDocumentTitle(documentData);
  this.uiRoot.appendChild(documentElement.root);

  this.dragManager.setReceiver(
    documentElement.root,
    DocumentGallery.DropTypeDocument,
    documentData.id,
    function() { documentElement.root.classList.add("droppable"); },
    function() { documentElement.root.classList.remove("droppable"); }
  );
};

DocumentGallery.prototype.updateDocument = function(documentData) {
  var docIndex;
  for (var i = 0; i < this.documents.length; ++i) {
    if (this.documents[i].id == documentData.id) {
      docIndex = i;
      break;
    }
  }

  this.documents[docIndex] = documentData; // TODO: clone document data
  this.documentElements[docIndex].text.textContent = this.getDocumentTitle(documentData);
};

DocumentGallery.prototype.render = function() {
  this.uiRoot = document.createElement("div");
  this.uiRoot.className = "document_gallery";

  this.uiNewDocument = document.createElement("div");
  this.uiNewDocument.className = "document_gallery_new_document";

  var newDocumentIcon = document.createElement("img");
  this.uiNewDocument.appendChild(newDocumentIcon);

  var newDocumentText = document.createElement("span");
  newDocumentText.textContent = "New Document";
  this.uiNewDocument.appendChild(newDocumentText);

  this.dragManager.setReceiver(
    this.uiNewDocument,
    DocumentGallery.DropTypeNewDocument,
    null,
    function() { this.uiNewDocument.classList.add("droppable"); }.bind(this),
    function() { this.uiNewDocument.classList.remove("droppable"); }.bind(this)
  );

  this.uiRoot.appendChild(this.uiNewDocument);
};

DocumentGallery.prototype.renderDocument = function() {
  var documentElement = {};
  documentElement.root = document.createElement("div");
  documentElement.root.className = "document_gallery_document";
  documentElement.text = document.createElement("span");
  documentElement.root.appendChild(documentElement.text);
  return documentElement;
};

DocumentGallery.prototype.getDocumentTitle = function(documentData) {
  var numPages = documentData.pages.length;
  if (numPages == 1) {
    return "1 Page";
  } else {
    return numPages + " Pages";
  }
};
