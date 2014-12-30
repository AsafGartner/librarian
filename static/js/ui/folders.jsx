var Folders = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.getJSON('folders')
      .done(function(data) {
        this.setState({
          data: data
        });
      }.bind(this));

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