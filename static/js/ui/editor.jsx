var Editor = React.createClass({
  componentWillMount: function() {
    this.props.dragManager.addInteraction("image", "doc", function(imageType, imageData, docType, docData) {
        console.log("Dropped", arguments);
    });
  },
  render: function() {
    return (
      <div id="editor">
        <ImagesContainer dragManager={this.props.dragManager} />
        <DocumentsContainer dragManager={this.props.dragManager} />
      </div>
    );
  }
});