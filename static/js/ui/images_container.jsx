var ImagesContainer = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    var es = new EventSource('images');

    es.addEventListener('update', function(e) {
      var data = JSON.parse(e.data);

      this.setState({
        data: data
      });
    }.bind(this), false);
  },
  render: function() {

    var dragManager = this.props.dragManager;

    var images = this.state.data.map(function(d) {
      return (
        <Image  key={d.key}
                image_path={d.image_path}
                dragManager={dragManager} />
      );
    });

    return (
      <div className="images-container">
        {images}
      </div>
    );
  }
});