var DocumentsContainer = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      this.setState({
        data: [
          { name: 'Document 1' },
          { name: 'Document 2' },
          { name: 'Document 3' }
        ]
      });
    }.bind(this), 5000);
  },
  render: function() {
    var dragManager = this.props.dragManager;

    var documents = this.state.data.map(function(d) {
      return (
        <Document key={d.name} name={d.name} dragManager={dragManager} />
      );
    });

    return (
      <div className="documents-container">
        {documents}
      </div>
    );
  }
});