var ImagesContainer = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      this.setState({
        data: [
          { name: 'Image 1' },
          { name: 'Image 2' },
          { name: 'Image 3' }
        ]
      });
    }.bind(this), 5000);
  },
  render: function() {

    var dragManager = this.props.dragManager;

    var images = this.state.data.map(function(d) {
      return (
        <Image key={d.name} name={d.name} dragManager={dragManager} />
      );
    });

    return (
      <div className="images-container">
        {images}
      </div>
    );
  }
});