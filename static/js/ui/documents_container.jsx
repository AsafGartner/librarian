var DocumentsContainer = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.getJSON('documents')
      .done(function(data) {
        this.setState({
          data: data
        });
      }.bind(this));
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