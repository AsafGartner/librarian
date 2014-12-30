var ImagesContainer = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.getJSON('images')
      .done(function(data) {
        this.setState({
          data: data
        });
      }.bind(this));
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