function Raw(pages, folders) {
  var self = this;
  this.pages = pages;
  this.folders = folders;
  this.documents = [];
  this.documentId = 0;
  this.dragManager = new DragManager();

  this.pageGallery = new PageGallery(this.dragManager);
  this.documentGallery = new DocumentGallery(this.dragManager);
  //this.folderTree = new FolderTree();

  this.render();

  this.dragManager.addInteraction(PageGallery.DragTypePage, DocumentGallery.DropTypeDocument, this.onPageToDocumentDrop.bind(this));
  this.dragManager.addInteraction(PageGallery.DragTypePage, DocumentGallery.DropTypeNewDocument, this.onPageToNewDocumentDrop.bind(this));

  this.pageGallery.setPages(pages);
  //this.folderTree.setFolders(folders);
}

Raw.prototype.getRootElement = function() {
  JSUtils.assert(this.uiRoot, "Raw not rendered yet");
  return this.uiRoot;
};

Raw.prototype.render = function() {
  this.uiRoot = document.createElement("div");
  this.uiRoot.className = "raw_container";

  //this.uiRoot.appendChild(this.folderTree.getRootElement());
  this.uiRoot.appendChild(this.pageGallery.getRootElement());
  this.uiRoot.appendChild(this.documentGallery.getRootElement());
};

Raw.prototype.onPageToDocumentDrop = function(pageType, pageData, documentType, documentId) {
  var doc = null;
  for (var i = 0; i < this.documents.length; ++i) {
    if (this.documents[i].id == documentId) {
      doc = this.documents[i];
      break;
    }
  }
  if (doc) {
    doc.addPage(pageData);
    this.pageGallery.removePage(pageData);
    this.documentGallery.updateDocument(doc);
  } else {
    throw "DocumentNotFound " + documentId;
  }
};

Raw.prototype.onPageToNewDocumentDrop = function(pageType, pageData, newDocumentType, documentData) {
  var doc = this.createNewDocument();
  doc.addPage(pageData);
  this.documents.push(doc);
  this.pageGallery.removePage(pageData);
  this.documentGallery.addDocument(doc);
};

Raw.prototype.createNewDocument = function() {
  return new Document(this.documentId++);
}
