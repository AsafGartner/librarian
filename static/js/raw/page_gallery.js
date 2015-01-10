function PageGallery(dragManager) {
  this.dragManager = dragManager;
  this.pages = [];
  this.render();
}

PageGallery.DragTypePage = "page";

PageGallery.prototype.getRootElement = function() {
  JSUtils.assert(this.uiRoot, "PageGallery not rendered yet");
  return this.uiRoot;
};

PageGallery.prototype.setPages = function(pages) {
  this.pages = pages;
  DOMUtils.removeAllChildren(this.uiRoot);
  for (var i = 0; i < this.pages.length; ++i) {
    var page = this.pages[i];
    var pageElement = this.renderPage(page);
    this.uiRoot.appendChild(pageElement);
    this.setPageSender(pageElement, page);
  }
};

PageGallery.prototype.removePage = function(page) {
  var pageIndex = this.pages.indexOf(page);
  if (pageIndex >= 0) {
    var pageElement = this.uiRoot.childNodes[pageIndex];
    this.removePageSender(pageElement);
    this.uiRoot.removeChild(pageElement);
    this.pages.splice(pageIndex, 1);
  }
};

PageGallery.prototype.render = function() {
  this.uiRoot = document.createElement("div");
  this.uiRoot.className = "page_gallery";
};

PageGallery.prototype.renderPage = function(pageData) {
  var page = document.createElement("div");
  page.className = "page_gallery_page";

  var image = document.createElement("img");
  image.src = pageData.imageUrl;
  page.appendChild(image);

  return page;
};

PageGallery.prototype.setPageSender = function(pageElement, page) {
  DragUtils.makeDraggable(this.dragManager, pageElement, PageGallery.DragTypePage, page);
};

PageGallery.prototype.removePageSender = function(pageElement) {
  this.dragManager.removeSender(pageElement);
};
