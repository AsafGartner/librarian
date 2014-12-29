var Folders = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      this.setState({
        data: [
          { name: 'Folder 1' },
          { name: 'Folder 2' },
          { name: 'Folder 3' }
        ]
      });
    }.bind(this), 5000);

    this.props.dragManager.addInteraction("image", "folder", function(imageType, imageData, docType, docData) {
        console.log("Dropped", arguments);
    });
  },
  render: function() {
    var dragManager = this.props.dragManager;

    var folders = this.state.data.map(function(d) {
      return (
        <Folder key={d.name}
                name={d.name}
                dragManager={dragManager} />
      );
    });

    return (
      <ul>
        {folders}
      </ul>
    );
  },
});